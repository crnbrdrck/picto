
import {TransferChannel} from "../../shared/net/TransferChannel"

export class NetClient
{
    private chl:TransferChannel

    /**
     * Connect to a remote server
     * @param remote_addr 
     */
    constructor(remote_addr:string)
    {
        this.chl = TransferChannel.fromRemoteAddr(remote_addr);
    }

    isConnected() : boolean
    {
        return this.chl.isConnected();
    }

    
}
