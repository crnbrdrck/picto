import {MessageContainer} from "./../messageContainer"
import {MessageType} from "./../messageType"


export class ConnectMessage extends MessageContainer
{
    private nickname: string

    constructor()
    {
        super(MessageType.Connect)
    }

    static create(nickname: string)
    {
        let msg = new ConnectMessage()
        msg.nickname = nickname
        return msg;
    }

    getNickname() : string
    {
        return this.nickname;
    }
}
