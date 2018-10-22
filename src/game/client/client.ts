import { IEntryPoint } from 'game/shared/entryPoint'
import { log } from './log'

import { VueApp } from '../../web/vueApp'
import { NetClient } from './net/netClient'

class Client implements IEntryPoint {
  private vueApp: VueApp
  private netClient: NetClient

  public run(argv: string[]): void {
    log('[picto] Client started')
    
    this.vueApp = new VueApp()
    this.netClient = new NetClient(argv[0])
  }
}

const gameClient = new Client()

gameClient.run(['ws://localhost:8080'])
