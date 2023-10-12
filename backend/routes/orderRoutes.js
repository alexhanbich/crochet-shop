import express from "express";
const router = express.Router();
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getAllUserOrders,
  createProductReview,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router
  .route("/")
  .post(protect, createOrder)
  .get(protect, admin, getAllUserOrders);
router.route("/orders").get(protect, getOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/paid").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);
router.route("/reviews").post(protect, createProductReview);

export default router;
