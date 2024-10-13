import express from "express";
import {
  register,
  login,
  logout,
  getOtherUser,
} from "../controllers/userController.js"; // Import both register and login controllers
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

//user route me jaa raha hai us route me ten waha se post bhej rahe req in body
// Register route
router.route("/register").post(register);

// Login route
router.route("/login").post(login);

//Loggout route
router.route("/logout").get(logout);

//OtherUser route
// this route is run when user is Authenticated
router.route("/").get(isAuthenticated, getOtherUser);

export default router;
