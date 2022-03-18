module.exports = {
    name: "status",
    description: "replies to the command with information on each player that has recently joined or left the server. Also contains the playercount",
    execute(client, message, live, root){
        
        let     status              = client.functions.get("getServerStatus").execute(client);
        let     logMessage          = "requested server status"
        const   embed               = client.functions.get("getStoredEmbed").execute("serverStatusEmbed");
        let     reply               = (({ embeds: [embed] })); 

        

        
        if (live){

            status = status + "\nThis message will update automatically...";

            client.functions.get("asyncReply").execute(client, message, reply)
            .then(function(messageToEdit) {

                if (messageToEdit === -1){

                }
                else
                {
                    client.functions.get("startLiveFeed").execute(root, client, messageToEdit, "status", false);
                    
                };
                
            });

            logMessage = logMessage + "-live";

        }


        else{
            const deleteButton = client.functions.get("buildDeleteButton").execute();

            reply = (({ embeds: [embed], components: [deleteButton] }));
            client.functions.get("asyncReply").execute(client, message, reply);
        }
    

        client.functions.get("logUserAction").execute(message, logMessage, "");


    }}