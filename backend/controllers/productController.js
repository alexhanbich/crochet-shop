import asyncHandler from "../middleware/asyncHandler.js"
import Product from '../models/productModel.js'

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({ message: 'Product not found.'});
    }
    return res.json(product);
});

const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
      user: req.user._id,
      name: req.name,
      price: req.price,
      image: req.image,
      description: req.description,
      numStock: req.numStock,
      numReviews: 0,
    });
  
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  });

export { getProducts, getProductById, createProduct }