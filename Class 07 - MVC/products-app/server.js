import express from "express";
import cors from "cors";
import router from "./routes/product.router.js";

// Initialize express
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

// Routes
app.use("/api/products", router);

app.listen(PORT, HOST, () => {
    console.log(`Server is running on port: ${PORT}`);
});