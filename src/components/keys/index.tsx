export const KeysTest = () => {
  return (
    <html lang="en">
      <head>
        <title>ctrlKey example</title>
      </head>
      <body>
        <p>
          Press any character key, with or without holding down the CTRL key.
          <br />
          You can also use the SHIFT key together with the CTRL key.
        </p>
        <div hx-on:click="alert('Clicked!')">Click</div>
        <button
          hx-trigger="click, keyup[altKey&&shiftKey&&key=='D'] from:body"
          hx-post="/doit"
          hx-confirm="are you sure"
        >
          Do It! (alt-shift-D)
        </button>
      </body>
    </html>
  );
};

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
