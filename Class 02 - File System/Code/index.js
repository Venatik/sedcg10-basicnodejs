import { greetUser, password } from "./greetService.js";
import { fileSystem, path, projectPathAbsolute, projectPathUrl, projectPath } from "./textService.js";

// let greetUser = require("./greetService.js");

console.log("App started...\n");

greetUser("Bobo");
console.log(`The password is: ${password}`);
console.log("Absolute Path:", projectPathAbsolute);
console.log("URL to Project Path:", projectPathUrl);
console.log("Project Path:", projectPath);