export const EditTable = ({ isEditing }) => {
  if (isEditing) {
    return (
      <form hx-put="/example/contact/1" hx-target="this" hx-swap="outerHTML">
        <div>
          <label>First Name</label>
          <input type="text" name="firstName" value="Joe" />
        </div>
        <div class="form-group">
          <label>Last Name</label>
          <input type="text" name="lastName" value="Blow" />
        </div>
        <div class="form-group">
          <label>Email Address</label>
          <input type="email" name="email" value="joe@blow.com" />
        </div>
        <button class="btn">Submit</button>
        <button class="btn" hx-get="/example/contact/1">
          Cancel
        </button>
      </form>
    );
  } else {
    return (
      <div hx-target="this" hx-swap="outerHTML">
        <div>
          <label>First Name</label>: Joe
        </div>
        <div>
          <label>Last Name</label>: Blow
        </div>
        <div>
          <label>Email</label>: joe@blow.com
        </div>
        <button hx-get="/example/contact/1/edit" class="btn btn-primary">
          Click To Edit
        </button>
      </div>
    );
  }
};
