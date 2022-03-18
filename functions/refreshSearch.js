module.exports = {
    name: "refreshSearch",
    description: "Redoes a search when message is pressed",
async execute(client, interaction){
        const message           = interaction.message;
        const buttonId          = interaction.customId;
        const components        = buttonId.split(/ * /);
        const searchObject      = buttonId.slice(components[0].length);
        let   results = client.functions.get("searchPlayer").execute(searchObject, client);

        interaction.deferReply();

        /*if(results == undefined){
            console.log("could not get the previous results, redoing search for: " + searchObject);
            results = client.functions.get("searchPlayer").execute(searchObject, client);
        }
        else{
            console.log("previous search found, re-building embed");
        }*/
        const processedResults = client.functions.get("handleSearchResults").execute(results, client, true);
        const newEmbed = processedResults[2][0];
        var xx = await client.functions.get("updateEmbedNoTxt").execute(client, message, newEmbed);

        interaction.deleteReply();

        client.functions
        .get("logUserAction")
        .execute(message, "refreshed search for " + searchObject, " Button action.");

         return "refreshed search for: " + searchObject;
        
    }};