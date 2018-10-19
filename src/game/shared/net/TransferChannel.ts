
const WebSocket = require("isomorphic-ws")

import {MessageType} from "./MessageType"
import {MessageContainer} from "./MessageContainer"
import {MessageHandlerArray} from "./MessageHandlerArray"

import {BuildMessageFromJSON, BuildJSONFromMessage } from "./MessageFactories"

import {Log} from "../../shared/Log"

/**
 * A websocket transfer channel wraps a websocket
 * Allows you to subscribe handlers to be called when a message is recieved
 * These handler are then allowed to send back responses
 */
export class TransferChannel
{
    constructor(){ }

    /**
     * Our WebSocket
     */
    private ws:WebSocket;

    /**
     * An array of indexed by MessageEnum
     * An array of callbacks ("subscribers") which take this class as arg and the data recieved
     */
    private subscribers:MessageHandlerArray

    /**
     * Subscribe to an incoming net message
     * @param func 
     */
    subscribe(type: MessageType, func: (chl:TransferChannel,msg: MessageContainer) => void) : void
    {
        this.subscribers.subscribe(type,func);
    }
 
    /**
     * Set the callbacks/subscribers of a TransferChannel
     * Use this if you want to set the same callbacks on many TransferChannels (i.e clients)
     * @param arr SubscriberArray
     */
    setCallbackArray(arr:MessageHandlerArray)
    {
        this.subscribers = arr;
    }

    /**
     * Create the transfer channel by connecting to a remote server
     * @param remote_addr The websocket connection string of the server 
     */
    static fromRemoteAddr(remote_addr: string) : TransferChannel
    {
        let ret: TransferChannel = new TransferChannel();
        ret.ws = new WebSocket(remote_addr)

        // add webso
        ret.addWSEventHandlers();
        return ret;
    }

    /**
     * Create the transfer channel from an existing websocket
     * Use this when a client connects to you (if you're on the server)
     * @param ws 
     */
    static fromWebSocket(ws : WebSocket) : TransferChannel
    {
        let ret: TransferChannel = new TransferChannel();
        ret.ws = ws;
        ret.addWSEventHandlers();
        return ret;
    }

    /**
     * Returns true if the channel is open
     */
    isConnected() : boolean
    {
        // use websocket open state
        return (this.ws.readyState == WebSocket.OPEN);
    }

    /**
     * Send a message down the channel (if we are connected)
     * @param str 
     */
    sendMessage(msg: MessageContainer) : void
    {
        if(!this.isConnected()){ return }

        this.ws.send(BuildJSONFromMessage(msg));
    }

    /**
     * Sets up WS event handling
     */
    private addWSEventHandlers()
    {
        var self = this
        this.ws.addEventListener("message", (ev: MessageEvent) => 
        {
            // call onRecieve when we recieve strings
            // onRecieveData calls callbacks that have been registered
            self.onReceiveData(ev.data);
        });
    }

    /**
     * Called when we recieve data down the channel
     * This calls all the functions subscribed to the channel
     */
    private onReceiveData(str:string) : void
    {
        // assume every string we are sent is a serialized message
        let self = this

        BuildMessageFromJSON(str).then(
            (message_container: MessageContainer) =>
            {
                self.subscribers.dispatchMessage(self,message_container)
            }
        )
        .catch(
            (err) =>
            {
                Log(err.message);
            }
        )
    
    }

}
