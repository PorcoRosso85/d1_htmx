export const ContactsTable = (props) => {
  return (
    <table>
      <thead>
        <th>#</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email Address</th>
      </thead>
      <tbody>{props.children}</tbody>
    </table>
  );
};
