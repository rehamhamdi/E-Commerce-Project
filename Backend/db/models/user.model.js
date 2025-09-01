
import mongoose from "mongoose";

const usersSchema = new mongoose.Schema(
  {
    name: String,
    age: Number,
    email: String,
    password: String,
    isConfirmed: {
      type: Boolean,
      default: false,
    },
    role: {
      type:String,
      default:"user",
      enum:["user","admin"]
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const userModel=mongoose.model("User",usersSchema);
