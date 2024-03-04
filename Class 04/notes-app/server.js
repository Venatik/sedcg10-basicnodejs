import http from "node:http";
import { v4 as uuidv4 } from 'uuid';
import loggerEmitter from "./loggerService.js";
import { appendText, readData, writeData } from './fileService.js';

const host = "http://localhost";
const port = 3000;

const server = http.createServer((request, response) => {
    const url = request.url;
    const method = request.method;

    // CORS

    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    response.setHeader("Access-Control-Max-Age", 2592000);

    if (!url.startsWith("/notes")) {
        response.statusCode = 400;
        response.end("Bad request: Invalid route.");
        return;
    }

    if (method === "GET") {
        const notes = readData("db.json");
        console.log(notes);

        response.setHeader("Content-Type", "text/json");
        response.write(notes);
        response.end();
        loggerEmitter.emit("log", "The user requested all notes.");
        return;
    }

    if (method === "POST") {
        let body = [];
        request.on("data", (chunk) => {
            body.push(chunk);
        });

        request.on("end", () => {
            const stringifiedBody = Buffer.concat(body).toString();
            const parsedBody = JSON.parse(stringifiedBody);

            const note = {
                ...parsedBody,
                id: uuidv4()
            }

            loggerEmitter.emit("log", `The user created a new note with title ${note.title}.`);

            const dbData = readData("db.json");
            const notes = JSON.parse(dbData);
            notes.push(note);
            const stringifiedNotes = JSON.stringify(note, null);
            writeData("db.json", stringifiedNotes);
        });

        response.setHeader("Content-Type", "text/html");
        response.write(`<h1>Note created successfully!</h1>`);
        response.end();
        return;
    }
});

server.listen(port, () => {
    console.log(`The server is up and running on port ${port}.`);
});