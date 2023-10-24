import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

import { renderer, AddTodo, Item, Htmx, Newest } from "./components";
import { HtmlElt, ListItem, ScriptElt } from "./components/graphs";
import { BulkUpdate, EditTable, KeysTest } from "./components/keys";
import { DeleteRow } from "./components/keys/DeleteRow";

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

app.get("/example", async (c) => {
  return c.html(
    <>
      <script src="https://unpkg.com/htmx.org@1.9.6"></script>
      {/* <EditTable isEditing={false} /> */}
      {/* <BulkUpdate /> */}
      <DeleteRow />
    </>
  );
});

app.get("/example/contact/1/edit", async (c) => {
  return c.html(
    <>
      <EditTable isEditing={true} />
    </>
  );
});

app.put("/example/contact/1", async (c) => {
  return c.html("submitted");
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
export default app;
