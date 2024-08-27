const mongoose = require("mongoose");

let DBURL = process.env.MONGO_URI;
const DBPASSWORD = process.env.MONGO_PASSWORD;
DBURL = DBURL.replace("<db_password>", DBPASSWORD);
// console.log(DBURL);
const connectToDB = async () => {
  try {
    const connection = await mongoose.connect(DBURL);
    if (connection) {
      console.log("Connected to the DB successfully");
    }
  } catch (error) {
    console.log("Error when connecting to the DB", error);
  }
};

module.exports = connectToDB;
