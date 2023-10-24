export const BulkUpdate = () => {
  const style = `
  .htmx-settling tr.deactivate td {
    background: lightcoral;
  }
  .htmx-settling tr.activate td {
    background: darkseagreen;
  }
  tr td {
    transition: all 0.8s;
  }`;
  return (
    <>
      <style>{style}</style>
      <div hx-include="#checked-contacts" hx-target="#tbody">
        <button class="btn" hx-put="/example/contact/activate">
          Activate
        </button>
        <button class="btn" hx-put="/example/contact/deactivate">
          Deactivate
        </button>
      </div>

      <form id="checked-contacts">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody id="tbody">
            <tr class="">
              <td>
                <input type="checkbox" name="ids" value="0" />
              </td>
              <td>Joe Smith</td>
              <td>joe@smith.org</td>
              <td>Active</td>
            </tr>
            <tr class="">
              <td>
                <input type="checkbox" name="ids" value="0" />
              </td>
              <td>Joe Smith</td>
              <td>joe@smith.org</td>
              <td>Active</td>
            </tr>
            <tr class="">
              <td>
                <input type="checkbox" name="ids" value="0" />
              </td>
              <td>Joe Smith</td>
              <td>joe@smith.org</td>
              <td>Active</td>
            </tr>
          </tbody>
        </table>
      </form>
    </>
  );
};
