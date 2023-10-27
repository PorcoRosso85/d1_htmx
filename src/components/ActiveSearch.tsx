import { contactsListData, addIds } from "./contacts/contactData";
import MiniSearch from "minisearch";

export const SearchResults = ({ query }) => {
  // const filteredcontactsListData = contactsListData.filter((item) =>
  //   item.lastname.includes(query)
  // );

  const queryContactsListData = (data, query) => {
    const minisearch = new MiniSearch({
      fields: ["firstname", "lastname", "email"],
    });
    minisearch.addAll(data);
    let results = minisearch.search(query);
    return results.map((result) => {
      return data.find((contact) => contact.id == result.id);
    });
  };

  const searchResults = queryContactsListData(addIds(contactsListData), query);
  console.log(`results: ${searchResults}minisearch########`);

  return (
    <tbody id="search-results" class="">
      {/* {filteredcontactsListData.map((item, index) => ( */}
      {searchResults.map((item, index) => (
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
        hx-post="example/contact/search"
        hx-trigger="keyup changed delay:500ms, search"
        hx-target="#search-results"
        hx-indicator=".htmx-indicator"
        hx-ext="debug"
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
