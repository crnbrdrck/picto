import {IS_CLIENT, IS_SERVER} from "./shared"
import {Log as LogCL} from "../client/log"
import {Log as LogSV} from "../server/log"

export function Log(...args: any[])
{
    if(IS_CLIENT())
    {
        return LogCL(...args);
    }

    if(IS_SERVER())
    {
        // in the future, importing LogSV (on client build)
        // may have some dependencies like file i/o the browser cannot import
        // we therefore must find a different solution soon
        // probably this: https://blog.mariusschulz.com/2018/01/14/typescript-2-4-dynamic-import-expressions
        // requires esnext tho
        // we import only if we're 100% sure we're in the server

        return LogSV(...args);
    }

    // fallback if someone did something stupid
    return console.log(...args);
}
