import EventEmitter from 'events';
import { appendText } from './fileService.js';

class LoggerEmitter extends EventEmitter { };
const loggerEmitter = new LoggerEmitter(); // create object from the loggerEmitter class

loggerEmitter.on("log", (message) => {
    const currentDateAndTime = new Date().toLocaleString();
    appendText("logs.txt", `-----${currentDateAndTime} - ${message}-----\n`)
});

export default loggerEmitter;