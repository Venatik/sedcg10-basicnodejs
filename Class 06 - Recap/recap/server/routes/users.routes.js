import express from "express";
import {
    getUsers,
    registerUser,
    loginUser,
    editUser,
    deleteUser
} from "../services/users.service.js";
import { loggerEmitter } from "../services/logger.service.js";

const router = express.Router();

router.get("/users", (req, res) => {
    const queryData = req.query; // if no query data, it will return {}
    try {
        const users = getUsers(queryData);
        res.status(200).send(users);
        loggerEmitter.emit("log", "Get Users", "Success");
    } catch (error) {
        res.status(404).send(error.message);
        loggerEmitter.emit("log", "Get Users", "Fail");
    }
});

router.post("/users/register", (req, res) => {
    try {
        const userData = req.body;
        const createdUser = registerUser(userData);
        res.status(201).send(createdUser);
        loggerEmitter.emit("log", "Register User", "Success");
    } catch (error) {
        res.status(400).send(error.message);
        loggerEmitter.emit("log", "Register User", "Fail");
    }
});

router.post("/users/login", (req, res) => {
    try {
        const userData = req.body;
        const loggedInUser = loginUser(userData);
        res.status(200).send(loggedInUser);
        loggerEmitter.emit("log", "Login User", "Success");
    } catch (error) {
        res.status(401).send(error.message); // 401 - Unauthorized
        loggerEmitter.emit("log", "Login User", "Fail");
    }
});

router.patch("/users/:id", (req, res) => {
    try {
        const userId = req.params.id;
        const userData = req.body;
        const updatedUser = editUser(userId, userData);
        res.status(200).send(updatedUser);
        loggerEmitter.emit("log", "Edit User", "Success");
    } catch (error) {
        res.status(404).send(error.message);
        loggerEmitter.emit("log", "Edit User", "Fail");
    }
});

router.delete("/users/:id", (req, res) => {
    try {
        const userId = req.params.id;
        deleteUser(userId);
        res.status(200).send({ message: "User deleted successfully." });
        loggerEmitter.emit("log", "Delete User", "Success");
    } catch (error) {
        res.status(404).send({ error: error.message });
        loggerEmitter.emit("log", "Delete User", "Fail");
    }
});

export { router };