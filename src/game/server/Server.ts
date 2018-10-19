import {IEntryPoint} from "../shared/IEntryPoint"
import {Log} from './Log'
import {NetServer} from "./net/NetServer"

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
