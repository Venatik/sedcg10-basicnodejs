import emitter from "./myEvents.js";
import EventTypes from "./eventTypes.js";

// EMIT VALUES
emitter.emit(EventTypes.info);
emitter.emit(EventTypes.warning);
emitter.emit(EventTypes.error);