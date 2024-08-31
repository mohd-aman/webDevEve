const express = require("express");
const mongoose = require("mongoose");

const app = express();

// const pass = "C7jcY2g70yv9GHOc"

const DB_URL =
  "mongodb+srv://mohdaman1:C7jcY2g70yv9GHOc@cluster0.glsla.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(DB_URL)
  .then(function (connection) {
    console.log("Connection established");
  })
  .catch(function (error) {
    console.log(error);
  });

//Schema
const productSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    product_price: {
      type: String,
      required: true,
    },
    isInStock: {
      type: Boolean,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//Model for product
const ProductModel = mongoose.model("products", productSchema);

app.use(express.json()); //adding inbuilt middleware to parse json

const createProduct =  async (req, res) => {
  const body = req.body;
  const product = await ProductModel.create({
    product_name: body.product_name,
    product_price: body.product_price,
    isInStock: body.isInStock,
    category: body.category,
  });
  res.send("req success");
}

const getAllProducts = async (req, res) => {
  const allProducts = await ProductModel.find({});
  // console.log(allProducts);
  res.send(allProducts);
}

const getSingleProduct = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(id);
    const product = await ProductModel.findById(id);
    res.send(product);
  } catch (err) {
    res.send("404 Error")
  }
}

const updateProduct = async (req,res)=>{
  try{
      const id = req.params.id;
      const body = req.body;
      console.log(body);
      const product = await ProductModel.findById(id);
      console.log(product);
      Object.keys(body).forEach((key)=>{
        product[key] = body[key];
      })
      // console.log(product);
      await product.save(); // it will save the product in the database
      res.send("product has been updated")
  }catch(err){
      res.send("404 Error");
  }
}

const deleteProduct = async(req,res)=>{
  const id = req.params.id;
  await ProductModel.findByIdAndDelete(id);
  res.send("product deleted successfully");
}

app.get("/", (req, res) => {
  res.send("Welcom to our E-commerce");
});

//routes
app.post("/api/product",createProduct);
app.get("/api/products",getAllProducts);
app.get("/api/product/:id",getSingleProduct);
app.put('/api/product/:id', updateProduct);
app.delete('/api/product/:id',deleteProduct);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
