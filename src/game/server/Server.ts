import {IEntryPoint} from "../shared/entryPoint"
import {Log} from './log'
import {NetServer} from "./net/netServer"

class Server implements IEntryPoint {
  private net : NetServer

  public run(argv: string[]) : void {
    Log("[picto] Server started")
    // use parseInt for now
    this.net = new NetServer(parseInt(argv[1], 10))
  }
}

const gameServer = new Server()

gameServer.run([
  "-p",
  "8080",
]);
