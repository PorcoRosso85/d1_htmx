import { Hono, HonoRequest } from "hono";
import { object, z } from "zod";
import { zValidator } from "@hono/zod-validator";

import { renderer, AddTodo, Item, Htmx, Newest } from "./components";
import { HtmlElt, ListItem, ScriptElt } from "./components/graphs";
import { BulkUpdate } from "./components/BulkUpdate";
import { ClickToEdit } from "./components/ClickToEdit";
import { KeysTest } from "./components/KeyboardShortcuts";
import { DeleteRow } from "./components/DeleteRow";
import { contacts, EditRow, EditTarget } from "./components/EditRow";
import { LazyLoading } from "./components/LazyLoading";
import { FormValidation } from "./components/FormValidation";
import { InfiniteScroll } from "./components/InfiniteScroll";
import { ActiveSearch, SearchResults } from "./components/ActiveSearch";
import { ProgressBar } from "./components/ProgressBar";
import { CascadingSelects, ModelSelect } from "./components/CascadingSelects";
import {
  DialogCustomed,
  DialogCustomedCalled,
  DialogInBrowser,
} from "./components/DialogsModal";
import { TabContents, Tabs } from "./components/Tabs";

type Bindings = {
  DB: D1Database;
};

type Todo = {
  title: string;
  id: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("*", renderer);

app.get("/", async (c) => {
  const { results } = await c.env.DB.prepare(
    `SELECT id, title FROM todo;`
  ).all<Todo>();
  const todos = results;
  return c.render(
    <>
      <div>
        <AddTodo />
        {todos.map((todo) => {
          return <Item title={todo.title} id={todo.id} />;
        })}
        <div id="todo"></div>
      </div>
    </>
  );
});

app.post(
  "/todo",
  zValidator(
    "form",
    z.object({
      title: z.string().min(1),
    })
  ),
  async (c) => {
    const { title } = c.req.valid("form");
    const id = crypto.randomUUID();
    await c.env.DB.prepare(`INSERT INTO todo(id, title) VALUES(?, ?);`)
      .bind(id, title)
      .run();
    return c.html(<Item title={title} id={id} />);
  }
);

app.delete("/todo/:id", async (c) => {
  const id = c.req.param("id");
  await c.env.DB.prepare(`DELETE FROM todo WHERE id = ?;`).bind(id).run();
  c.status(200);
  return c.body(null);
});

type ListItem = {
  title: string;
  id: string;
};

app.get("/htmx", async (c) => {
  const { results } = await c.env.DB.prepare(
    `SELECT id, title FROM list;`
  ).all<ListItem>();
  const listItems = results;
  return c.html(
    <HtmlElt>
      <div>
        {listItems.map((item) => {
          return <ListItem id={item.id} title={item.title} />;
        })}
      </div>
      <ScriptElt />
    </HtmlElt>
  );
});

// app.post("/htmx/newest", async (c) => {
app.post(
  "htmx/newest",
  zValidator(
    "form",
    z.object({
      title: z.string().min(1),
    })
  ),
  async (c) => {
    const { title } = c.req.valid("form");
    const id = crypto.randomUUID();
    await c.env.DB.prepare(`INSERT INTO list(id, title) VALUES(?, ?);`)
      .bind(id, title)
      .run();
    return c.html(<Newest id={id} title={title} />);
  }
);

app.delete("/htmx/:id", async (c) => {
  const id = c.req.param("id");
  await c.env.DB.prepare(`DELETE FROM list WHERE id= ?;`).bind(id).run();
  c.status(200);
  return c.body(null);
});

app.get("/example/contact/:id/edit", async (c) => {
  const contactId = c.req.param("id");
  return c.html(
    <>
      <ClickToEdit isEditing={true} id={contactId} />
    </>
  );
});

app.put("/example/contact/:id", async (c) => {
  const contactId = c.req.param("id");
  // TODO: db更新
  return c.html(
    <>
      <ClickToEdit isEditing={false} id={""} />
      {/* TODO: 消えるメッセージ */}
      <p hx-delete="this" hx-trigger="load" hx-swap="outerHTML swap:0.5s">
        submitted contactId:{contactId}
      </p>
    </>
  );
});

app.put("/example/contact/activate", (c) => {
  // チェック行, putからidを取得
  // const checkedRowsId = c.req.
  //
  // idからdbを更新
  //
  // 更新された行のHTMLを生成
  const updatedRowHtml = `
    <tr class="activate">
      <td><input type='checkbox' name='ids' value='0'></td>
      <td>Joe Smith</td>
      <td>joe@smith.org</td>
      <td>Active</td>
    </tr>
  `;

  return c.html(updatedRowHtml);
});

app.put("/example/contact/deactivate", (c) => {
  // 更新された行のHTMLを生成
  const updatedRowHtml = `
    <tr class="deactivate">
      <td><input type='checkbox' name='ids' value='0'></td>
      <td>Joe Smith</td>
      <td>joe@smith.org</td>
      <td>Inactive</td>
    </tr>
  `;

  return c.html(updatedRowHtml);
});

app.delete("/example/contact/1", async (c) => {
  const returnHtml = (
    <tr>
      <th>deleted</th>
    </tr>
  );
  return c.html(returnHtml);
});

app.put("/example/contact/1", async (c) => {
  return c.html(<EditTarget contact={contact} />);
});

app.get("/example/contact/:id", async (c) => {
  // return c.html(<EditTarget contact={contact} />);
  const contactId = c.req.param("id");
  return c.html(
    <>
      <ClickToEdit isEditing={false} id={contactId} />
    </>
  );
});

app.get("/example/img", async (c) => {
  return c.html(<img src="https://htmx.org/img/tokyo.png"></img>);
});

app.post("/example/contact/:contactId/email", async (c) => {
  return c.html(<FormValidation isValid={false} />);
});

app.get("example/contacts/page2", async (c) => {
  return c.html(<InfiniteScroll x={2} />);
});

app.post(
  "/example/contacts/search",
  zValidator(
    "form",
    z.object({
      query: z.string().min(1),
    })
  ),
  async (c) => {
    const { query } = c.req.valid("form");
    // const query = "v";
    return c.html(<SearchResults query={query} />);
  }
);

// const sessionMap = {};

// const startJob = () => {
//   // const startJob = (sessionId?) => {
//   let jobProgress = 0;
//   const step = 100 / ((5 * 1000) / 50);
//   const intervalId = setInterval(() => {
//     jobProgress += step;
//     if (jobProgress >= 100) {
//       jobProgress = 100;
//       clearInterval(intervalId);
//     }
//     // if (sessionId) {
//     //   sessionMap[sessionId] = jobProgress;
//     // }
//   }, 50);
// };

// app.post("/example/job/start", async (c) => {
//   // const sessionId = c.req.valid("") //生成させる
//   // startJob(sessionId);
//   startJob();
//   return c.html(<ProgressBar progress={0.01} />);
// });

// app.get("/example/job/progress", async (c) => {
//   // const sessionId = /* セッションIDの取得 */;
//   // const jobProgress = sessionMap[sessionId] || 0;
//   const jobProgress = 100;
//   return c.html(<ProgressBar progress={jobProgress} />);
// });

// app.post("/example/job/reset", async (c) => {
//   jobProgress = 0;
//   return c.html(<>job resetted!</>);
// });

app.get(
  "/example/models",
  zValidator(
    "form",
    z.object({
      make: z.string(),
    })
  ),
  async (c) => {
    const { make } = c.req.valid("form");
    return c.html(<ModelSelect maker={make} />);
  }
);

app.post("/example/modal/submit", async (c) => {
  const submitted = "submitted";
  return c.html(<>{submitted}</>);
});

app.get("/example/tabs/:tabId", async (c) => {
  return c.html(<TabContents tab={c.req.param("tabId")} />);
});

app.get("/example", async (c) => {
  return c.html(
    <>
      <script src="https://unpkg.com/htmx.org@1.9.6"></script>
      <script src="https://unpkg.com/hyperscript.org@0.9.12"></script>
      <ClickToEdit isEditing={false} />
      <hr />
      <BulkUpdate />
      <hr />
      <DeleteRow />
      <hr />
      <EditRow contacts={contacts} />
      <hr />
      <LazyLoading />
      <hr />
      <FormValidation isValid={true} />
      <hr />
      <InfiniteScroll x={1} />
      <hr />
      <ActiveSearch>
        <SearchResults query={""} />
      </ActiveSearch>
      <hr />
      <ProgressBar progress={0} />
      <hr />
      <CascadingSelects>
        <ModelSelect maker={"audi"} />
      </CascadingSelects>
      <hr />
      <DialogCustomed />
      <hr />
      <DialogInBrowser />
      <hr />
      <Tabs />
      <hr />
      <KeysTest />
    </>
  );
});

app.get("/example/modal", async (c) => {
  return c.html(<DialogCustomedCalled />);
});

export default app;
