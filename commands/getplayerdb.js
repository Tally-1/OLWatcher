module.exports = {
    name: "getplayerdb",
    description: "Sends a copy of the json file containing the player database to the message author",
    execute(client, message){
        
        client.functions
        .get("logUserAction")
        .execute(message, "Requested player database", "");
        
        if(message.author.id === client.owner){
            const { MessageAttachment } = require('discord.js');
            const   path = require("path");
            const playerDbPath = path.join(client.root, "functions", "data", "playerDB.json");
            const file = new MessageAttachment(playerDbPath);

            message.author.send({ files: [file] }); //reply({ files: [file] });

            
        }
        else{
            message.reply("Only the bot-owner may request the dataBase");
        };
    }}