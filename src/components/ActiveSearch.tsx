import { contactsListData } from "./contacts/contactData";

export const SearchResults = ({ query }) => {
  const filterdcontactsListData = contactsListData.filter((item) =>
    item.lastname.includes(query)
  );
  return (
    <tbody id="search-results" class="">
      {filterdcontactsListData.map((item, index) => (
        <tr key={index}>
          <td>{item.lastname}</td>
          <td>{item.firstname}</td>
          <td>{item.email}</td>
        </tr>
      ))}
    </tbody>
  );
};

// TODO: honoにコンテキストとしてinputを渡すには
export const ActiveSearch = (props) => {
  return (
    <div id="demo-canvas">
      {" "}
      <h3>
        Search Contacts
        <span class="htmx-indicator">
          <img src="https://htmx.org/img/bars.svg" /> Searching...
        </span>
      </h3>
      <input
        class="form-control"
        type="search"
        name="query"
        placeholder="Begin Typing To Search Users..."
        hx-post="example/contacts/search"
        hx-trigger="keyup changed delay:500ms, search"
        hx-target="#search-results"
        hx-indicator=".htmx-indicator"
      />
      <table class="table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        {props.children}
      </table>
    </div>
  );
};
