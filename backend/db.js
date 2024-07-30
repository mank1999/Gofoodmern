const mongoose = require("mongoose");
const dbUrl =
  "mongodb+srv://Gofood:HlCPTRZLm5dht0Pe@cluster0.qaddbc3.mongodb.net/Gofood?retryWrites=true&w=majority&appName=Cluster0";
const MongoDB = async () => {
  await mongoose.connect(dbUrl);
  console.log(`MongoDB Connected: {conn.connection.host}`);

  try {
    await mongoose.connect(dbUrl);
    console.log(`MongoDB Connected: {conn.connection.host}`);
    const fetchdata = await mongoose.connection.db.collection("fooddata");
    // const data = await JSON.parse(fetchdata);
    console.log(typeof fetchdata);
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = MongoDB;
