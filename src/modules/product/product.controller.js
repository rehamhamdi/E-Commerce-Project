import { productModel } from "../../../db/models/product.model.js";

const getAllProducts = async (req, res) => {
  const products = await productModel.find();
  res.json({ Message: "All Products", products });
};

const addProduct = async (req, res) => {
  if (req.decoded.role == "admin") {
    const product = req.body;
    const addedProduct = await productModel.insertOne(product);
    res.json({ Message: "Added successfully", addedProduct });
  } else {
    res.json({ Message: "You can not do this action" });
  }
};

const deleteProduct = async (req, res) => {
  if (req.decoded.role == "admin") {
    const { id } = req.params;
    const deleted = await productModel.findByIdAndDelete(id);
    if (deleted) return res.json({ Message: "Deleted successfully", deleted });
    res.json({ Message: "Can not find product" });
  } else {
    res.json({ Message: "You can not do this action" });
  }
};
const updateProduct = async (req, res) => {
  if (req.decoded.role == "admin") {
    const { id } = req.params;
    const updated = await productModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    if (updated) return res.json({ Message: "Updated successfully", updated });
    res.json({ Message: "Can not find product" });
  } else {
    res.json({ Message: "You can not do this action" });
  }
};

export { getAllProducts, addProduct, deleteProduct, updateProduct };
