
import { log } from '../game/server/log'

import * as express from 'express'

export class WebServer{
  private app : express.Application

  constructor(port : number) {
    this.app = express()

    this.app.use(express.static('static'))

    this.app.listen(port, () => {
      log('[webServer] listening on', port)
    })
  }
}