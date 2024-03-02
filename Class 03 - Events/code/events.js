import { EventEmitter } from "node:events";

class MyEmitter extends EventEmitter { };

export const emitter = new MyEmitter();

// CREATE (REGISTER) AN EVENT ALONG WITH A HANDLER

emitter.on("greet", () => {
    console.log("Hello, how's life?");
});

// EMIT THE EVENT
emitter.emit("greet");

// EMITTING DATA TO SOME EVENT
emitter.on("data", data => {
    console.log(data);
});

// EMIT FRUITS
emitter.emit("data", ["Apple", "Banana", "Cherry", "Date"]);
// EMIT VEGETABLES
emitter.emit("data", ["Tomato", "Potato", "Cucumber"]);
emitter.emit("data", "Whatever");

// USING LISTENER FUNCTION
const listenerFunction = (from, message) => {
    console.log(`Received message from ${from}: ${message}`);
};

emitter.on("message", listenerFunction);

emitter.emit("message", "Obi-wan", "Hello there.");

// ONCE EMITTED EVENT
emitter.once("once-emitted-event", () => {
    console.log("This will be triggered only once.");
});

emitter.emit("once-emitted-event");
emitter.emit("once-emitted-event");

// REGISTER ASYNCHRNOUS EVENT
emitter.on("async-event", async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Async event triggered.");
});

emitter.emit("async-event");
console.log("Async event is being triggered.");

// REGISTER EVENT LISTENER FOR THE ERROR EVENT
emitter.on("error", error => {
    console.error("Error occurred: ", error);
});

// emitter.emit("error", new Error("Something went wrong."));

// ATTACHING MULTIPLE LISTENERS TO THE SAME EVENT
emitter.on("event", () => {
    console.log("This listener will be executed every time the event is emitted.");
});

emitter.on("event", () => {
    console.log("Another listener will be executed every time the event is emitted.");
});

emitter.once("event", () => {
    console.log("This listener will be executed only once.");
});

// prependOnceListener method will add the listener to the beginning of the listeners array for the event named event.
emitter.prependOnceListener("event", () => {
    console.log("This listener will be executed first.");
});

emitter.emit("event");
console.log("---------------------------------------------");
emitter.emit("event");

// NESTED EVENTS
emitter.on("outer-event", () => {
    console.log("OUTER event emitted.");
});

emitter.on("inner-event", () => {
    emitter.emit("outer-event");
});

emitter.emit("inner-event");

// emitter.removeAllListeners(); // if we want to unsubscribe from all events