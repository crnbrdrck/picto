import { IEntryPoint } from 'game/shared/entryPoint'
import { log } from './log'

import { NetClient } from './net/netClient'

class Client implements IEntryPoint {
  private net : NetClient

  public run(argv : string[]) : void {
    log('[picto] Client started')
    this.net = new NetClient(argv[0])
  }
}

const gameClient = new Client()

gameClient.run(['ws://localhost:8080'])
