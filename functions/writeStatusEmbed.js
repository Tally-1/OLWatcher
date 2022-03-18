module.exports = {
    name: "writeStatusEmbed",
    description: "Writes a embed containing the playerCount and stores it as a .json file",
    execute(client){
                const   fs = require("fs");
                const   path = require("path");
                const   {MessageEmbed}  = require('discord.js');
                let     filedata        = fs.readFileSync(path.join(__dirname, "data", "currentPlayers.json"));
                const   playerCount     = JSON.parse(filedata).length;
                const   playersJoined   = JSON.parse(fs.readFileSync(`./functions/data/playersJoined.json`));
                const   playersLeft     = JSON.parse(fs.readFileSync(`./functions/data/playersLeft.json`));
                const   statusEmbed     = new MessageEmbed();


                const   endField        = "\n\n\n**" + 
                                          playersLeft.length    + ' Players left \n' + 
                                          playersJoined.length  + ' Players joined \n' +
                                          playerCount           + ' players on Olympus now** \n';
                
                                       
                        
                        statusEmbed.addField('\u200B', "```Left the game```");
                        for(let player of playersLeft){
                            const field = client.functions.get("getPlayerFieldShort").execute(player, "");// getPlayerField(player, "Left");

                            statusEmbed.addFields(
                                { name:  field.Title , value : field.SubText }
                            )
                        };

                        statusEmbed.addField('\u200B', "```Joined the game```");
                        for(let player of playersJoined){
                            const field = client.functions.get("getPlayerFieldShort").execute(player, "");//getPlayerField(player, "Joined");
                            statusEmbed.addFields(
                                { name:  field.Title , value : field.SubText }
                            )
                        };
                    
                    
                
                                        statusEmbed
                                        .addField('Status: ', endField)
                                        .setImage(client.ImgUrl)
                                        .setTitle("Olympus server 1 status: " + ("\u3000".repeat(100)))
                                        //.setThumbnail('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.bM9y2g45Krbb7UqFQ8vMjAHaHa%26pid%3DApi&f=1')
                                        .setAuthor( 'Olympus tracker', 
                                                    client.iconURL, 
                                                    'https://stats.olympus-entertainment.com/stats/top/'/*client.botLink*/ )
                
                filePath = path.join(__dirname, "data", "embeds", "serverStatusEmbed.json");
                fs.writeFileSync(filePath, JSON.stringify(statusEmbed));

        }} 