import {log as logCL } from '../client/log'
import {log as logSV } from '../server/log'
import { IS_CLIENT, IS_SERVER } from './shared'

export function log(...args : any[]) {
  if (IS_CLIENT()) {
    return logCL(...args)
  }
  else if (IS_SERVER()) {
    // in the future, importing logSV (on client build)
    // may have some dependencies like file i/o the browser cannot import
    // we therefore must find a different solution soon
    // probably this: https://blog.mariusschulz.com/2018/01/14/typescript-2-4-dynamic-import-expressions
    // requires esnext tho
    // we import only if we're 100% sure we're in the server

    return logSV(...args)
  }

  // fallback if someone did something stupid
  return console.log(...args)
}
