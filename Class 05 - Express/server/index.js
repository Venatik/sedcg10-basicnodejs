import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import exp from 'constants';

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

// Our server can accept data in JSON format
app.use(express.json());

app.use(cors());

app.get("/home", (req, res) => {
    res.send("Hello from Express!");
});

const currentFileUrl = import.meta.url;
const currentFilePath = fileURLToPath(currentFileUrl);
const projectPath = path.dirname(currentFilePath);

const staticHomePagePath = path.join(projectPath, "homePage");
const staticAboutPagePath = path.join(projectPath, "aboutPage");

app.use("/home", express.static(staticHomePagePath));
app.use("/about", express.static(staticAboutPagePath));

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});