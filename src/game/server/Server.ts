
import {IEntryPoint} from "../shared/IEntryPoint"
import {Log} from './Log'

import {NetServer} from "./net/NetServer"

class Server implements IEntryPoint
{
    private net : NetServer

    constructor()
    {
        
    }

    run(argv: Array<string>) : void
    {
        Log("[picto] Server started")
        this.net = new NetServer(parseInt(argv[1])); // use parseInt for now
    }
}


let gameServer = new Server()

gameServer.run([
    "-p","8080"
]);
