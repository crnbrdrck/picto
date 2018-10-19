
import {TransferChannel} from "../../shared/net/TransferChannel"
import { MessageHandlerArray } from "../../shared/net/MessageHandlerArray";
import { MessageType } from "../../shared/net/MessageType";
import { MessageContainer } from "../../shared/net/MessageContainer";
import { AnnounceMessage } from "../../shared/net/messages/AnnounceMessage";

export class NetClient
{
    private chl:TransferChannel
    
    private handlers : MessageHandlerArray;

    /**
     * Connect to a remote server
     * @param remote_addr 
     */
    constructor(remote_addr:string)
    {
        this.chl = TransferChannel.fromRemoteAddr(remote_addr);

        // Our message handlers, all message logic will go through this
        this.handlers = new MessageHandlerArray()

        // tell the channel to use these handlers
        this.chl.setCallbackArray(this.handlers) 

        // add message handlers
        this.logic()
    }

    isConnected() : boolean
    {
        return this.chl.isConnected();
    }

    logic()
    {
        // when we receive an announcement
        this.handlers.subscribe(MessageType.Announcement,
            function(chl:TransferChannel, msg:MessageContainer)
            {
                let msg_casted : AnnounceMessage = <AnnounceMessage>msg;

                // print it to console
                console.log("We got an announcement: " + msg_casted.getAnnounceText())
            }
        )
    }

    
}
