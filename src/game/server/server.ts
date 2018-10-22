import { IEntryPoint } from '../shared/entryPoint'
import { log } from './log'
import { NetServer } from './net/netServer'

import { WebServer } from '../../webServer/webServer'

import * as dotenv from 'dotenv'

class Server implements IEntryPoint {
  private netServer: NetServer
  private webServer: WebServer

  public run(argv: string[]): void {
    const webserverPort: number = parseInt(process.env.PORT, 10) || 8080
    const websocketPort : number = parseInt(process.env.WS_PORT, 10) || 8081

    log('[picto] starting gameserver')

    this.webServer = new WebServer(webserverPort)
    this.netServer = new NetServer(websocketPort)
  }
}

dotenv.config()

const gameServer = new Server()
gameServer.run(process.argv)
