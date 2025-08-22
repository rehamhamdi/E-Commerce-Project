
import { Router } from "express"
import { addToCart, deleteCartItem, getCart, updateCartItem } from "./cart.controller.js"
import { verifyToken } from "../../middleware/verifyToken.js"

export const cartRoutes=Router() 
//add products to cart
cartRoutes.post("/cart",verifyToken,addToCart)
//get all products in your cart
cartRoutes.get("/cart",verifyToken,getCart)
//update product in your cart
cartRoutes.put("/cart/:id",verifyToken,updateCartItem)
//delete product from your cart
cartRoutes.delete("/cart/:id",verifyToken,deleteCartItem)

