export const ContactRow = ({ contact, isEditing, index }) => {
  // editing, deleting, activating,
  return (
    <>
      {isEditing ? (
        <tr
          hx-put={`/example/contact/${index}`}
          hx-target="this"
          hx-swap="outerHTML"
        >
          <td></td>
          <td>
            <input value={contact.firstname} />
          </td>
          <td>
            <input value={contact.lastname} />
          </td>
          <td>
            <input value={contact.email} />
          </td>
          <td>
            <button className="btn">Submit</button>
            <button className="btn" hx-get={`/example/contact/${index}`}>
              {" "}
              Cancel
            </button>
          </td>
        </tr>
      ) : (
        <tr key={index} hx-target="this" hx-swap="outerHTML">
          <td>
            <input type="checkbox" name="ids" value="0" />
          </td>
          <td>{index}</td>
          <td>{contact.firstname}</td>
          <td>{contact.lastname}</td>
          <td>{contact.email}</td>
          <td>Active</td>
          <td>
            <OperationButton index={index} />
          </td>
        </tr>
      )}
    </>
  );
};

const OperationButton = ({ index }) => {
  return (
    <>
      <button
        hx-get={`/example/contact/${index}/edit`}
        hx-target="closest tr"
        className="btn btn-primary"
      >
        Edit
      </button>
      <button
        class="btn btn-danger"
        hx-delete={`/example/contact/${index}`}
        hx-confirm="Are you sure?"
        hx-target="closest tr"
        hx-swap="outerHTML swap:1s"
      >
        Del
      </button>
    </>
  );
};
