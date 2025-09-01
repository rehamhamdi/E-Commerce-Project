import { Router } from "express";
import { addProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "./product.controller.js";
import { verifyToken } from "../../middleware/verifyToken.js";

export const productRoutes=Router()

productRoutes.get("/product",getAllProducts)
productRoutes.post("/product",verifyToken,addProduct)
productRoutes.delete("/product/:id",verifyToken,deleteProduct)
productRoutes.put("/product/:id",verifyToken,updateProduct)
productRoutes.get("/product/:id", verifyToken, getProduct);


