module.exports = {
    name: "addFromSearchList",
    description: "Adds a player from to a list tied to the user requesting it, future implementation live-monitoring, and notifications (!!Does not work as intended!!)",
    execute(message, client){
        
        if((message.type === "REPLY") && (message.mentions.repliedUser.id === client.user.id)){
        
            let originalMessageId = message.reference.messageId;
        
         message.channel.messages.fetch(originalMessageId)
        .then(function (originalMessage){
            if(!(originalMessage.nonce == null))
            {
                if(originalMessage.nonce[0] === "searchResult" 
                && originalMessage.nonce[1].length > 0){
                    client.commands.get("addTarget").execute(originalMessage, message, args, originalMessage.nonce[1], client)
                }
            }
            else{
                client.functions.get("asyncReply").execute(client, message, "Could not add target. Try searching the player-list using the **!!search** command. \n" +
                                                                            "Then reply to that message using the **!!Add** command.");
            }
        })
        .catch(console.error);
            
        }
        else
        {
            client.functions.get("asyncReply").execute(client, message, "First find the player by using the **!!Search** command. \n"+
                                                                        "Then reply to that message using the **!!Add** command. \n" +
                                                                        "This will add the player to your target-list.\n"+
                                                                        "\nIf you have more than one result in your search use: **!!Add 1** / **!!Add 2** /  **!!Add 3**. Depending on the search-result you wish to add to your target-list.");
        }
    }}