import express from "express";
import cors from "cors";
import router from "./routes/router.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(router);

const PORT = process.env.PORT
const HOST = process.env.HOST;

app.use("/api", router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});