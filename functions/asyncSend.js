module.exports = {
    name: "asyncSend",
    description: "Async send function. Sends potential error to a json file. Returns -1 in case of error",
async execute(client, channel, msgToSend){
    const { MessageEmbed } = require('discord.js');
        try{
            let returnvalue = await channel.send(msgToSend);
            
    
            return returnvalue;
        } 
        
        catch(error)
        {
            console.log(error, "\n\nAn error occured while sending a message");
            client.functions.get("reportError").execute(error);
            
            return -1;
        }
    

    }}