import { MessageContainer } from './../messageContainer'
import { MessageType } from './../messageType'

/**
 * An accouncement sent from server to client
 */
export class AnnounceMessage extends MessageContainer {

  public static create(announcementText : string) {
    const msg = new AnnounceMessage()
    msg.announcementText = announcementText
    return msg
  }
  private announcementText : string

  constructor() {
    super(MessageType.Announcement)
  }

  public getAnnounceText() : string {
    return this.announcementText
  }
}
