export const ContactsTable = (props) => {
  const style = `
    tr.htmx-swapping td {
      opacity: 0;
      transition: opacity 1s ease-out;
    }
    `;
  return (
    <>
      <style>{style}</style>
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
          <tbody
            id="tbody"
            // hx-confirm="Are you sure?"
            // hx-target="closest tr"
            // hx-swap="outerHTML swap:1s"
          >
            {props.children}
          </tbody>
        </table>
      </form>
    </>
  );
};
