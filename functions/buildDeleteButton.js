module.exports = {
    name: "buildDeleteButton",
    description: "builds a button-row containing 1 red button with the text delete, and id: deleteMessage_(random number) ",
    execute(){
        console.log("building delete button");
        const randomNumber = Math.round(Math.random() * 1000000);
        const { MessageActionRow, MessageButton } = require('discord.js');
        const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('deleteMessage_' + randomNumber)
					.setLabel('Delete')
					.setStyle('DANGER'),
			); 
            
            
                return row;
        }
}