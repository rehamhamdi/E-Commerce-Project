import { dbConnection } from "./db/dbConnection.js";
import express from "express";
import { userRoutes } from "./src/modules/user/user.routes.js";
import { productRoutes } from "./src/modules/product/product.routes.js";
import { cartRoutes } from "./src/modules/cart/cart.routes.js";
import { orderRoutes } from "./src/modules/order/order.routes.js";
import cors from "cors"

dbConnection;

const app = express();
app.use(cors())
app.use(express.json());
app.use(userRoutes);
app.use(productRoutes)
app.use(cartRoutes)
app.use(orderRoutes)

app.listen(3000, () => {
  console.log("Server Running");
});
