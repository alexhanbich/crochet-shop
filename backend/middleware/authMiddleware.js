import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
    let token = req.cookies.jwt;
    console.log(token)
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        }
        catch (error) {
            res.status(401);
            throw new Error('Not authorized (token failed).')
        }
    }
    else {
        res.status(401);
        throw new Error('Not authorized (no token).')
    }
});

const admin = (req, res, next) => {
    console.log(req, "come on man")
    if (req.user && req.user.isAdmin) {
        next();
    }
    else {
        res.status(401);
        throw new Error('Not authorized (not admin).')
    }
}

export { protect, admin };