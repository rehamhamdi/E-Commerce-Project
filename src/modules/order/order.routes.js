import { Router } from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} from "./order.controller.js";

export const orderRoutes = Router();

// create order by user
orderRoutes.post("/order", verifyToken, createOrder);

//get orders of user
orderRoutes.get("/order", verifyToken, getMyOrders);

//get all orders for all users by admin
orderRoutes.get("/orders", verifyToken, getAllOrders);

//update in order status by admin
orderRoutes.put("/order/:id", verifyToken, updateOrderStatus);

//delete an order by admin
orderRoutes.delete("/order/:id", verifyToken, deleteOrder);
