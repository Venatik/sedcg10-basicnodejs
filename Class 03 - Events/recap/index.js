import path from 'path';
import { fileURLToPath } from 'url';

import {
    readNotes,
    readNoteById,
    createNote,
    deleteNote,
    updateNote
} from './notesService.js';

const filePath = '.\\data\\notes.json'; // must use escape character to escape the backslash

console.log(filePath);

const currentFileUrl = import.meta.url;
const currentFilePath = fileURLToPath(currentFileUrl);
const projectPath = path.dirname(fileURLToPath(currentFileUrl));

console.log(currentFileUrl); // URL to the current file
console.log(currentFilePath); // Absolute path to the current file
console.log("PROJECT PATH:", projectPath); // Absolute path to the project folder

const notesPath = path.join(projectPath, filePath);
// const notesPath = path.join(projectPath, "data", "notes.json");
console.log("PATH TO NOTES:", notesPath);

const noteToAdd = {
    title: "Coding Notes",
    content: "Learn nodejs and filesystem",
    timestamp: "2024-03-01T10:30:00Z"
};

// const note = await readNotes(notesPath);
// console.log(note);

// await createNote(notesPath, noteToAdd);

// const note = await readNotes(notesPath);
// console.log(note);

const noteToUpdate = {
    title: "Exercise Routine",
    content: "60 minutes of jogging, 40 minutes of strength training.",
    timestamp: "2024-03-02T18:00:00Z"
}

// await updateNote(notesPath, 4, noteToUpdate);


// await deleteNote(notesPath, 7);

// const note = await readNotes(notesPath);
// console.log(note);