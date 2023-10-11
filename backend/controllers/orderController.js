import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import calc from "../utils/calc.js";

const createOrder = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No items in cart");
  } else {
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
    const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
      calc(dbOrderItems);
    let order = null;
    try {
      order = new Order({
        orderItems: dbOrderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });
    } catch (err) {
      console.log(err);
    }
    let createdOrder = null;
    try {
      createdOrder = await order.save();
    } catch (err) {
      console.log(err);
    }
    res.status(201).json(createdOrder);
  }
});

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: 'desc' });
  res.json(orders);
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
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
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

const getAllUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name').sort({ isDelivered: 'asc' }).sort({ createdAt: 'desc' });
  res.json(orders);
});

export {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getAllUserOrders,
};
