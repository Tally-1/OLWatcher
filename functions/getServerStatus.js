module.exports = {
    name: "getServerStatus",
    description: "Creates a string containing information on each player that has recently joined or left the server. Also contains the playercount",
    execute(client){
    const   fs = require("fs");
    const   path = require("path");
    const { MessageEmbed } = require('discord.js');

    let   filePath = path.join(__dirname, "data", "currentPlayers.json");
    let   filedata = fs.readFileSync(`./functions/data/currentPlayers.json`);
    const currentPlayers   = JSON.parse(filedata);

    filePath = path.join(__dirname, "data", "playersJoined.json");
    filedata = fs.readFileSync(filePath);
    const playersJoined   = JSON.parse(filedata);

    filePath = path.join(__dirname, "data", "playersLeft.json");
    filedata = fs.readFileSync(filePath);
    const playersLeft   = JSON.parse(filedata);

const serverStatusEmbed = function(playersLeft, playersJoined, currentPlayers){
    const { MessageAttachment, MessageEmbed } = require('discord.js');
    const file          = new MessageAttachment(client.graphPath);
    const StatusEmbed  = new MessageEmbed();
    //.setImage(client.ImgUrl);
    //.setImage('attachment://' + client.imgName);
    
        for(let player of playersLeft){
            const field = getPlayerField(player, "Left");
            StatusEmbed.addFields(
                { name:  field.Title , value : field.SubText }
            )
        };
        for(let player of playersJoined){
            const field = getPlayerField(player, "Joined");
            StatusEmbed.addFields(
                { name:  field.Title , value : field.SubText }
            )
        };
    
    const footerText = "\n\n\n" + 
                        playersLeft.length + ' Players left \n' + 
                        playersJoined.length + ' Players joined \n' +
                        currentPlayers.length + ' players on Olympus now \n';
   
                        
   /*FOR REASONS UNKNOWN i CANNOT GET THE FOLLOWING CODE TO WORK, footerText is not read as a string by Discord.js despite it being a string*/

   /*StatusEmbed.setFooter({ text: footerText, iconURL: 'https://olympus-entertainment.com/uploads/monthly_2021_10/Producers6.thumb.jpg.272c3e6f579fbc7bc582c07322dc2d09.jpg' });
    */
   StatusEmbed.addField('Status: ', footerText);
        //console.dir(StatusEmbed);
   return StatusEmbed;

};

const getPlayerField = function(player, string){
    const pName     = (player.currentName);
    const otherNames= (player.names);
    const steamIds  = (player.steamId);
    const leaveText = " ```"+string+ " the game.```";

    title   = pName + " " + leaveText;
    subtext = "";

    if(otherNames.length > 1){
        subtext = "Other names:\n";
        for(nombre of otherNames){
            if(!(nombre == pName)){
                subtext = subtext + nombre +"\n";
            }
        }
    }

    if(steamIds.length > 0){
        for(id of steamIds){
            subtext = subtext + "https://stats.olympus-entertainment.com/stats/players/"+id+"/"+"\n";
        }
    }
    else{
        subtext = subtext + "```Steam-id not found```\n"
    };
    subtext = subtext + "\n\n";

    return {Title : title,
            SubText : subtext}
};

    let Status = "Server-status:\n```fix\nPlayers that left the game recently:\n\n```";
    for(player of playersLeft){
    if (Status.length < 900)
        {Status = Status + client.functions.get("getUserInfo").execute(player)};
    }

    Status = Status + "\n\n```yaml\nPlayers that joined the game recently:\n\n```";
    for(player of playersJoined){
        if (Status.length < 1750)
        {Status = Status + client.functions.get("getUserInfo").execute(player)}
    }

    Status = Status + "\n```py\n" +  playersLeft.length + " players have left the game\n" +
    playersJoined.length + " players have joined the game\n```" +
    "\n```sqf\n" + currentPlayers.length + " Players on olympus right now```"
    
    let embed = serverStatusEmbed(playersLeft, playersJoined, currentPlayers);
    const testChannel   = "921858569391972404";
    const { MessageAttachment } = require('discord.js');
    const file = new MessageAttachment(client.graphPath);
    /*client.channels.fetch(testChannel).then(cha =>{
        //embed.setImage(client.ImgUrl);
        embed.setImage('attachment://' + client.imgName);
        cha.send({ embeds: [embed], files: [file] })
        
        /*.then(function(msg){
            embed.setImage('attachment://' + client.imgName);
            msg.edit({ embeds: [embed]})
        })*/
    //});
    if(typeof Status == "string"){
        Status = Status + "\n|| " + client.ImgUrl +" ||";
    }
    
 //embed = { embeds: [embed], files: [file] }
return Status;//[file, ({ embeds: [embed], files: [file] })];// Status//embed// 

}}