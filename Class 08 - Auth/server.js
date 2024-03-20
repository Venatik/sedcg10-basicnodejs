import express from "express";
import cookieParse from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js";

const app = express();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/liveness", (req, res) => {
    res.send("Server is live");
});

app.use(productRouter);

app.listen(PORT, HOST, () => {
    console.log(`Server is listening on port ${PORT}`);
});