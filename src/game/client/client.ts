import { IEntryPoint } from 'game/shared/entryPoint'
import { log } from './log'
import { Canvas } from './canvas'
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

// Create a canvas (this will probably need to be given to the client to handle sending data)
const canvas = new Canvas('picto-canvas')

// Create a client to run the game with
const gameClient = new Client()
gameClient.run(['ws://localhost:8080'])
