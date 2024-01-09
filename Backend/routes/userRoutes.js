import express from "express";
import {userController} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import multer from "multer"
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./Backend/uploads");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post("/", userController.registerUser);
router.post("/auth", userController.authUser); 
router.post("/logout", userController.logoutUser);
router.post("/upload", upload?.single("avatar"), (req, res) => {
  res.send(req.file.path.substring(16));
});
router 
  .route("/profile")
  .get(protect, userController.getUserProfile)
  .put(protect, userController.updateUserProfile);

export default router;
