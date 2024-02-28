import fileSystem from "fs";
import { url } from "inspector";
import path from "path";
import { fileURLToPath } from "url"; // this is a built-in module in Node.js that provides utilities for URL resolution and parsing

export { fileSystem, path, projectPathAbsolute, projectPathUrl, projectPath };

// ======== Path - the node path module provides utilities for working with file and directory paths ========

// Using absolute path
const projectPathAbsolute = `E:\\SEDC G7\\repos\\sedcg10-basicnodejs\\Class 02 - File System>`;

// Using relative path
const projectPathUrl = import.meta.url; // this provides the path to the current file

const projectPath = path.dirname(fileURLToPath(projectPathUrl));
// console.log("URL to Project Path:", projectPathUrl);
// console.log("Project Path:", projectPath);

const directoryName = path.basename(projectPath); // get the name of the parent folder
console.log("Directory Name:", directoryName);

// ======== FileSystem - provides utilities for working with the file system ========

// Display all files inside a directory
let files = fileSystem.readdirSync("./"); // current directory
let filesFromAbsolute = fileSystem.readdirSync("E:\\SEDC G7\\repos\\sedcg10-basicnodejs\\Class 02 - File System"); // absolute path
console.log("Files in the current directory:", files);
console.log("Files from absolute path:", filesFromAbsolute);

// ======== File Manipulation ========
const fileName = "example.txt";
const text = "Hello, this text will be written to the file specified in the fileName once the code is executed.\n";
const newText = "This is the new text that will replace the old one.";

// If we use newText, the previous text will be replaced with the new one
fileSystem.writeFile(fileName, text, function (err) {
    if (err) {
        console.log("Error while creating file", err);
        return; // end the function if an error occurs
    }
    console.log("File created successfully."); // This line is optional
}); // create a file with the specified name and write the specified text to it

// fileSystem.writeFileSync(fileName, newText); // create a file with the specified name and write the specified text to it synchronously

const appendText = "This text will be appended to the file specified in the fileName once the code is executed.\n";
fileSystem.appendFile(fileName, appendText, function (err) {
    if (err) {
        console.log("Error while appending to file", err);
        return;
    }
    console.log("File updated successfully.");
}); // append the specified text to the file with the specified name

// fileSystem.appendFileSync(fileName, appendText); // append the specified text to the file with the specified name synchronously

fileSystem.readFile(fileName, "utf8", function (err, data) {
    if (err) {
        console.log("Error while reading file", err);
        return;
    }
    console.log("File content:", data);
}); // read the content of the file with the specified name

// fileSystem.readFileSync(fileName, "utf8"); // read the content of the file with the specified name synchronously

// ======== Creating a directory ========
/* fileSystem.mkdir("./TestFolder", 700, (err) => { // Can also use an absolute path
    if (err) {
        console.log("Error while creating directory", err);
    } else
        console.log("Directory created successfully.");
}); */ // create a directory with the specified name

