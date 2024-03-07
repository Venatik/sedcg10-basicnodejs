// import http from "node:http";
// import { v4 as uuidv4 } from 'uuid';
// import loggerEmitter from "./loggerService.js";
// import { appendText, readData, writeData } from './fileService.js';

// const host = "http://localhost";
// const port = 3000;

// const server = http.createServer((request, response) => {
//     const url = request.url;
//     const method = request.method;

//     // CORS

//     response.setHeader("Access-Control-Allow-Origin", "*");
//     response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
//     response.setHeader("Access-Control-Max-Age", 2592000);

//     if (!url.startsWith("/notes")) {
//         response.statusCode = 400;
//         response.end("Bad request: Invalid route.");
//         return;
//     }

//     if (method === "GET") {
//         const notes = readData("db.json");
//         console.log(notes);

//         response.setHeader("Content-Type", "text/json");
//         response.write(notes);
//         response.end();
//         loggerEmitter.emit("log", "The user requested all notes.");
//         return;
//     }

//     if (method === "POST") {
//         let body = [];
//         request.on("data", (chunk) => {
//             body.push(chunk);
//         });

//         request.on("end", () => {
//             const stringifiedBody = Buffer.concat(body).toString();
//             const parsedBody = JSON.parse(stringifiedBody);

//             const note = {
//                 ...parsedBody,
//                 id: uuidv4()
//             }

//             loggerEmitter.emit("log", `The user created a new note with title ${note.title}.`);

//             const dbData = readData("db.json");
//             const notes = JSON.parse(dbData);
//             notes.push(note);
//             const stringifiedNotes = JSON.stringify(notes, null);
//             writeData("db.json", stringifiedNotes);
//         });

//         response.setHeader("Content-Type", "text/html");
//         response.write(`<h1>Note created successfully!</h1>`);
//         response.end();
//         return;
//     }

//     if (method === "PUT") {
//         const urlArray = url.split("/"); //localhost:3000/id
//         const noteId = urlArray[urlArray.length - 1];

//         let body = [];
//         request.on("data", (chunk) => {
//             body.push(chunk);
//         });

//         request.on("end", () => {
//             const stringifiedBody = Buffer.concat(body).toString();
//             const parsedBody = JSON.parse(stringifiedBody);

//             const dbData = readData("db.json");
//             const notes = JSON.parse(dbData);

//             const index = notes.findIndex((note) => note.id == noteId);
//             notes[index] = {
//                 ...parsedBody,
//                 noteId,
//             };

//             loggerEmitter.emit("log", `The user updated the note with id ${noteId}.`);

//             const stringifiedNotes = JSON.stringify(notes, null);
//             writeData("db.json", stringifiedNotes);

//             response.setHeader("Content-Type", "text/json");
//             response.write(`<h1>Note updated!</h1>`);
//             response.end();
//         });
//     }

//     if (method === "DELETE") {
//         const urlArray = url.split("/"); //localhost:3000/id
//         const noteId = urlArray[urlArray.length - 1];

//         const dbData = readData("db.json");
//         const allNotes = JSON.parse(dbData);

//         const notes = allNotes.filter((note) => note.id != noteId);
//         const stringifiedNotes = JSON.stringify(notes, null);
//         writeData("db.json", stringifiedNotes);

//         loggerEmitter.emit("log", `The user deleted the note with id ${noteId}.`);

//         response.setHeader("Content-Type", "text/json");
//         response.write(`<h1>Note deleted!</h1>`);
//         response.end();
//     }

// });

// server.listen(port, () => {
//     console.log(`The server is up and running on port ${port}.`);
// });

import http from "node:http";
import { v4 as uuidv4 } from "uuid";
import loggerEmitter from "./loggerService.js";
import { writeData, readData } from "./fileService.js";

const host = "http://localhost";
const port = 3002;

const server = http.createServer((request, response) => {
    const url = request.url;
    const method = request.method;

    // CORS
    /* 
      By default, you're not allowed to make requests from different origins.
      An origin is an object made up of the HOST + PORT
      So by default, if you try to send a request from origin http://localhost:5500
      to http://localhost:3000 you need to tell the response that it's allowed to 
      respond to that origin.
      */

    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, PUT, PATCH, OPTIONS"
    );
    response.setHeader("Access-Control-Max-Age", 2592000);

    if (!url.startsWith("/notes")) {
        response.statusCode = 400;
        response.end("Bad request: Invalid route");
        return;
    }

    if (method === "GET") {
        const notes = readData("db.json");
        console.log(notes);

        response.setHeader("Content-Type", "text/json");
        response.write(notes);
        response.end();
        loggerEmitter.emit("log", "The user requested all notes");
        return;
    }

    // ---------------------------------------------------------------------------
    if (method === "POST") {
        response.setHeader("Content-Type", "text/json");
        // this should contain all the data that is being sent in the request, after all the chunks arrive successfully
        let body = [];
        request.on("data", (chunk) => {
            body.push(chunk);
        });

        request.on("end", () => {
            const stringifiedBody = Buffer.concat(body).toString();
            const parsedBody = JSON.parse(stringifiedBody);

            const note = {
                ...parsedBody,
                id: uuidv4(),
            };

            loggerEmitter.emit(
                "log",
                `The user created a new note with title: ${note.title}`
            );

            const dbData = readData("db.json");
            const notes = JSON.parse(dbData);
            notes.push(note);
            const stringifiedNotes = JSON.stringify(notes, null, 2);
            writeData("db.json", stringifiedNotes);

            response.write("Note added");
            response.end();
        });
    }

    // ---------------------------------------------------------------------------
    if (method === "PUT") {
        response.setHeader("Content-Type", "text/json");
        const urlArray = url.split("/");
        const id = urlArray[urlArray.length - 1];

        let body = [];
        request.on("data", (chunk) => {
            body.push(chunk);
        });

        request.on("end", () => {
            const stringifiedBody = Buffer.concat(body).toString();
            const parsedBody = JSON.parse(stringifiedBody);

            const dbData = readData("db.json");
            const notes = JSON.parse(dbData);
            const index = notes.findIndex((note) => note.id === id);
            notes[index] = {
                ...parsedBody,
                id,
            };

            loggerEmitter.emit(
                "log",
                `The user updated note with title: ${notes[index].title}`
            );

            const stringifiedNotes = JSON.stringify(notes, null, 2);
            writeData("db.json", stringifiedNotes);
        });

        response.write("Note updated");
        response.end();
    }

    // ---------------------------------------------------------------------------
    if (method === "DELETE") {
        response.setHeader("Content-Type", "text/json");
        const urlArray = url.split("/");
        const id = urlArray[urlArray.length - 1];

        const dbData = readData("db.json");
        const allNotes = JSON.parse(dbData);

        const notes = allNotes.filter((note) => note.id != id);

        const stringifiedNotes = JSON.stringify(notes);
        writeData("db.json", stringifiedNotes);

        loggerEmitter.emit("log", `The user deleted the note with id ${id}`);

        response.write("Note deleted");
        response.end();
    }
});

server.listen(port, () => {
    console.log(`Srever listening on port ${port}`);
});

