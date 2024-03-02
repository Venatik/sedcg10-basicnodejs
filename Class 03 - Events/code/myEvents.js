import { EventEmitter } from "node:events";
import EventTypes from "./eventTypes.js";

class MyEmitter extends EventEmitter { };
const emitter = new MyEmitter();

emitter.on(EventTypes.info, () => {
    console.log("INFO event triggered.");
});

emitter.on(EventTypes.warning, () => {
    console.log("WARNING event triggered.");
});

emitter.on(EventTypes.error, () => {
    console.log("ERROR event triggered.");
});

export default emitter;