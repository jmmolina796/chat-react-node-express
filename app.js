import http from "http";
import express from "express";
import path from "path";

import index from "./server/routes/index";

const port = 3000;
const url = "localhost"
const app = express();

app.use("/static", express.static(path.join(__dirname,"/public")));

app.use("/",index);

const server = http.createServer(app).listen(port, url, () => {
	console.log("Server running at http://localhost:3000");
});
