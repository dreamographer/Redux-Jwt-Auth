import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

const userController = {
  authUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);

        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          image: user.imageURL,
          isAdmin: user.isAdmin,
        });
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (err) {
      res.status(401).send({ error: "Invalid credentials" });
      console.log(err);
    }
  },

  registerUser: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      console.log(`register new user: ${req.body}`);

      const userExists = await User.findOne({ email });

      if (userExists) {
        res.status(400);
        throw new Error("User already exists");
      }

      const user = await User.create({
        name,
        email,
        password,
        image: "",
      });
      if (user) {
        generateToken(res, user._id);
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          image: user.image,
        });
      } else {
        res.status(400);
        throw new Error("Invalid user data");
      }
    } catch (error) {
      console.log(error);
    }
  },

  logoutUser: (req, res) => {
    try {
      res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
      });
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      console.log(error);
    }
  },

  getUserProfile: async (req, res) => {
    try {
      if (req.user) {
        res.json({
          _id: req.user._id,
          name: req.user.name,
          email: req.user.email,
          image: req.user.image,
        });
      } else {
        res.status(404);
        throw new Error("User not found");
      }
    } catch (error) {
      console.log(error);
    }
  },

  updateUserProfile: async (req, res) => {
    try {

      const user = await User.findById(req.user._id);
      if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.imageURL = req.body.imageUrl || user.imageURL;
     
        if (req.body.password) {
          user.password = req.body.password;
        }
        const updatedUser = await user.save();

        res.json({
          _id: updatedUser._id,
          name: updatedUser.name,
          image: updatedUser.imageURL,
          email: updatedUser.email,
        });
      } else {
        res.status(404);
        throw new Error("User not found");
      }
    } catch (error) {
      console.log(error);
    }
  },
};

export { userController };
