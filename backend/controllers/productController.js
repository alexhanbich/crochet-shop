import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";

const getProducts = asyncHandler(async (req, res) => {
  if (Number(req.query.pageNumber) == -1) {
    const products = await Product.find({});
    res.json({ products });
  } else {
    const NUM_ITEMS = 8;
    const page = Number(req.query.pageNumber) || 1;
    const count = await Product.countDocuments({});
    const products = await Product.find({})
      .limit(NUM_ITEMS)
      .skip(NUM_ITEMS * (page - 1));
    res.json({ products, page, pages: Math.ceil(count / NUM_ITEMS) });
  }
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found." });
  }
  return res.json(product);
});

const getFavoriteProducts = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const products = await Product.find({ _id: { $in: user.favorites } });
  if (!products) {
    return res.status(404).json({ message: "Products not found." });
  }
  return res.json(products);
});

const createProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, numStock } = req.body;
  const product = new Product({
    name: name,
    price: price,
    image: image,
    description: description,
    numStock: numStock,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, numStock } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.numStock = numStock;
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
  getProducts,
  getProductById,
  getFavoriteProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
