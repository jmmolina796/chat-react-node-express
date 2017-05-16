import http from "http";
import express from "express";
import path from "path";
import bodyParser from "body-parser";

import index from "./server/routes/index";
import person from "./server/routes/person";

const port = 3000;
const url = "localhost"
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/static", express.static(path.join(__dirname,"/public")));

app.use("/",index);
app.use("/person",person);

const server = http.createServer(app).listen(port, url, () => {
	console.log("Server running at http://localhost:3000");
});
