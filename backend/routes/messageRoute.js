import express from "express";
import { getMessage, sendMessage } from "../controllers/messageController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
const router = express.Router();

//SEND message
router.route("/send/:id").post(isAuthenticated, sendMessage);
//GET message
router.route("/:id").get(isAuthenticated, getMessage);

export default router;
