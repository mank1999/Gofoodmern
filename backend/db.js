const mongoose = require("mongoose");
const dbUrl =
  "mongodb+srv://Gofood:HlCPTRZLm5dht0Pe@cluster0.qaddbc3.mongodb.net/Gofood?retryWrites=true&w=majority&appName=Cluster0";
  // const urldb = "mongodb+srv://Gofood:HlCPTRZLm5dht0Pe@cluster0.qaddbc3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
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
