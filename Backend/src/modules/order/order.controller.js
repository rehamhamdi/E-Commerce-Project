
import { orderModel } from "../../../db/models/order.model.js";
import { cartModel } from "../../../db/models/cart.model.js";
import { productModel } from "../../../db/models/product.model.js";

const createOrder = async (req, res) => {
    const userId = req.decoded.id;
    const { address } = req.body;

    const cart = await cartModel.find({ userId });
    if (!cart.length) return res.status(400).json({ Message: "Cart is empty" });

    let totalPrice = 0;
    for (let item of cart) {
      const product = await productModel.findById(item.productId);
      if (product) totalPrice += product.price * item.quantity;
    }
    const order = await orderModel.create({
      userId,
      cartItems: cart.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      totalPrice,
      address
    });

    // Clear cart after order
    await cartModel.deleteMany({ userId });
    res.status(201).json({ Message: "Order created successfully", order });
  
};

const getMyOrders = async (req, res) => {
  const orders = await orderModel.find({ userId: req.decoded.id }).populate("cartItems.productId");
  res.status(200).json({ Message: "Your orders", orders });
};

const getAllOrders = async (req, res) => {
  if (req.decoded.role !== "admin") return res.status(403).json({ Message: "Not allowed" });
  const orders = await orderModel.find().populate("userId").populate("cartItems.productId");
  res.status(200).json({ Message: "All orders", orders });
};

const updateOrderStatus = async (req, res) => {
  if (req.decoded.role !== "admin") return res.status(403).json({ Message: "Not allowed" });
  const { id } = req.params;
  const { status } = req.body;
  const updated = await orderModel.findByIdAndUpdate(id, { status }, { new: true });
  if (!updated) return res.status(404).json({ Message: "Order not found" });

  res.status(200).json({ Message: "Order status updated", updated });
};

const deleteOrder = async (req, res) => {
  if (req.decoded.role !== "admin") return res.status(403).json({ Message: "Not allowed" });
  const { id } = req.params;
  const deleted = await orderModel.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ Message: "Order not found" });

  res.status(200).json({ Message: "Order deleted successfully", deleted });
};

export { createOrder, getMyOrders, getAllOrders, updateOrderStatus ,deleteOrder};
