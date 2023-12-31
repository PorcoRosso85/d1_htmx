import { Hono, HonoRequest } from "hono";
import { object, z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { basicAuth } from "hono/basic-auth";
import { bearerAuth } from "hono/bearer-auth";
import { cache } from "hono/cache";
import { cors } from "hono/cors";
import { etag } from "hono/etag";
import { jwt } from "hono/jwt";
import { logger } from "hono/logger";

import { renderer, AddTodo, Item, Htmx, Newest } from "./components";
import {
  DeleteButton,
  HtmlElt,
  ListItem,
  ScriptElt,
} from "./components/graphs";
import { BulkUpdate } from "./components/BulkUpdate";
import { ClickToEdit } from "./components/ClickToEdit";
import { ContactRow } from "./components/contacts/ContactRow";
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
import { contactsListData } from "./components/contacts/contactData";
import { ContactsTable } from "./components/contacts/ContactsTable";

type Bindings = {
  todoDB: D1Database;
  listDB: D1Database;
};

type Todo = {
  title: string;
  id: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app
  .use("*", logger())
  .get("*", renderer)
  .get("/", async (c) => {
    const { results } = await c.env.todoDB
      .prepare(`SELECT id, title FROM todo;`)
      .all<Todo>();
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

const todoRoute = new Hono();
todoRoute
  .post(
    "/",
    zValidator(
      "form",
      z.object({
        title: z.string().min(1),
      })
    ),
    async (c) => {
      const { title } = c.req.valid("form");
      const id = crypto.randomUUID();
      await c.env.todoDB
        .prepare(`INSERT INTO todo(id, title) VALUES(?, ?);`)
        .bind(id, title)
        .run();
      return c.html(<Item title={title} id={id} />);
    }
  )
  .delete("/:id", async (c) => {
    const id = c.req.param("id");
    await c.env.todoDB.prepare(`DELETE FROM todo WHERE id = ?;`).bind(id).run();
    c.status(200);
    return c.body(null);
  });

type ListItem = {
  title: string;
  id: string;
};

const contactRoute = new Hono();
contactRoute
  .put(
    // "/:id/activate",
    "/activate",
    zValidator("form", z.object({ ids: z.string().min(1) })),
    async (c) => {
      // TODO: リクエスト内のform.name("ids")を取得する方法を確認する
      const checkedContactIds = await c.req.formData;
      console.log("####################");
      console.log(c.req.formData);
      console.log("####################");
      console.log(c.req.header);
      console.log("####################");
      console.log(c.req.json);
      console.log("####################");
      console.log(c.req.param);
      console.log("####################");
      console.log(c.req.parseBody);
      console.log("####################");
      console.log(c.req.query);
      console.log("####################");
      console.log(c.req);
      console.log(c.req);
      // const contactId = c.req.param("id");
      // const contact = contactsListData[contactId];
      return c.html(
        <>activate</>
        // <ContactRow
        //   contact={contact}
        //   isEditing={false}
        //   index={checkedContactIds}
        // />
      );
    }
  )
  .put("/deactivate", (c) => {
    return c.html(<></>);
  })
  .put("/1", async (c) => {
    return c.html(<EditTarget contact={contact} />);
  })
  .get("/:id/edit", async (c) => {
    const contactId = c.req.param("id");
    // TODO: どの連絡先を修正するか再取得
    const contact = contactsListData[contactId];
    return c.html(
      <ContactRow contact={contact} isEditing={true} index={contactId} />
    );
  })
  .put("/:id", async (c) => {
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
  })
  .get("/:id", async (c) => {
    const contactId = c.req.param("id");
    const contact = contactsListData[contactId];
    //TODO: apiのpriority
    return c.html(
      <>
        {/* <ContactRow contact={contact} isEditing={false} index={contactId} /> */}
        <tr>
          <td>hi</td>
        </tr>
      </>
    );
  })
  .delete("/:id", async (c) => {
    const returnHtml = (
      <tr>
        <th>deleted</th>
      </tr>
    );
    return c.html(returnHtml);
  })
  .post("/:contactId/email", async (c) => {
    return c.html(<FormValidation isValid={false} />);
  })
  .get("example/contacts/page2", async (c) => {
    return c.html(<InfiniteScroll x={2} />);
  })
  .post(
    "/search",
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

const jobRoute = new Hono();

const sessionMap = {};

const startJob = () => {
  // const startJob = (sessionId?) => {
  let jobProgress = 0;
  const step = 100 / ((5 * 1000) / 50);
  const intervalId = setInterval(() => {
    jobProgress += step;
    if (jobProgress >= 100) {
      jobProgress = 100;
      clearInterval(intervalId);
    }
    // if (sessionId) {
    //   sessionMap[sessionId] = jobProgress;
    // }
  }, 50);
};

jobRoute
  .post("/start", async (c) => {
    // const sessionId = c.req.valid("") //生成させる
    // startJob(sessionId);
    startJob();
    return c.html(<ProgressBar progress={0.01} />);
  })
  .get("/progress", async (c) => {
    // const sessionId = /* セッションIDの取得 */;
    // const jobProgress = sessionMap[sessionId] || 0;
    const jobProgress = 100;
    return c.html(<ProgressBar progress={jobProgress} />);
  })
  .post("/reset", async (c) => {
    jobProgress = 0;
    return c.html(<>job resetted!</>);
  });

const modelRoute = new Hono();
modelRoute.get("/", async (c) => {
  const make = c.req.query("make");
  return c.html(<ModelSelect maker={make} />);
});

const modalRoute = new Hono();
modalRoute
  .get("/", async (c) => {
    return c.html(<DialogCustomedCalled />);
  })
  .post("/submit", async (c) => {
    const submitted = "submitted";
    return c.html(<>{submitted}</>);
  });

const authRoute = new Hono();
authRoute
  .get("/basic", (c) => {
    return c.html(
      <>
        <script src="https://unpkg.com/htmx.org@1.9.3"></script>
        <button hx-delete="/example/auth/basic">delete page</button>
      </>
    );
  })
  .delete("/basic", basicAuth({ username: "root", password: "root" }), (c) => {
    return c.html(<>page deleted</>);
  })
  .use(
    "/jwt/*",
    jwt({
      secret: "JWT-SECRET",
    })
  )
  .get("/jwt/page", (c) => {
    return c.text("authed by JWT");
  });

const apiRoute = new Hono();
const token = "HONO";
apiRoute
  .use(
    "/*",
    cors({
      origin: ["https://example.com", "https://example.org"],
      allowHeaders: ["X-Custom-Header", "Upgrade-Insecure-Requests"],
      allowMethods: ["POST", "GET", "OPTIONS"],
      exposeHeaders: ["Content-Length"],
      maxAge: 600,
      credentials: true,
    })
  )
  .use("/*", bearerAuth({ token }))
  .get("/page", (c) => {
    return c.html(<>api already bearer authed</>);
  });

const etagRoute = new Hono();
etagRoute.use("/*", etag()).get("/route", (c) => {
  return c.text("not need request if you have this etag");
});

const exampleRoute = new Hono();
exampleRoute
  .get("*", cache({ cacheName: "example-app", cacheControl: "max-age=3600" }))
  .get("/htmx", async (c) => {
    const { results } = await c.env.listDB
      .prepare(`SELECT id, title FROM list;`)
      .all<ListItem>();
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
  })
  .post(
    "/htmx/newest",
    zValidator(
      "form",
      z.object({
        title: z.string().min(1),
      })
    ),
    async (c) => {
      const { title } = c.req.valid("form");
      const id = crypto.randomUUID();
      await c.env.todoDB
        .prepare(`INSERT INTO list(id, title) VALUES(?, ?);`)
        .bind(id, title)
        .run();
      return c.html(<Newest id={id} title={title} />);
    }
  )
  .delete("/htmx/:id", async (c) => {
    const id = c.req.param("id");
    await c.env.todoDB.prepare(`DELETE FROM list WHERE id= ?;`).bind(id).run();
    c.status(200);
    return c.body(null);
  })
  .get("/img", async (c) => {
    return c.html(<img src="https://htmx.org/img/tokyo.png"></img>);
  })
  .get("/tabs/:tabId", async (c) => {
    return c.html(<TabContents tab={c.req.param("tabId")} />);
  })
  .get("/", async (c) => {
    return c.html(
      <>
        <script src="https://unpkg.com/htmx.org@1.9.6"></script>
        <script src="https://unpkg.com/hyperscript.org@0.9.12"></script>
        {/* <BulkUpdate>
          <ContactsTable>
            <ClickToEdit contactsList={contactsListData} isEditing={false} />
          </ContactsTable>
        </BulkUpdate>{" "}
        <hr />
        <LazyLoading /> <hr />
        <FormValidation isValid={true} /> <hr />
        <ActiveSearch>
          <SearchResults query={""} />
        </ActiveSearch>{" "}
        <hr /> */}
        {/* <ProgressBar progress={0} /> <hr /> */}
        <CascadingSelects>
          <ModelSelect maker={"audi"} />
        </CascadingSelects>{" "}
        <hr />
        <DialogCustomed /> <hr />
        <DialogInBrowser /> <hr />
        <Tabs /> <hr />
        <KeysTest />
        <hr />
        <InfiniteScroll x={1} /> <hr />
      </>
    );
  });

app.route("/todo", todoRoute);
exampleRoute.route("/contact", contactRoute);
exampleRoute.route("/modal", modalRoute);
exampleRoute.route("/job", jobRoute);
exampleRoute.route("/model", modelRoute);
exampleRoute.route("/auth", authRoute);
exampleRoute.route("/api", apiRoute);
app.route("/example", exampleRoute);
export default app;
