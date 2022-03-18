module.exports = {
    name: "addRefreshButton",
    description: "adds a 'refresh' button to given button-row",
    execute(row, message, actionType){
        
        const id = message.id;
        const { MessageButton } = require('discord.js');
        let customId = 'refresh ' + actionType + " " + id;
        
        if(actionType === "searchPlayer"){
          let searchObject = message.content.substring(9);
          customId = 'refresh_' + actionType + '_' + id + " " + searchObject;
        };

        row.addComponents(
				new MessageButton()
					.setCustomId(customId)
					.setLabel('Refresh')
					.setStyle('PRIMARY'),
			); 
            
            
                return row;
        }
}