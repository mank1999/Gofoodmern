const mongoose = require("mongoose");
const dbUrl =
  "mongodb+srv://Gofood:DaFkoMAvJNPOwDWw@cluster0.qaddbc3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const MongoDB = () => {
  mongoose
    .connect(dbUrl)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log("err", err);
    });
};

module.exports = MongoDB;
