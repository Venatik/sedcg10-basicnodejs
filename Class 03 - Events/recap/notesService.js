import { promises as fsPromises } from 'fs';

const readNotes = async (filePath) => {
    const jsonData = await fsPromises.readFile(filePath, "utf8");
    const notes = JSON.parse(jsonData);
    return notes;
};

// read = parse (JS format), write = stringify (JSON format)

// writeNotes is not exported because it's a helper function
const writeNotes = async (filePath, notesToWrite) => {
    const notesJson = JSON.stringify(notesToWrite);
    fsPromises.writeFile(filePath, notesJson);
};

const readNoteById = async (filePath, noteId) => {
    const notes = await readNotes(filePath);
    const foundNote = notes.find(note => note.id === noteId);
    if (!foundNote) {
        console.log("Note not found!");
    };
    return foundNote;
};

const createNote = async (filePath, noteToCreate) => {
    const notes = await readNotes(filePath);
    const newNoteId = notes.length + 1;
    const noteToAdd = { id: newNoteId, ...noteToCreate };
    notes.push(noteToAdd);
    await writeNotes(filePath, notes);
};

const deleteNote = async (filePath, noteId) => {
    const notes = await readNotes(filePath);
    const noteToDelete = notes.find(note => note.id === noteId);
    if (!noteToDelete) {
        // throw new Error("Note not found!"); we don't need a return statement if we throw an error
        console.log("Note not found!");
        return;
    };
    const updatedNotes = notes.filter(note => note.id !== noteId);
    await writeNotes(filePath, updatedNotes);
};

const updateNote = async (filePath, noteId, updatedNote) => {
    const notes = await readNotes(filePath);
    const indexUpdate = notes.findIndex(note => note.id === noteId);
    if (indexUpdate === -1) { // if the note is not found the index will be -1
        console.log("Note not found!");
        return;
    };
    notes[indexUpdate] = { id: noteId, ...updatedNote };
    await writeNotes(filePath, notes);
};

export {
    readNotes,
    readNoteById,
    createNote,
    deleteNote,
    updateNote
};