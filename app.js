require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const UrlRoutes = require("./routes/shorturl.route");

app.use((req, res, next) => {
  method = req.method;
  path = req.path;
  ip = req.ip;
  console.log(method + " " + path + " - " + ip);
  next();
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.get("/api/ping", function (req, res) {
  res
    .status(200)
    .json({ status: "healthy" });
});

app.use("/api", UrlRoutes);

app.use("*", (req, res) => {
  res.status(404).json({ error: "Not Found" });
});

module.exports = app;
