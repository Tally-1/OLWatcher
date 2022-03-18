module.exports = {
    name: "shutDown",
    description: "this will reStart the bot",
    execute(client, message){
        const   fs = require("fs");
        if(message.author.id === client.owner){
            message.reply("bot will shut down");
            client.shutDown = true;
        }
        else{
            message.reply("Only the bot-owner may shut down the bot");
        };
}};