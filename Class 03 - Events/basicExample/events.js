import { EventEmitter } from "node:events";

const emitter = new EventEmitter();

class MyEmitter extends EventEmitter { }; // Custom class that still uses all the functionalities of EventEmitter

export const myEmitter = new MyEmitter(); // new instance of MyEmitter

// If we don't export the instanced object directly, it will work only within this file
// emitter.on("order-sandwich", function () {
//     console.log("Making sandwich in progress...");
// });

myEmitter.on("order-sandwich", () => {
    console.log("Making sandwich in progress...");
});

