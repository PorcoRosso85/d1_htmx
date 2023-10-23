import { html } from "hono/html";
import { jsxRenderer } from "hono/jsx-renderer";

export const renderer = jsxRenderer(({ children }) => {
  return html`
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://unpkg.com/htmx.org@1.9.3"></script>
        <script src="https://unpkg.com/hyperscript.org@0.9.9"></script>
        <script src="https://cdn.tailwindcss.com"></script>
        <title>Hono + htmx</title>
      </head>
      <body>
        <div class="p-4">
          <h1 class="text-4xl font-bold mb-4"><a href="/">Todo</a></h1>
          ${children}
        </div>
      </body>
    </html>
  `;
});

export const AddTodo = () => (
  <form
    hx-post="/todo"
    hx-target="#todo"
    hx-swap="beforebegin"
    _="on htmx:afterRequest reset() me"
    class="mb-4"
  >
    <div class="mb-2">
      <input
        name="title"
        type="text"
        class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5"
      />
    </div>
    <button
      class="text-white bg-blue-700 hover:bg-blue-800 rounded-lg px-5 py-2 text-center"
      type="submit"
    >
      Submit
    </button>
  </form>
);

export const Item = ({ title, id }: { title: string; id: string }) => (
  <p
    hx-delete={`/todo/${id}`}
    hx-swap="outerHTML"
    class="flex row items-center justify-between py-1 px-4 my-1 rounded-lg text-lg border bg-gray-100 text-gray-600 mb-2"
  >
    {title} + {id}
    <button class="font-medium">Delete</button>
  </p>
);

export const Htmx = () => html`
  <div>
    <ul id="1000" class="child">
      <li class="dir" id="1001">
        Item 1
        <ul class="child">
          <li class="file" id="1002">
            Item 1.1
            <ul class="child file"></ul>
          </li>
          <li class="func" id="1003">
            Item 1.1.1
            <ul class="child"></ul>
          </li>
          <li class="func" id="1004">
            Item 1.1.2
            <ul class="child"></ul>
          </li>
          <li class="func" id="1005">
            Item 1.1.3
            <ul class="child"></ul>
          </li>
        </ul>
        <li class="dir" id="1006">
          Item 2.1
          <ul class="child"></ul>
          <li class="dir" id="1007">
            Item 2.3
            <ul class="child"></ul>
          </li>
          <li class="dir" id="1008">
            Item 2.4
            <ul class="child"></ul>
          </li>
        </li>
      </li>
    </ul>

    <style>
    .child {
      min-width: 30%;
    }
    .dir {
      padding: 10px;
      background-color: #fff9ff;
    }
    .file {
      display: flex;
      flex: none;
      padding: 10px;
      background-color: #e6f0ff;
    }
    .func {
      padding: 10px;
      background-color: #e6ffe6;
    }
    .highlight {
      border: 2px dashed #0082fc;
      background-color: #e0f7fa;
    }
    .dir:hover,
    .file:hover {
      background-color: #d9edf7;
    }
    .line {
      position: absolute;
      width: 1px;
      background-color: black;
      transform-origin: 0 0;
    }
    #dependency-lines {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }

    .dependency-line {
      stroke: black;
      stroke-width: 2;
    }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js"></script>
    <script>
    var nestedSortables = document.querySelectorAll(".child");
    for (var i = 0; i < nestedSortables.length; i++) {
      new Sortable(nestedSortables[i], {
        group: "child",
        animation: 100,
        fallbackOnBody: true,
        swapThreshold: 0.65,
        onChoose: function (evt) {
          evt.item.classList.add("highlight");
        },
        onUnchoose: function (evt) {
          evt.item.classList.remove("highlight");
        },
      });
    }
    
  </script>
  </div>
`;
