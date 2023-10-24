export const FormValidation = ({ isValid }) => {
  if (isValid) {
    return (
      <>
        <h3>Signup Form</h3>
        <form hx-post="/example/contact/:contactId">
          <div hx-target="this" hx-swap="outerHTML">
            <label>Email Address</label>
            <input
              name="email"
              hx-post="/example/contact/:contactId/email"
              hx-indicator="#ind"
            />
            <img
              id="ind"
              src="https://htmx.org/img/bars.svg"
              class="htmx-indicator"
            />
          </div>
          <div class="form-group">
            <label>First Name</label>
            <input type="text" class="form-control" name="firstName" />
          </div>
          <div class="form-group">
            <label>Last Name</label>
            <input type="text" class="form-control" name="lastName" />
          </div>
          <button class="btn btn-default">Submit</button>
        </form>
      </>
    );
  } else {
    return (
      <>
        <div hx-target="this" hx-swap="outerHTML" class="error">
          <label>Email Address</label>
          <input
            name="email"
            hx-post="example/contact/:contactId/email"
            hx-indicator="#ind"
            // value="test@foo.com"
          />
          <img
            id="ind"
            src="https://htmx.org/img/bars.svg"
            class="htmx-indicator"
          />
          <div class="error-message">
            That email is already taken. Please enter another email.
          </div>
        </div>
      </>
    );
  }
};
