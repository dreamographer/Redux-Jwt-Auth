import express from "express";
import { adminController } from "../controllers/adminController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/users")
  .post(protect, isAdmin, adminController.createUser)
  .get(protect, isAdmin, adminController.getUsers);
router
  .route("/users/:id")
  .put(protect, isAdmin, adminController.editUser)
  .delete( protect, isAdmin, adminController.deleteUser);

export default router;
