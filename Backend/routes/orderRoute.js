import express from "express";
import authMiddleware from "../middleware/auth.js";
// import { placeOrder } from "../controllers/orderController.js";

import { createOrder, verifyPayment } from "../controllers/orderController.js";

const orderRouter = express.Router();

// orderRouter.post("/place", authMiddleware, placeOrder);
// orderRouter.post("/verify",verifyOrder);

orderRouter.post("/createOrder", createOrder);
orderRouter.post("/verifyPayment", verifyPayment);

export default orderRouter;