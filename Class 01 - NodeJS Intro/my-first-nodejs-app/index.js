let colors = require("colors");

// global.console.log("This console.log comes from the index.js file"); // Same as console.log but with global. prefix

console.log("This console.log comes from the index.js file");

// console.log(window); // error: window is not defined

// console.log(global);

// console.log(process); // process is a global object
console.log(process.version); // nodeJS version
console.log(process.platform); // OS platform
console.log(process.cwd()); // current working directory

// process.stdout.write("What is your name?\n");

// process.stdin.on("data", (input) => {
//     const userInput = input.toString().trim();
//     console.log(`Hello, ${userInput}!`);
//     process.exit();
// });

console.log("START"); // first
setTimeout(() => {
    console.log("This message is inside setTimeout. It is printed after 1 second.".blue); // third
}, 0);
console.log("END"); // second

console.log("Hello, I'm GREEN and BOLD".green);