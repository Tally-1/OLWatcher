module.exports = {
    name: "search",
    description: "Searches for players and replies with the result",
async execute(message, client, embed){
        
        let searchObject = message.content.substring(9);
        
        const { MessageEmbed } = require('discord.js');
        let   returnEmbeds  = new MessageEmbed();
        const results = client.functions.get("searchPlayer").execute(searchObject, client);
        const processedResults = client.functions.get("handleSearchResults").execute(results, client, embed);
        const resultText = processedResults[0];
        const targetList = processedResults[1];
        if(embed){returnEmbeds = processedResults[2]}; 
        
        client.functions
        .get("logUserAction")
        .execute(message, "searched for " + searchObject, "");
        
        if(embed){
            try
            {
                let deleteButton = client.functions.get("buildDeleteButton").execute();
                    deleteButton = client.functions.get("addRefreshButton").execute(deleteButton, message, "searchPlayer");
            
            const msgObject = await
            client.functions.get("asyncReply")
            .execute(client, message, ({ embeds: returnEmbeds, components: [deleteButton] }), ["searchResult", targetList, results]);
            
            

            return}
            catch(error){
                console.log(error);
            };
        };

        /*If first attempt fails or no embed is returned */
        try
            {
        client.functions.get("asyncReply")
        .execute(client, message, resultText, ["searchResult", targetList]);
            }
        catch(e){
            console.log(e);
        }
        
    }
}