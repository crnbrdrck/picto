import 'isomorphic-ws'

import { log } from '../../shared/log'
import { MessageContainer } from './messageContainer'
import { BuildJSONFromMessage, BuildMessageFromJSON } from './messageFactories'
import { MessageHandlerArray } from './messageHandlerArray'
import { MessageType } from './messageType'


/**
 * A websocket transfer channel wraps a websocket
 * Allows you to subscribe handlers to be called when a message is recieved
 * These handler are then allowed to send back responses
 */
export class TransferChannel{

  /**
   * Create the transfer channel by connecting to a remote server
   * @param remoteAddr The websocket connection string of the server
   */
  public static fromRemoteAddr(remoteAddr : string) : TransferChannel {
    const ret : TransferChannel = new TransferChannel()
    ret.ws = new WebSocket(remoteAddr)

    // add webso
    ret.addWSEventHandlers()
    return ret
  }

  /**
   * Create the transfer channel from an existing websocket
   * Use this when a client connects to you (if you're on the server)
   * @param ws
   */
  public static fromWebSocket(ws : WebSocket) : TransferChannel {
    const ret : TransferChannel = new TransferChannel()
    ret.ws = ws
    ret.addWSEventHandlers()
    return ret
  }

  /**
   * An array of indexed by MessageEnum
   * An array of callbacks ("subscribers") which take this class as arg and the data recieved
   */
  private subscribers : MessageHandlerArray

  /**
   * Our WebSocket
   */
  private ws : WebSocket

  /**
   * Subscribe to an incoming net message
   * @param func
   */
  public subscribe(type : MessageType, func : (chl : TransferChannel, msg : MessageContainer) => void) : void {
    this.subscribers.subscribe(type, func)
  }

  /**
   * Set the callbacks/subscribers of a TransferChannel
   * Use this if you want to set the same callbacks on many TransferChannels (i.e clients)
   * @param arr SubscriberArray
   */
  public setCallbackArray(arr : MessageHandlerArray) {
    this.subscribers = arr
  }

  /**
   * Returns true if the channel is open
   */
  public isConnected() : boolean {
  // use websocket open state
    return (this.ws.readyState === this.ws.OPEN)
  }

  /**
   * Send a message down the channel (if we are connected)
   * @param str
   */
  public sendMessage(msg : MessageContainer) : void {
    if (!this.isConnected()) { return }

    this.ws.send(BuildJSONFromMessage(msg))
  }

  /**
   * Sets up WS event handling
   */
  private addWSEventHandlers() {
    const self = this
    this.ws.addEventListener('message', (ev : MessageEvent) => {
      // call onRecieve when we recieve strings
      // onRecieveData calls callbacks that have been registered
      self.onReceiveData(ev.data)
    })
  }

  /**
   * Called when we recieve data down the channel
   * This calls all the functions subscribed to the channel
   */
  private onReceiveData(str : string) : void {
    // assume every string we are sent is a serialized message
    const self = this

    BuildMessageFromJSON(str).then((messageContainer : MessageContainer) => {
      self.subscribers.dispatchMessage(self, messageContainer)
    }).catch((err) => {
      log(err.message)
    })
  }
}
