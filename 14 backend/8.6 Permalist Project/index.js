import express from "express";
import bodyParser from "body-parser";
import pg from "pg"

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "11111111",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [
];

async function loadAllItems()
{
  const result = await db.query("SELECT * FROM items ORDER BY id ASC");
  let items = [];
  result.rows.forEach(item => {
    items.push({id: item.id, title: item.title });
  });
  return items;
}

app.get("/", async (req, res) => {
  items = await loadAllItems();
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async(req, res) => {
  const item = req.body.newItem;
  await db.query("INSERT INTO items (title) VALUES ($1)", [item]);
  res.redirect('/');
});

app.post("/edit", async(req, res) => {
  var updatedItemId = req.body.updatedItemId;
  var updatedItemTitle = req.body.updatedItemTitle;
  await db.query("UPDATE items set title = $1 where id = $2 ;", [updatedItemTitle, updatedItemId]);
  res.redirect('/');
});

app.post("/delete", async (req, res) => {
  await db.query("DELETE FROM items where id = $1 ;", [req.body.deleteItemId]);
  res.redirect('/');

});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
