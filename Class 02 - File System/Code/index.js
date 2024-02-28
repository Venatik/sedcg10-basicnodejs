import { greetUser, password } from "./greetService.js";
import { fileSystem, path, projectPathAbsolute, projectPathUrl, projectPath } from "./textService.js";
import { readUsersFromFile, addUser, fs } from "./usersService.js";

// let greetUser = require("./greetService.js");

console.log("App started...\n");

greetUser("Bobo");
console.log(`The password is: ${password}`);
console.log("Absolute Path:", projectPathAbsolute);
console.log("URL to Project Path:", projectPathUrl);
console.log("Project Path:", projectPath);

const userToAdd = {
    id: 25,
    name: "Bobo Bobski",
    username: "bobo123",
    email: "bobski@gmail.com"
}

addUser(userToAdd);

const fileName = "users.json";

// fileSystem.readFileSync(fileName, "utf8", function (err, data) {
//     if (err) {
//         console.log("Error while reading file", err);
//         return;
//     }
//     console.log("User file content:", JSON.parse(data));
// });

const users = readUsersFromFile();
console.log("Users:", users);