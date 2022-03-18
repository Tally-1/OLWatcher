module.exports = {
    name: "updateLiveInfo",
    description: "updates live info by editing a message",
async    execute(client, liveObject) {
  
  const { MessageEmbed } = require('discord.js');
  const refreshRate      = Math.round(client.functions.get("getRefreshRate").execute() / 60000);
  const footerText       = 'Feed will update every ' + refreshRate + ' minutes.';
  

    try{
        const channel   = client.channels.cache.get(liveObject.channelID);
        const dateTime  = client.functions.get("getDateTime").execute(client);
        
        // channel.messages.fetch(liveObject.liveMessageID);
        channel.messages.fetch({ limit: 100 })
        .then(function(messages) {
            
            let count = 1;
            let max = (messages.size);
            let ID = (liveObject.liveMessageID);
          
          // Iterate through the messages to find the correct one before editing it. 
          // This workaround is necesary because catching error does not stop crashing the app.
          messages.forEach(message => {                                   
                                          
                                          if (ID === message.id){
                                              
                                              if (message.editable){
        
                                                if(liveObject.contentType == "status"){
                                                  
                                                  let newEmbed = client.functions.get("getStoredEmbed").execute("serverStatusEmbed");
                                                  newEmbed = new MessageEmbed(newEmbed).setFooter( footerText, client.iconURL );
                                                  client.functions.get("updateEmbedNoTxt").execute(client, message, newEmbed);

                                                  return;
                                                        
                                                }
                                                else 
                                                if(liveObject.contentType == "playercount"){
                                                  
                                                  let newEmbed = client.functions.get("getStoredEmbed").execute("playerCountEmbed");
                                                  newEmbed = new MessageEmbed(newEmbed).setFooter( footerText, client.iconURL );
                                                  client.functions.get("updateEmbedNoTxt").execute(client, message, newEmbed);

                                                  return;
                                                }

                                                
                                              }
                                              else{

                                                
                                                client.functions.get("endLiveFeed").execute(liveObject);
                                                console.log("\nmessage cannot be edited. Live-feed failed\nRemoving feed from list");
                                                return;
                                              }

                                              
                                              
                                          }
                                          if (count == (max)){
                                              console.log("\nmessage could not be found. Live-feed failed\nRemoving feed from list");
                                              client.functions.get("endLiveFeed").execute(liveObject);
                                              return;
                                            }
                                          
                                          count++;
                                      });

    
        });
        
    }
    catch(error){
        console.log(error, "\n\n\nLivefeed failed. Discriminator: " + liveObject.discriminator)
        newText = client.functions.get("reportError").execute(error)
    }
        
    
    }}