import { contactData } from "../domain/types";

export const ClickToEdit = ({
  contactsList,
  isEditing,
}: {
  contactsList: contactData[];
  isEditing: boolean;
}) => {
  return (
    <>
      {contactsList.slice(0, 3).map((contact, index) => (
        <ContactEltRow
          contact={contact}
          isEditing={isEditing}
          index={index}
          // key={contact.id}
        />
      ))}
    </>
  );
};

export const ContactEltRow = ({ contact, isEditing, index }) => {
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
          <td>{index}</td>
          <td>{contact.firstname}</td>
          {/* <td>{contact.lastname}</td> */}
          {/* <td>{contact.email}</td> */}
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
