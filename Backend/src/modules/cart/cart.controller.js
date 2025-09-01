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
  try {
    const cartItems = await cartModel.find({ userId: req.decoded.id }).populate('productId');
    
    if (!cartItems.length) {
      return res.status(200).json({ items: [], Message: "Your cart is empty" }); 
    }
    const formattedCart = {
      items: cartItems.map(item => ({
        _id: item._id, 
        product: item.productId, 
        quantity: item.quantity
      }))
    };
    
    res.status(200).json(formattedCart);
  } catch (error) {
    console.error("Get cart error:", error);
    res.status(500).json({ Message: "Server error" });
  }
};

const updateCartItem = async (req, res) => {
  let { quantity } = req.body; 
  const userId = req.decoded.id;
  const cartItemId = req.params.id; 
    const cartItem = await cartModel.findById(cartItemId);
  
  if (!cartItem) {
    return res.status(404).json({ Message: "Can't find cart item" });
  }
  
  if (cartItem.userId.toString() !== userId) {
    return res.status(403).json({ Message: "Unauthorized" });
  }
  
  const updated = await cartModel.findByIdAndUpdate(
    cartItemId,
    { quantity },
    { new: true }
  ).populate('productId');
  
  res.status(200).json({ Message: "Updated Successfully", updated });
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
