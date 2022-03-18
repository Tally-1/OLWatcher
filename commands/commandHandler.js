module.exports = {
    name: "commandHandler",
    description: "Relays the command to the correct command-function",
    execute(client, message){

            /*fetching commands */
            const args = message.content.slice(client.prefix.length).split(/ * /); /*removes the prefix */
            
            const command = args.shift().toLowerCase(); //lowerCases command in order to avoid caps-errors

            if (command === "ping"){
                client.commands.get("ping").execute(message);
            }
            else if(command === "playercount"){
                client.commands.get("playercount").execute(client.root, message, client, false);
                
            }
            else if(command === "playercountlive"){
                client.commands.get("playercount").execute(client.root, message, client, true);
                
            }
            else if(command === "playerlist"){
                client.commands.get("playerList").execute(client.root, message, client);
                
            }
            else if(command === "status"){
                client.commands.get("status").execute(client, message, false, client.root);
            }

            else if(command === "statuslive"){
                client.commands.get("status").execute(client, message, true, client.root);
            }
            else if(command == "search"){
                client.commands.get("search").execute(message, client, true);
            }
            else if (command == "add"){
                client.commands.get("addFromSearchList").execute(message, client);
            }
            else if(command === "getplayerdb"){
                client.commands.get("getplayerdb").execute(client, message);
            }
            else if(command === "fileupdate"){
                client.commands.get("fileupdate").execute(client, message);
            }
            else if(command === "link"){
                message.reply(client.botLink);
            }
            else if(command === "restart"){
                client.commands.get("restart").execute(client, message);
            }
            else if(command === "shutdown"){
                client.commands.get("shutDown").execute(client, message);
            }
            /*Just a test command to test crash features. */
            else if(command === "crash"){
                //message.reply(sajdg);
            }

    }}