import express from "express";
const router = express.Router();
import {
  registerUser,
  loginUser,
  logoutUser,
  getProfileUser,
  updateProfileUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser).get(protect, admin, getAllUsers);
router.post("/logout", logoutUser);
router.post("/login", loginUser);
router
  .route("/profile")
  .get(protect, getProfileUser)
  .put(protect, updateProfileUser);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;
