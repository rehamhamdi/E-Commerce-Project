
import { Router } from "express";
import { deleteUser, getAllUsers, login, Register, updateUser, verifyAccount } from "./user.controller.js";
import { CheckEmail } from "../../middleware/checkEmail.js";
import { verifyToken } from "../../middleware/verifyToken.js";

export const userRoutes=Router();
//Register user
userRoutes.post("/user",CheckEmail,Register);
//login user 
userRoutes.post("/userLogin",CheckEmail,login);
//get all users
userRoutes.get("/user",verifyToken,getAllUsers );
//Update a user
userRoutes.put("/user/:id",verifyToken,updateUser );
// delete a user
userRoutes.delete("/user/:id",verifyToken,deleteUser );
//verify account 
userRoutes.get("/user/verify/:email",verifyAccount);