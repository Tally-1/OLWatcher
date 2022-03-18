module.exports = {
    name: "writePlayerCountEmbed",
    description: "Writes a embed containing the playerCount and stores it as a .json file",
    execute(client){
                const   fs = require("fs");
                const   path = require("path");
                const   { MessageEmbed }  = require('discord.js');
                const   filedata = fs.readFileSync(path.join(__dirname, "data", "currentPlayers.json"));
                const   playerCount   = JSON.parse(filedata).length;

                const   playerCountEmbed  = new MessageEmbed()
                        .setTitle(playerCount + " players online....")
                        .setImage(client.ImgUrl)
                        .setAuthor( 'Olympus tracker', 
                                     client.iconURL, 
                                     'https://stats.olympus-entertainment.com/stats/top/'/*client.botLink*/ );
                
                filePath = path.join(__dirname, "data", "embeds", "playerCountEmbed.json");
                fs.writeFileSync(filePath, JSON.stringify(playerCountEmbed));

        }} 