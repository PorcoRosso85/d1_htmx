export const ClickToEdit = ({ isEditing, id }) => {
  const renderField = (label, type, value) =>
    isEditing ? (
      <div className="form-group">
        <label>{label}</label>
        <input type={type} name={label.toLowerCase()} value={value} />
      </div>
    ) : (
      <div>
        <label>{label}</label>: {value}
      </div>
    );

  return (
    <>
      {isEditing ? (
        <form hx-put="/example/contact/1" hx-target="this" hx-swap="outerHTML">
          {renderField("First Name", "text", "Joe")}
          {renderField("Last Name", "text", "Blow")}
          {renderField("Email Address", "email", "joe@blow.com")}
          <button className="btn">Submit</button>
          <button className="btn" hx-get="/example/contact/1">
            Cancel
          </button>
        </form>
      ) : (
        <div hx-target="this" hx-swap="outerHTML">
          {renderField("First Name", "text", "Joe")}
          {renderField("Last Name", "text", "Blow")}
          {renderField("Email Address", "email", "joe@blow.com")}
          <button hx-get="/example/contact/1/edit" className="btn btn-primary">
            Click To Edit
          </button>
        </div>
      )}
    </>
  );
};
