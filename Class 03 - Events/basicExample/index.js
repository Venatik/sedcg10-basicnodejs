import { EventEmitter } from "node:events";
import { myEmitter } from "./events.js";

// Go over sedcg7 - Class 12 - Classes

const emitter = new EventEmitter(); // creates a new instance of the EventEmitter class

// ========= REGISTER THE EVENT - ONLY ONCE =========
emitter.on("order-pizza", function (size, toppings = "cheese") {
    console.log(`Making ${size} pizza with ${toppings} in progress...`);
});

// ========= FIRE THE EVENT - AS MANY TIMES AS YOU WANT =========
emitter.emit("order-pizza", "small", "mushrooms"); // first argument is ALWAYS the event name, the rest of the arguments are the data that you want to pass to the event
emitter.emit("order-pizza", "large", "pepperoni");

// emitter.emit("order-sandwich"); // Won't work because we didn't register the event

myEmitter.emit("order-sandwich"); // Will work because we registered the event in the events.js file