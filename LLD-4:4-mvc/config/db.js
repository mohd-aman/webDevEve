const mongoose = require("mongoose");

const DB_URL =
  "mongodb+srv://mohdaman1:C7jcY2g70yv9GHOc@cluster0.glsla.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function connectDB() {
  try {
    await mongoose.connect(DB_URL);
    console.log("Connection Established");
  } catch (err) {
    console.log(err);
  }
}

module.exports = connectDB;