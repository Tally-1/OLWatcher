module.exports = {
    name: "playercount",
    description: "Replies to the command-message with the amount of players currently online",
    execute(root, message, client, live){
        const   embed             = client.functions.get("getStoredEmbed").execute("playerCountEmbed");
        let    reply             = (({ embeds: [embed] }));
        let     logMessage        = "requested PlayerCount"
        const   currentPlayers    = JSON.parse(filedata);

        
        

         if (live){
            
            logMessage = logMessage + " -live";

            client.functions.get("asyncReply").execute(client, message, reply)
            .then(function(messageToEdit) {
                if (!(messageToEdit === -1)){
                    client.functions.get("startLiveFeed").execute(root, client, messageToEdit, "playercount", false);
                }})}
        
       else{
                const deleteButton = client.functions.get("buildDeleteButton").execute();
                    
                reply = (({ embeds: [embed], components: [deleteButton] }));
                client.functions.get("asyncReply").execute(client, message, reply); 
            }

        
        
        client.functions.get("logUserAction").execute(message, logMessage, "");
    }}