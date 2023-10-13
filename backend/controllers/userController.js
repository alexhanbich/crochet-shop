import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import generateToken from "../utils/generateToken.js";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists.");
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user && (await user.verifyPassword(password))) {
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password.");
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expiresIn: new Date(0),
  });
  res.status(200).json({ message: "Logged out." });
});

const getProfileUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

const updateProfileUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Can not delete admin user");
    }
    await User.deleteOne({ _id: user._id });
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const removeUserFavorites = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body.userId);
  if (user) {
    let product = user.favorites.find((i) => i._id === req.body.favoriteId);
    if (product) {
      var index = user.favorites.indexOf(product);
      if (index !== -1) {
        user.favorites.splice(index, 1);
      }
      user.favorites.splice(index, 1);
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        favorites: updatedUser.favorites,
        didUpdate: true,
      });
    } else {
      res.status(404);
      throw new Error("Item not in favorites.");
    }
  }
});

const getUserFavorites = asyncHandler(async (req, res) => {
  if (req.params.id === "loading") {
    return res.json("");
  }
  const user = await User.findById(req.params.id);
  const products = await Product.find({
    _id: { $in: user.favorites.map((i) => i._id) },
  });
  if (!products) {
    return res.status(404).json({ message: "Products not found." });
  }
  return res.json(products);
});

const updateUserFavorites = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.favorites = [...req.body.favoriteItems];
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      favorites: updatedUser.favorites,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getDefaultAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json(user.address);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateDefaultAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    const address = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      addressDetails: req.body.addressDetails,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      zipCode: req.body.zipCode,
      phone: req.body.phone,
    };
    user.address = address;
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      favorites: updatedUser.favorites,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  registerUser,
  loginUser,
  logoutUser,
  getProfileUser,
  updateProfileUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  removeUserFavorites,
  getUserFavorites,
  updateUserFavorites,
  getDefaultAddress,
  updateDefaultAddress,
};
