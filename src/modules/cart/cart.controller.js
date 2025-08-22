import { cartModel } from "../../../db/models/cart.model.js";
import { productModel } from "../../../db/models/product.model.js";

const addToCart = async (req, res) => {
  let { userId, productId } = req.body;
  if (req.decoded.id == userId) {
    const product = await productModel.findById(productId);
    if (product) {
      await cartModel.insertOne(req.body);
      res.json({ Message: "product Added to your cart" });
    } else {
      res.json({ Message: "can't find product" });
    }
  } else {
    res.json({ Message: "can't find cart" });
  }
};

const getCart = async (req, res) => {
  const cart = await cartModel.find({ userId: req.decoded.id });
  res.json({ Message: "Your cart", cart });
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
    if (!updated) return res.json({ Message: "can't find cart" });
    res.json({ Message: "Updated Successfully", updated });
  } else {
    res.json({ Message: "can't find product" });
  }
};

const deleteCartItem = async (req, res) => {
  const userId = req.decoded.id;
  const deleted = await cartModel.findOneAndDelete({
    _id: req.params.id,
    userId,
  });
  if (!deleted) return res.json({ Message: "can't find cart" });
  res.json({ Message: "Deleted Successfully", deleted });
};

export { addToCart, getCart, updateCartItem, deleteCartItem };
