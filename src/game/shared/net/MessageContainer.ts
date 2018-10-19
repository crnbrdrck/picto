
import {MessageType} from "./MessageType"

/**
 * A message that can be passed between client and server
 * See message implementations for the actual messages
 * 
 * Do not create instances of this class. 
 */
export class MessageContainer
{
    /**
     * When the message is serialized and recieved by the client,
     * the type is used to figure out which callbacks to fire
     * aka callbacks registered to the Connect message type for example
     */
    private _message_type: MessageType;

    /**
     * 
     * @param type Type of your message
     */
    constructor(type: MessageType)
    {
        this._message_type = type;
    }

    getType() : MessageType
    {
        return this._message_type;
    }

    /**
     * Create a message from JSON you may have recieved over the net
     * @param json 
     * @throws TypeError When malformed JSON is sent that is not a serialized net-message
     */
    static fromJSON(json : string) : MessageContainer
    {
        let deserialized:any = JSON.parse(json);

        if(!("_message_type" in deserialized))
        {
            throw new TypeError("We recieved malformed JSON, it did not contain a networked message!")
        }

        // set to any to let us assign raw values
        let new_container:any = new MessageContainer(MessageType.Null)
        
        // copy each variable over,
        // TODO: check if this does deep copies
        for (var prop in deserialized) 
        {
            new_container[prop] = deserialized[prop]
        }
        
        // TODO: Obviously this brings up some flaws,
        // like not checking if required vars were sent (or just some random JSON)
        // in the future we should write some sanity checking for this, besides the message_type check above

        return <MessageContainer>new_container;
    }

    toJSON() : string
    {
        return JSON.stringify(this);
    }
}
