# picto
PictoChat on Netsoc servers, because who doesn't love pictochat?

# Dev Stuff
The following was taken from @ocanty's comment describing how to use his boilerplate;

Feel free to modify licenses, it's from an old game I was writing. I just fixed it up for this.

Summary of what I did:
All WS connections (the single one you make on the client to the server & the ones of every connected user on the server) are wrapped in a TransferChannel class.

This class exists to facilitate the exchange of our defined messages, (i.e connect, send picture, etc..) these can be found in /shared/net/messages/. A message can be represented as a class. Each message must then be added to the enum in MessageTypes.ts & a factory function created for it in MessageFactories.ts

Every TransferChannel class has a MessageHandlerArray, which is basically an array of callbacks for each message id. You subscribe a callback to a message (e.g. the Announcement event). When you receive the message you simply just cast the MessageContainer to the class. Each message class inherits from MessageContainer which manages serialization of the whole class when it needs to be sent

The main logic for both client and server exists in a logic() function defined on NetClient.ts & NetServer.ts

Example of a message handler (on the client)
```typescript
     logic()
    {
        // when we receive an announcement
        this.handlers.subscribe(MessageType.Announcement,
            function(chl:TransferChannel, msg:MessageContainer)
            {
                let msg_casted : AnnounceMessage = <AnnounceMessage>msg;

                // print it to console
                console.log("We got an announcement: " + msg_casted.getAnnounceText())

                // we can send back a response thru chl.send(Another message container)
            }
        )
    }
```

Example of an announcement (sent by the server)

```typescript
     // send them an announcement <3
        channel.sendMessage(AnnounceMessage.create("Welcome to Picto!"));
```

The server has the exact same system of handlers, that will handle a response message sent back

Because of the nature of the folder structure (client / server / shared) we can easily share protocol stuff
i.e Message implementation have the exact same class on the server and the client (hence, why all the message classes are in /shared).

See MessageTypes.ts and the messages folder to see what I mean

While this seems a tad overkill for something like picto, it was originally made to be really generic and handle 30-40 different messages that would be sent between a client and game server
