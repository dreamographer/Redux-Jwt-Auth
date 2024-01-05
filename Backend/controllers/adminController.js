import User from "../models/userModel.js";

const adminController = {
  getUsers: async (req, res) => {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
    }
  },

  createUser: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const userExists = await User.findOne({ email });
      if (userExists) {
        res.status(400);
        throw new Error("User already exists.");
      }

      const user = await User.create({ name, email, password });
      if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
        });
      } else {
        res.status(400);
        throw new Error("Invalid user data.");
      }
    } catch (error) {
      console.log(error);
    }
  },

  editUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email } = req.body;
console.log(id);
      const user = await User.findById(id);
      // todo: verify/validate user credentials
      if (user) {
        user.name = name || user.name;
        user.email = email || user.email;

        const updatedUser = await user.save();
        res.status(200).json({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
        });
      } else {
        res.status(404);
        throw new Error("User not found.");
      }
    } catch (error) {
      console.log(error);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;

      const user = await User.findByIdAndDelete(id);
      console.log(user);
      if (user) {
       return res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
        })
      } else {
        res.status(404);
        throw new Error("User not found.");
      }
    } catch (error) {
      console.log(error);
    }
  },
};

export { adminController };
