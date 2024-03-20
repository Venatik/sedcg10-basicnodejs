import express from "express";
import productSession from "../sessions/product.session.js";
import authSession from "../sessions/auth.session.js";
import validateAuthSession from "../middleware/auth-session.middleware.js";

const productRouter = express.Router();

productRouter.get("/", productSession, (req, res) => {
    req.session.greetings = "Hello world!";
    res.send("<h1>Default page</h1>");
});

productRouter.post("/login", authSession, (req, res) => {
    const user = {
        username: "jillwayne",
        password: "jill123",
    };

    const { username, password } = req.body;

    if (username === user.username && password === user.password) {
        req.session.user = {
            user: username,
            isLoggedIn: true,
        };
        res.status(200).send({ message: "Logged in successfully." });
    } else {
        res.status(403).send({ message: "Invalid credentials" });
    }
});

productRouter.get("/products", productSession, (req, res) => {
    const session = req.session;
    console.log("SESSION", session);

    console.log(session.greetings);

    const products = [
        { id: "1", name: "iPhone 13 Pro", price: 800 },
        { id: "2", name: "Smart Watch", price: 250 },
    ];
    res.send(products);
});

productRouter.get("/products_premium", authSession, productSession, validateAuthSession, (req, res) => {
    console.log(req.session);

    const premiumProducts = [
        { id: "1", name: "iPhone 15 Pro Max 1TB", price: 1500 },
        { id: "2", name: "Apple Smart Watch Series 8", price: 750 },
    ];

    const session = req.session;
    if (session.user !== undefined && session.user.isLoggedIn === true) {
        res.send(premiumProducts);
    } else {
        res.status(401).send({ message: "You need to log in first" });
    }
});

export default productRouter;