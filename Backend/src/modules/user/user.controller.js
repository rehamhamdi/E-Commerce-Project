import { userModel } from "../../../db/models/user.model.js";
import { sendMail } from "../../utilities/sendEmail.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const Register = async (req, res) => {
  if (req.exist)
    return res.status(409).json({ Message: "This user already exists, please login" });
  req.body.password = bcrypt.hashSync(req.body.password, 8);
  const addedUser = await userModel.insertOne(req.body);
  addedUser.password = undefined;
  sendMail(req.body.email);
  res.status(201).json({ Message: "Thank you for registering, Please confirm your email for more functionality", addedUser });
};

const login = async (req, res) => {
  if (!req.exist) return res.status(401).json({ Message: "email or password are invalid" });
  const matched = bcrypt.compareSync(req.body.password, req.exist.password);
  if (!matched) return res.status(401).json({ Message: "email or password are invalid" });
  const token = jwt.sign({ id: req.exist._id, role: req.exist.role }, "key");
    if(req.exist.isConfirmed==false) return  res.status(403).json({ Message: "Please confirm your email"});
  res.status(200).json({ Message: `Welcome Back`, token });
};

const getAllUsers = async (req, res) => {
  if (req.decoded.role == "admin") {
    const allUsers = await userModel.find().select("-password");
    res.status(200).json({ Message: "All users", allUsers });
  } else {
    res.status(403).json({ Message: "you can't do this action" });
  }
};

const updateUser = async (req, res) => {
  if (req.decoded.role == "admin" || req.decoded.id === req.params.id) {
    const { id } = req.params;
    const updatedUser = await userModel
      .findByIdAndUpdate(id, { ...req.body }, { new: true })
      .select("-password");
    if (updatedUser)
      return res.status(200).json({ Message: "Updated Successfully", updatedUser });
    res.status(404).json({ Message: "Can't find user" });
  } else {
    res.status(403).json({ Message: "you can't do this action" });
  }
};

const deleteUser = async (req, res) => {
  if (req.decoded.role == "admin" || req.decoded.id === req.params.id) {
    const id = req.params.id;
    const user = await userModel.findByIdAndDelete(id);
    if (user) return res.status(200).json({ Message: "Deleted Successfully" });
    res.status(404).json({ Message: "Can't find user" });
  } else {
    res.status(403).json({ Message: "you can't do this action" });
  }
};

const verifyAccount=(req,res)=>{
  let {email}=req.params
  jwt.verify(email,"EmailKey",async(err,decoded)=>{
    if(err) return res.status(400).json({Message:"Invalid Token",err})
  await userModel.findOneAndUpdate({email:decoded.email}, {isConfirmed: true})
  res.status(200).json({Message:"Email confirmed successfully"})
  })
}

export { Register, login, getAllUsers, updateUser, deleteUser,verifyAccount };
