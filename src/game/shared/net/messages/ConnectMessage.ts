
import {MessageType} from "../MessageType"
import {MessageContainer} from "../MessageContainer"

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