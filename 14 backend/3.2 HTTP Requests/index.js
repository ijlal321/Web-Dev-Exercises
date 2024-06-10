import exp from "constants";
import express from "express";
const app = express();
const port = 3000;


app.get("/", (req, res) =>{
    res.send("<h1>Hello Word</h1>");
});

app.listen(port, () => {
    console.log("listening to port " + port);
})




