import {MessageType} from "./messageType"
import {TransferChannel} from "./transferChannel"
import {MessageContainer} from "./messageContainer"

/**
 * A handler array is a list of
 * registered callbacks for a set of net messages
 */
export class MessageHandlerArray
{
    /**
     * An array (indexed by messagetype) of array of callbacks
     */
    private subscribers:Array< Array<(chl:TransferChannel, msg: MessageContainer) => void>>

    constructor()
    {
        this.subscribers = []
    }

    /**
     * Subscribe to an incoming net message
     * @param func
     */
    subscribe(type: MessageType, func: (chl:TransferChannel,msg: MessageContainer) => void) : void
    {
        // add the new callback to the subscribers array

        // create the array if it hasnt existed yet
        if(typeof this.subscribers[type] === 'undefined') this.subscribers[type] = [];

        this.subscribers[type].push(func);
    }

    /**
     * Push a message to the subscribers by calling their callbacks if they registered for the message type
     * @param message
     */
    dispatchMessage(chl:TransferChannel, message:MessageContainer)
    {
        // check if there any subscribers for this message
        if(!(message.getType() in this.subscribers)) return;

        // for each subscriber who want to get this type of message
        for(let subscriber of this.subscribers[message.getType()])
        {
            // we pass the MessageContainer to the subscriber callback
            // they are expected to cast it to their own type
            subscriber(chl, message);
        }
    }

}
