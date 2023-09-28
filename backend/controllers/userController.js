import asyncHandler from "../middleware/asyncHandler.js";
import User from '../models/userModel.js';
import generateToken from "../utils/generateToken.js";

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({email: email});
    if (userExists) {
        res.status(400);
        throw new Error('User already exists.');
    }
    const user = await User.create({
        name, email, password
    });
    if (user) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
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
    }
    else {
        res.status(401);
        throw new Error("Invalid email or password.");
    }
});

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expiresIn:new Date(0)
    });
    res.status(200).json({ message: 'Logged out.' })
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
    }
    else {
        res.status(404);
        throw new Error('User not found.');
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
    }
    else {
        res.status(404);
        throw new Error('User not found.');
    }
});

const getAllUsers = asyncHandler(async (req, res) => {
    res.send('get user');
});

const getUserById = asyncHandler(async (req, res) => {
    res.send('get user by id');
});

const updateUser = asyncHandler(async (req, res) => {
    res.send('update user');
});

const deleteUser = asyncHandler(async (req, res) => {
    res.send('delete user');
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
    deleteUser
}