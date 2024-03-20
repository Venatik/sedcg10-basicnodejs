import express from "express";
import jwt from "jsonwebtoken";

const secretKey = "secret_key"; // don't use this in production, don't push to git

const app = express();
app.use(express.json());
const PORT = 3000;

const authenticate = (req, res, next) => {
    const accessToken = req.header("Authorization");

    if (!accessToken) {
        return res.status(401).send("Access denied. No token provided.");
    }

    try {
        const decoded = jwt.verify(accessToken, secretKey);
        req.user = decoded.user;
        next();
    } catch (error) {
        return res.status(403).send("Access denied. Invalid token.");
    }
};

// All middlewares go between the route and the callback function
app.post("/login", (req, res) => {
    const user = {
        id: 1,
        username: "bobo",
    };

    const accessToken = jwt.sign({ user }, secretKey, { expiresIn: "1h" });

    res.header("authorization", accessToken).json({ accessToken });
});

app.get("/protected", authenticate, (req, res) => {
    res.send({
        message:
            "This is a protected route that can be accessed only by a user who has logged in."
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});