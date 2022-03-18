module.exports = {
    name: "restart",
    description: "this will reStart the bot",
    execute(client, message){
        const   fs = require("fs");
        if(message.author.id === client.owner){
            message.reply("bot will restart");
            client.restart = true;
        }
        else{
            message.reply("Only the bot-owner may reset the bot");
        };
}};