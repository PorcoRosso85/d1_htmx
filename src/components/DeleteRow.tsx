export const DeleteRow = () => {
  const style = `
  tr.htmx-swapping td {
    opacity: 0;
    transition: opacity 1s ease-out;
  }
  `;
  return (
    <>
      <style>{style}</style>
      <table class="table delete-row-example">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody
          hx-confirm="Are you sure?"
          hx-target="closest tr"
          hx-swap="outerHTML swap:1s"
        >
          <tr>
            <td>Angie MacDowell</td>
            <td>angie@macdowell.org</td>
            <td>Active</td>
            <td>
              <button class="btn btn-danger" hx-delete="/example/contact/1">
                Delete
              </button>
            </td>
          </tr>
          <tr>
            <td>Angie MacDowell</td>
            <td>angie@macdowell.org</td>
            <td>Active</td>
            <td>
              <button class="btn btn-danger" hx-delete="/example/contact/1">
                Delete
              </button>
            </td>
          </tr>
          <tr>
            <td>Angie MacDowell</td>
            <td>angie@macdowell.org</td>
            <td>Active</td>
            <td>
              <button class="btn btn-danger" hx-delete="/example/contact/1">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
