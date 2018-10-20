import { MessageType } from './messageType'

/**
 * A message that can be passed between client and server
 * See message implementations for the actual messages
 *
 * Do not create instances of this class.
 */
export class MessageContainer {
  /**
   * When the message is serialized and recieved by the client,
   * the type is used to figure out which callbacks to fire
   * aka callbacks registered to the Connect message type for example
   */
  private messageType : MessageType

  /**
   * Call in your inherited class
   * @param type Type of your message
   */
  constructor(type : MessageType) {
    this.messageType = type
  }

  public getType() : MessageType {
    return this.messageType
  }
}
