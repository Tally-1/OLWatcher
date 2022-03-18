module.exports = {
    name: "updateEmbedNoTxt",
    description: "deletes text && embed from a message and applies new embed",
async execute(client, message, newEmbed){
        const   { MessageEmbed }  = require('discord.js');
        const updateText = "Updating...";
        const tempEmbed = new MessageEmbed()
              .setTitle(updateText);
        
        
        var wait = await client.functions.get("asyncEdit").execute(message, ({ embeds: [tempEmbed] })); //message.edit({ embeds: [tempEmbed] });
            wait = await client.functions.get("asyncEdit").execute(message, "   ");
            wait = await client.functions.get("asyncEdit").execute(message, ({ embeds: [newEmbed] })); //message.edit({ embeds: [newEmbed] });
            
            

        }
}