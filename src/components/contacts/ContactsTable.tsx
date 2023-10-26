export const ContactsTable = (props) => {
  return (
    <form id="checked-contacts">
      <table>
        <thead>
          <th>✓</th>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email Address</th>
          <th>Status</th>
        </thead>
        <tbody id="tbody">{props.children}</tbody>
      </table>
    </form>
  );
};
