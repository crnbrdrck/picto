import { MessageContainer } from './../messageContainer'
import { MessageType } from './../messageType'

export class ConnectMessage extends MessageContainer{

  public static create(nickname : string) {
    const msg = new ConnectMessage()
    msg.nickname = nickname
    return msg
  }

  private nickname : string

  constructor() {
    super(MessageType.Connect)
  }

  public getNickname() : string {
    return this.nickname
  }
}
