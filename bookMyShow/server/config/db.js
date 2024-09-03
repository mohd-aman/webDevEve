const mongoose = require("mongoose");

async function connectDB(DB_URL) {
  try {
    await mongoose.connect(DB_URL);
    console.log("Connection Established");
  } catch (err) {
    console.log(err);
  }
}

module.exports = connectDB;