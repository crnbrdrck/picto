import {MessageContainer} from "./../messageContainer"
import {MessageType} from "./../messageType"

/**
 * An accouncement sent from server to client
 */
export class AnnounceMessage extends MessageContainer
{
    private announcement_text: string

    constructor()
    {
        super(MessageType.Announcement)
    }

    static create(announcement_text: string)
    {
        let msg = new AnnounceMessage()
        msg.announcement_text = announcement_text
        return msg;
    }

    getAnnounceText() : string
    {
        return this.announcement_text;
    }
}
