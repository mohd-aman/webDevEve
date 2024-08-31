const express = require("express");
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes')

const app = express();

//connect to db
connectDB();

app.use(express.json()); //adding inbuilt middleware to parse json

app.use('/api/product',productRoutes);

//default routes
app.get("/", (req, res) => {
  res.send("Welcom to our E-commerce");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
