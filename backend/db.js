const mongoose = require("mongoose");
require('dotenv').config()
const dbUrl = process.env.mongoDB_URL;
const MongoDB = async () => {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to MongoDb");
    const fetchdata = await mongoose.connection.db.collection("fooddata");
    const data = await fetchdata.find({}).toArray();
    global.foodData = data;
    const fetchfoodCatg = await mongoose.connection.db.collection(
      "foodCategory"
    );
    const foodCatg = await fetchfoodCatg.find({}).toArray();
    global.foodCatg = foodCatg;
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = MongoDB;
