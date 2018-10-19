import { MessageContainer } from "./messageContainer"
import { ConnectMessage }   from "./messages/connectMessage";
import { AnnounceMessage }  from "./messages/announceMessage"
import { MessageType }      from "./messageType"

var MessageFactories : Array<(...args: any[]) => any> = []
MessageFactories[MessageType.Connect]       = () : ConnectMessage  => { return new ConnectMessage()  }
MessageFactories[MessageType.Announcement]  = () : AnnounceMessage => { return new AnnounceMessage() }

/**
 * Returns a factory func for the specified type
 * @param type
 */
function getMessageFactory(type: MessageType) : Promise<(...args: any[]) => any>
{
    return new Promise((resolve,reject) : void =>
    {
        if(type in MessageFactories)
        {
            resolve(MessageFactories[type]);
        }

        reject("Unsupported message, "+type+" did you forget to add a Message Factory in MessageFactories.ts?")
    })
}

/**
 * Builds a message from JSON, checks the type and finds it's factory
 * @param json
 * @throws TypeError When malformed JSON is sent that is not a serialized net-message
 */
export function BuildMessageFromJSON(json : string) : Promise<MessageContainer>
{
    return new Promise((resolve,reject) => {
        let deserialized:any = JSON.parse(json);

        // see MessageContainer.ts @ 18
        if(!("_message_type" in deserialized))
        {
            reject("We recieved malformed JSON, it did not contain a networked message!")
        }

        // in order to receive the correct function prototypes
        // we need to construct an object of the same type as it was before it was turned into JSON
        // hence each MessageType needs a factory
        getMessageFactory(deserialized._message_type).then(
            (factory) =>
            {
                let new_container = factory()

                // copy each variable over
                // TODO: consider deep copies
                for (var prop in deserialized)
                {
                    new_container[prop] = deserialized[prop]
                }

                resolve(new_container)
            })
        .catch(
            (err) =>
            {
                reject(err)
            }
        )
    })
}


/**
 * Serialize container to JSON
 */
export function BuildJSONFromMessage(msg : MessageContainer)
{
    let ret = JSON.stringify(msg)
    console.log(ret)
    return ret
}
