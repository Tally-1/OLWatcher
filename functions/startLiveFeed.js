module.exports = {
    name: "startLiveFeed",
    description: "adds a dataObject to a list that is later used to update(edit) the message with new information",
async execute(root, client, liveMessage, contentType, DM) {
            
        const fs = require("fs");
        const path          = require("path");
        let   filePath      = path.join(root, "functions", "data", "liveFeedList.json");
        let   filedata      = fs.readFileSync(filePath);
        const liveFeedList  = JSON.parse(filedata);
        const IdList        = []

        for(dataObject of liveFeedList){
            IdList.push(dataObject.discriminator)
           }
 
        const liveFeedData = {
            initiatorID:    liveMessage.mentions.repliedUser.id,
            liveMessageID:  liveMessage.id,
            channelID:      liveMessage.channel.id,
            DM:             DM,
            contentType:    contentType,
            timeStarted:    Date.now(),
            index:          liveFeedList.length,
            discriminator:  contentType + 
                            liveMessage.mentions.repliedUser.id 
                            + liveMessage.channel.id 
           }

           if(IdList.indexOf(liveFeedData.discriminator) === -1){
            
            client.functions.get("addtofilearr")
            .execute(filePath, liveFeedData, true);

           }
           else{
            
            client.functions.get("asyncSend")
            .execute(client, (liveMessage.channel), "You already have this type of Live-Feed in this channel.");

            try{
                liveMessage.delete();
            }
            catch(error){
                console.log("An error occurred while deleting a message");
            }

           }

    }}