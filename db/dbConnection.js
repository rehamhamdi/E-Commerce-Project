import mongoose from "mongoose";

export const dbConnection = mongoose
  .connect("mongodb://localhost:27017/E-Commerce")
  .then(() => console.log("db running"))
  .catch((err) => console.log(err));
