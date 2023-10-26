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
          {/* <td>
            <input value={contact.firstname} />
          </td>
          <td>
            <input value={contact.lastname} />
          </td>
          <td>
            <input value={contact.email} />
          </td> */}
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
            <E />
          </td>
        </tr>
      )}
    </>
  );
};

const E = ({ index }) => {
  return (
    <button
      hx-get={`/example/contact/${index}/edit`}
      hx-target="closest tr"
      className="btn btn-primary"
    >
      E
    </button>
  );
};
