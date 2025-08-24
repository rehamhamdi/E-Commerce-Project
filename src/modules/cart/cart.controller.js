import { cartModel } from "../../../db/models/cart.model.js";
import { productModel } from "../../../db/models/product.model.js";

const addToCart = async (req, res) => {
  let { userId, productId } = req.body;
  if (req.decoded.id == userId) {
    const product = await productModel.findById(productId);
    if (product) {
      await cartModel.insertOne(req.body);
      res.status(201).json({ Message: "product Added to your cart" });
    } else {
      res.status(404).json({ Message: "can't find product" });
    }
  } else {
    res.status(403).json({ Message: "can't find cart" });
  }
};

const getCart = async (req, res) => {
  const cart = await cartModel.find({ userId: req.decoded.id });
  if (!cart.length) {
    return res.json({ Message: "Your cart is empty" }); 
  }
  res.status(200).json({ Message: "Your cart", cart });
};

const updateCartItem = async (req, res) => {
  let { productId, quantity } = req.body;
  const userId = req.decoded.id;
  const product = await productModel.findById(productId);
  if (product) {
    const updated = await cartModel.findOneAndUpdate(
      { _id: req.params.id, userId },
      { quantity },
      { new: true }
    );
    if (!updated) return res.status(404).json({ Message: "can't find cart" });
    res.status(200).json({ Message: "Updated Successfully", updated });
  } else {
    res.status(404).json({ Message: "can't find product" });
  }
};

const deleteCartItem = async (req, res) => {
  const userId = req.decoded.id;
  const deleted = await cartModel.findOneAndDelete({
    _id: req.params.id,
    userId,
  });
  if (!deleted) return res.status(404).json({ Message: "can't find cart" });
  res.status(200).json({ Message: "Deleted Successfully", deleted });
};

export { addToCart, getCart, updateCartItem, deleteCartItem };
