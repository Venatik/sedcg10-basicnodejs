import express from "express";
import cors from "cors";
import { router as usersRouter } from "./routes/users.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

app.use(express.json());
app.use(cors());

app.use("/api", usersRouter);

app.listen(PORT, HOST, () => {
    console.log(`Server is running on port: ${PORT}`);
});