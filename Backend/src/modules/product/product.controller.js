import { productModel } from "../../../db/models/product.model.js";

const getAllProducts = async (req, res) => {
  const products = await productModel.find();
  res.status(200).json({ Message: "All Products", products });
};

const addProduct = async (req, res) => {
  if (req.decoded.role == "admin") {
    const product = req.body;
    const existingProduct = await productModel.findOne({ name: product.name });
    if (existingProduct) return res.status(409).json({ Message: "Product already exists, please update instead" });
    const addedProduct = await productModel.insertOne(product);
    res.status(201).json({ Message: "Added successfully", addedProduct });
  } else {
    res.status(403).json({ Message: "You can not do this action" });
  }
};

const deleteProduct = async (req, res) => {
  if (req.decoded.role == "admin") {
    const { id } = req.params;
    const deleted = await productModel.findByIdAndDelete(id);
    if (deleted)
      return res.status(200).json({ Message: "Deleted successfully", deleted });
    res.status(404).json({ Message: "Can not find product" });
  } else {
    res.status(403).json({ Message: "You can not do this action" });
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
    if (updated)
      return res.status(200).json({ Message: "Updated successfully", updated });
    res.status(404).json({ Message: "Can not find product" });
  } else {
    res.status(403).json({ Message: "You can not do this action" });
  }
};

const getProduct = async (req, res) => {
    const { id } = req.params;
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ Message: "Product not found" });
    }
    res.status(200).json({ product }); 
};

export { getAllProducts, addProduct, deleteProduct, updateProduct ,getProduct };
