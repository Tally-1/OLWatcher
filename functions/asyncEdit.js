module.exports = {
    name: "asyncEdit",
    description: "Async edit function. Sends potential error to a json file. Returns -1 in case of error",
async execute(message, newMessage){
    const { MessageEmbed } = require('discord.js');
        try{
            
            returnValue = await message.edit(newMessage);
    
            return returnvalue;
        } 
        
        catch(error)
        {
            // console.log(error, "\n\nAn error occured while editing a message");
            // client.functions.get("reportError").execute(error);
            
            return -1;
        }
    

    }}