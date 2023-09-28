import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import calc from "../utils/calc.js";

const createOrder = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod } = req.body;
  const shippingAddress_temp = ''
  const paymentMethod_temp = ''
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No items in cart");
  } 
  else {
    console.log(typeof orderItems)
    const itemsFromDB = await Product.find({
      _id: { $in: orderItems.map((i) => i._id) },
    });
    // check if order is same on database
    const dbOrderItems = orderItems.map((clientItem) => {
      const matchItem = itemsFromDB.find(
        (dbItem) => dbItem._id.toString() === clientItem._id
      );
      return {
        ...clientItem,
        product: clientItem._id,
        price: matchItem.price,
        _id: undefined,
      };
    });
    const { itemsPrice, taxPrice, shippingPrice, totalPrice } = calc(dbOrderItems);
    console.log("before")
    const order = new Order({
      orderItems: dbOrderItems,
      user: req.user._id,
      shippingAddress_temp,
      paymentMethod_temp,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    console.log(order)
    let createdOrder = null;
    try {
      createdOrder = await order.save();
    }
    catch (err) {
      console.log(err)
    }
    
    console.log(createOrder)
    res.status(201).json(createdOrder);
  }
});

const getOrders = asyncHandler(async (req, res) => {
  res.send("get my order items");
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order
    .findById(req.params.id)
    .populate("user", "name email");
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send("update order to paid");
});

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send("update order to delivered");
});

const getAllUserOrders = asyncHandler(async (req, res) => {
  res.send("get all user orders");
});

export {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getAllUserOrders,
};
