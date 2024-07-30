const express = require("express");
const router = require("./Routes/Createuser");
const { query, validationResult, matchedData } = require("express-validator");
// const EmployeeRoutes = require('./praacticeDb/routes/empRoute')
const app = express();
const port = 5000;
const MongoDB = require("./db");
MongoDB();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type,Accept "
  );
  next();
});
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/hello", query("person").notEmpty().escape(), (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const data = matchedData(req);
    return res.send(`Hello, ${data.person}!`);
  }

  res.send({ errors: result.array() });
});
app.use(express.json());
app.use("/api", router);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
