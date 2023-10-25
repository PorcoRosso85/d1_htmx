interface Contact {
  id: string;
  name: string;
  email: string;
}

export const contacts: Contact[] = [
  { id: "1", name: "Alice", email: "alice@example.com" },
  { id: "2", name: "Bob", email: "bob@example.com" },
  { id: "3", name: "Charlie", email: "charlie@example.com" },
  // 他のcontact情報も追加できます
];

const Contact = ({ contact }: { contact: Contact }) => {
  return (
    <tr>
      <td>{contact.name}</td>
      <td>{contact.email}</td>
      <td>
        <button
          class="btn btn-danger"
          hx-get={`/example/contact/${contact.id}/edit`}
          hx-trigger="edit"
          _="on click
                     if .editing is not empty
                       Swal.fire({title: 'Already Editing',
                                  showCancelButton: true,
                                  confirmButtonText: 'Yep, Edit This Row!',
                                  text:'Hey!  You are already editing a row!  Do you want to cancel that edit and continue?'})
                       if the result's isConfirmed is false
                         halt
                       end
                       send cancel to .editing
                     end
                     trigger edit"
        >
          Edit
        </button>
      </td>
    </tr>
  );
};

export const EditTarget = ({ contact }: { contact: Contact }) => {
  return (
    <tr
      hx-trigger="cancel"
      class="editing"
      hx-get={`/example/contact/${contact.id}`}
    >
      <td>
        <input name="name" value={`${contact.name}`} />
      </td>
      <td>
        /
        <input name="email" value={`${contact.email}`} />
      </td>
      <td>
        <button
          class="btn btn-danger"
          hx-get={`/example/contact/${contact.id}`}
        >
          Cancel
        </button>
        <button
          class="btn btn-danger"
          hx-put={`/example/contact/${contact.id}`}
          hx-include="closest tr"
        >
          Save
        </button>
      </td>
    </tr>
  );
};

export const EditRow = ({ contacts }: { contacts: Contact[] }) => {
  return (
    <table class="table delete-row-example">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((contact) => (
          <Contact contact={contact}></Contact>
        ))}
      </tbody>
    </table>
  );
};
