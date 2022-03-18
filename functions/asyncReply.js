module.exports = {
    name: "asyncReply",
    description: "Async reply function.",
async   execute(client, message, reply, addedData){

client.functions.get("updateUserDB").execute(message, client);
const { MessageEmbed } = require('discord.js');
    
        try{
            let returnvalue = -1;

            if(!(addedData == undefined)){
                
                const msg = await message.reply(reply);
                
                msg.nonce = addedData;
                if(Array.isArray(addedData)){
                    
                    if(addedData[0] == "searchResult"){
                        msg.searchResult = addedData[2];
                        return msg;
                    };
                
                };
                     
                
             }
             else {
                returnvalue = await message.reply(reply);
             }
            return returnvalue; 
            
    
            
        } 
        
        catch(error)
        {
            console.log("An error occured while replying to a message");
            client.functions.get("reportError").execute(error);
            
            
            client.functions.get("asyncSend").execute(client, (message.channel), reply);
            return -1;
        }
        
        
    }};