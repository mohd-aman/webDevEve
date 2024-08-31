const ProductModel = require("../models/productModel");

const createProduct = async (req, res) => {
  const body = req.body;
  const product = await ProductModel.create({
    product_name: body.product_name,
    product_price: body.product_price,
    isInStock: body.isInStock,
    category: body.category,
  });
  res.send("req success");
};

const getAllProducts = async (req, res) => {
  const allProducts = await ProductModel.find({});
  // console.log(allProducts);
  res.send(allProducts);
};

const getSingleProduct = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(id);
    const product = await ProductModel.findById(id);
    res.send(product);
  } catch (err) {
    res.send("404 Error");
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    console.log(body);
    const product = await ProductModel.findById(id);
    console.log(product);
    Object.keys(body).forEach((key) => {
      product[key] = body[key];
    });
    // console.log(product);
    await product.save(); // it will save the product in the database
    res.send("product has been updated");
  } catch (err) {
    res.send("404 Error");
  }
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;
  await ProductModel.findByIdAndDelete(id);
  res.send("product deleted successfully");
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
