// TODO: なぜhtmxはここも要るのか？
const HtmlElt = (props: any) => {
  return (
    <html>
      <head>
        <script src="https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js"></script>
        <script src="https://unpkg.com/htmx.org@1.9.3"></script>
      </head>
      <body>
        <ul>
          <form
            hx-post="/htmx/newest"
            hx-target="#newest"
            hx-swap="outerHTML"
            _="on htmx:afterRequest reset() me"
          >
            <div>
              <input name="title" type="text" />
            </div>
            <button
              class="text-white bg-blue-700 hover:bg-blue-800 rounded-lg px-5 py-2 text-center"
              type="submit"
            >
              Submit
            </button>
          </form>
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
            <div id="newest"></div>
          </ul>
        </ul>
      </body>
      <style>{StyleElt}</style>
      {props.children}
    </html>
  );
};

const StyleElt = `
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
`;

const ScriptElt = () => (
  <script
    dangerouslySetInnerHTML={{
      __html: `
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
    `,
    }}
  ></script>
);

export const Htmx = () => (
  <>
    <HtmlElt>
      <ScriptElt />
    </HtmlElt>
  </>
);

export const Newest = ({ id, title }: { id: string; title: string }) => {
  return (
    <>
      <li class="dir" id="${id}">
        {id} + {title}
        <ul class="child"></ul>
      </li>
      <div id="newest"></div>
      <ScriptElt />
    </>
  );
};
