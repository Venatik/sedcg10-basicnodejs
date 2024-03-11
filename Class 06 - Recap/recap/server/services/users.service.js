import { loggerEmitter, projectPath } from "./logger.service.js";
import fs, { write } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const usersFilePath = path.join(projectPath, "..", "data", "users.json");

const writeToFile = (data) => {
    const stringifiedData = JSON.stringify(data);
    fs.writeFileSync(usersFilePath, stringifiedData);
};

export const getUsers = (queryData) => {
    // accepted query params are: key: role, value: admin | standard
    let users = fs.readFileSync(usersFilePath, "utf-8");
    let parsedUsers = JSON.parse(users);
    let validRoles = ["admin", "standard"];

    if (!validRoles.includes(queryData?.role)) {
        throw new Error("Invalid role.");
    };

    if (queryData?.role && validRoles.includes(queryData.role)) {
        let filteredUsers = parsedUsers.filter((user) => user.role === queryData.role);
        return filteredUsers;
    }

    return parsedUsers;
};

export const registerUser = (userData) => {
    const users = getUsers();

    const newUserId = uuidv4();

    const newUser = {
        id: newUserId,
        ...userData
    };

    users.push(newUser);
    writeToFile(users);
    return newUser;
};

export const loginUser = (loginData) => {
    const users = getUsers();

    const foundUser = users.find((user) => user.email === loginData.email && user.password === loginData.password);

    if (!foundUser) {
        throw new Error("Invalid credentials.")
    }

    // if (foundUser) {
    //     loggerEmitter.emit("log", "Login", "Success");
    // };

    return foundUser;
};

export const editUser = (userId, userData) => {
    const users = getUsers();

    const foundUserIndex = users.findIndex((user) => user.id === userId);

    if (foundUserIndex < 0) {
        throw new Error("User not found.");
    };

    const editedUser = {
        ...users[foundUserIndex],
        ...userData
    };

    users[foundUserIndex] = editedUser;
    writeToFile(users);
    return editedUser;
};

export const deleteUser = (userId) => {
    const users = getUsers();

    const filteredUsers = users.filter((user) => user.id !== userId);

    if (users.length === filteredUsers.length) {
        throw new Error("User not found.")
    };

    writeToFile(filteredUsers);
};