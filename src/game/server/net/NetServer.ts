import { Server, WebSocket } from 'isomorphic-ws'
import { MessageContainer } from '../../shared/net/messageContainer'
import { MessageHandlerArray } from '../../shared/net/messageHandlerArray'
import { AnnounceMessage } from '../../shared/net/messages/announceMessage'
import { ConnectMessage } from '../../shared/net/messages/connectMessage'
import { MessageType } from '../../shared/net/messageType'
import { TransferChannel } from '../../shared/net/transferChannel'
import { log } from '../log'

export class NetServer {
  private connections : TransferChannel[]
  private handlers : MessageHandlerArray
  private wss : Server

  constructor(port : number) {
    this.wss = new Server({ port })

    this.connections = []

    // avoid scope issues
    const self = this
    this.wss.on('connection', (ws : WebSocket) => { self.onConnection(ws) })

    // Our message handlers, all message logic will go through this
    this.handlers = new MessageHandlerArray()

    // add message handlers
    this.logic()
  }

  /**
   * Called by ws server, when a new connection is made, we create a TransferChannel
   * set up our handlers and push them into the list of connections
   * @param ws
   */
  private onConnection(ws : WebSocket) {
    const channel = TransferChannel.fromWebSocket(ws)

    // tell transfer channel to use our message handlers
    channel.setCallbackArray(this.handlers)

    // send them an announcement <3
    channel.sendMessage(AnnounceMessage.create('Welcome to Picto!'))

    // preserve connection
    this.connections.push(TransferChannel.fromWebSocket(ws))
  }

  private logic() {
    // purge closed connections
    setInterval(() => {
      for (const index in this.connections) {
        if (!this.connections[index].isConnected()) {
          this.connections.splice(parseInt(index, 1), 1)
        }
      }
    }, 2000)

    // When someone tries to connect
    // this.handlers.subscribe(MessageType.Connect,
    //     function(channel : TransferChannel, msg: MessageContainer)
    //     {
    //         let msg_casted : ConnectMessage = <ConnectMessage>msg

      //         log("New connect message, nickname: " + msg_casted.getNickname());

      //         let response : AnnounceMessage = AnnounceMessage.create("Go NetSoc!")
      //         channel.sendMessage(response)
      //     }
      // )
  }
}
