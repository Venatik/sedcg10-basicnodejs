import { Router } from "express";
import productsRouter from "./product.router.js";

const router = Router();

// Routes is responsible for listing the routes, and calling the respective controller method
// No logic should be implemented here, only the reference to the controller method

router.use("/products", productsRouter);

export default router;