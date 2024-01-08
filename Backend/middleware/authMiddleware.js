import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
const token = process.env.JWT_SECRET;
const protect = async (req, res, next) => {
  try {
    let token;
    token = req.cookies.jwt;
    if (token) {
      try {
        const decoded = jwt.verify(token,`${token}`);
        req.user = await User.findById(decoded.userId).select("-password");

        next();
      } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    } else {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  } catch (error) {
    console.log(error);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(401);
      throw new Error("not authorized, no privillege");
    }
  } catch (error) {
    console.log(error);
  }
};

export { protect, isAdmin };
