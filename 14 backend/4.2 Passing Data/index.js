import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const data = {
    upperText: "<h1>Enter Your Name Below</h1>",
  };
  res.render("index.ejs", data);
});


app.post("/submit", (req, res) => {
  var nrWords = req.body["fName"].length + req.body["lName"].length;
  const data = {
    upperText: "<h1>Your Answer Contains "+ nrWords + " words </h1>",
  };
  res.render("index.ejs", data);
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
