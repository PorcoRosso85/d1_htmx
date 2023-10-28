export const BulkUpdate = (props) => {
  // const style = `
  // .htmx-settling tr.deactivate td {
  //   background: lightcoral;
  // }
  // .htmx-settling tr.activate td {
  //   background: darkseagreen;
  // }
  // tr td {
  //   transition: all 0.8s;
  // }`;

  const id = "2";

  return (
    <>
      {/* <style>{style}</style> */}
      {props.children}
      <div hx-include="#checked-contacts" hx-target="#tbody" hx-ext="debug">
        {/* <button class="btn" hx-put={`/example/contact/${id}/activate`}> */}
        <button class="btn" hx-put={`/example/contact/activate`}>
          Activate
        </button>
        <button class="btn" hx-put={`/example/contact/${id}/deactivate`}>
          Deactivate
        </button>
      </div>
    </>
  );
};
