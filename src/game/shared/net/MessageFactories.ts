import { MessageContainer } from './messageContainer'
import { AnnounceMessage } from './messages/announceMessage'
import { ConnectMessage } from './messages/connectMessage'
import { MessageType } from './messageType'

const MessageFactories : Array<(...args : any[]) => any> = []
MessageFactories[MessageType.Connect]       = () : ConnectMessage  => new ConnectMessage()
MessageFactories[MessageType.Announcement]  = () : AnnounceMessage => new AnnounceMessage()

/**
 * Returns a factory func for the specified type
 * @param type
 */
function getMessageFactory(type : MessageType) : Promise<(...args : any[]) => any> {
  return new Promise((resolve, reject) : void => {
    if (type in MessageFactories) {
      resolve(MessageFactories[type])
    }

    reject(`Unsupported message (${type}). Did you forget to add a MessageFactory in messageFactories.ts?`)
  })
}

/**
 * Builds a message from JSON, checks the type and finds it's factory
 * @param json
 * @throws TypeError When malformed JSON is sent that is not a serialized net-message
 */
export function BuildMessageFromJSON(json : string) : Promise<MessageContainer> {
  return new Promise((resolve, reject) => {
    const deserialized : any = JSON.parse(json)

    // see MessageContainer.ts @ 18
    if (!('messageType' in deserialized)) {
      reject('We recieved malformed JSON, it did not contain a networked message!')
    }

    // in order to receive the correct function prototypes
    // we need to construct an object of the same type as it was before it was turned into JSON
    // hence each MessageType needs a factory
    getMessageFactory(deserialized.messageType).then((factory) => {
      const newContainer = factory()

      // copy each variable over
      // TODO: consider deep copies
      for (const prop in deserialized) {
        if (deserialized.hasOwnProperty(prop)) {
          newContainer[prop] = deserialized[prop]
        }
      }

      resolve(newContainer)
    }).catch(
      (err) => {
        reject(err)
    })
  })
}

/**
 * Serialize container to JSON
 */
export function BuildJSONFromMessage(msg : MessageContainer) {
  const ret = JSON.stringify(msg)
  console.log(ret)
  return ret
}
