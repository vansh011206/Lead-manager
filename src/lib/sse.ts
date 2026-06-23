import { EventEmitter } from "events";

const globalForEmitter = global as unknown as { emitter: EventEmitter };

export const sseEmitter =
  globalForEmitter.emitter || new EventEmitter();

if (process.env.NODE_ENV !== "production") globalForEmitter.emitter = sseEmitter;
