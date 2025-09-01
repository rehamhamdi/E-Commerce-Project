import { userModel } from "../../db/models/user.model.js"


export const CheckEmail=async (req,res,next)=>{
     req.exist=await userModel.findOne({email:req.body.email}) 
     next()
}