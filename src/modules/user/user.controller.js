import { userModel } from "../../../db/models/user.model.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendMail } from "../../../utilities/sendEmail.js";

const Register = async (req, res) => {
  if (req.exist)
    return res.json({ Message: "This user already exists, please login" });
  req.body.password = bcrypt.hashSync(req.body.password, 8);
  const addedUser = await userModel.insertOne(req.body);
  addedUser.password = undefined;
  sendMail(req.body.email);
  res.json({ Message: "Thank you for registering, Please confirm your email for more functionality", addedUser });
};

const login = async (req, res) => {
  if (!req.exist) return res.json({ Message: "email or password are invalid" });
  const matched = bcrypt.compareSync(req.body.password, req.exist.password);
  if (!matched) return res.json({ Message: "email or password are invalid" });
  const token = jwt.sign({ id: req.exist._id, role: req.exist.role }, "key");
    if(req.exist.isConfirmed==false) return  res.json({ msg: "Please confirm your email"});
  res.json({ Message: `Welcome Back`, token });
};

const getAllUsers = async (req, res) => {
  if (req.decoded.role == "admin") {
    const allUsers = await userModel.find().select("-password");
    res.json({ Message: "All users", allUsers });
  } else {
    res.json({ Message: "you can't do this action" });
  }
};

const updateUser = async (req, res) => {
  if (req.decoded.role == "admin" || req.decoded.id === req.params.id) {
    const { id } = req.params;
    const updatedUser = await userModel
      .findByIdAndUpdate(id, { ...req.body }, { new: true })
      .select("-password");
    if (updatedUser)
      return res.json({ Message: "Updated Successfully", updatedUser });
    res.json({ Message: "Can't find user" });
  } else {
    res.json({ Message: "you can't do this action" });
  }
};

const deleteUser = async (req, res) => {
  if (req.decoded.role == "admin" || req.decoded.id === req.params.id) {
    const id = req.params.id;
    const user = await userModel.findByIdAndDelete(id);
    if (user) return res.json({ Message: "Deleted Successfully" });
    res.json({ Message: "Can't find user" });
  } else {
    res.json({ Message: "you can't do this action" });
  }
};

const verifyAccount=(req,res)=>{
  let {email}=req.params
  jwt.verify(email,"EmailKey",async(err,decoded)=>{
    if(err) return res.json({Message:"Invalid Token",err})
  await userModel.findOneAndUpdate({email:decoded.email}, {isConfirmed: true})
  res.json({Message:"Email confirmed successfully"})
  })
}

export { Register, login, getAllUsers, updateUser, deleteUser,verifyAccount };
