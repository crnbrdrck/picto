
import {IEntryPoint} from "game/shared/IEntryPoint"
import {Log} from './Log'

import {NetClient} from "./net/NetClient"

class Client implements IEntryPoint {
  private net : NetClient

  public run(argv: string[]) : void {
    Log("[picto] Client started")
    this.net = new NetClient(argv[0])
  }
}

const gameClient = new Client()

gameClient.run([
  "ws://localhost:8080",
]);
