module.exports = {
    name: "UpdatePlayerList",
    description: "updates the json file containing players (simple database)",
     execute(listName, player, playerData, client){

        const   fs = require("fs");
        const   path = require("path");
    
        const   fileName = listName + ".json"
        const   filePath = path.join(__dirname,"data", fileName);
        
        const   filedata = fs.readFileSync(filePath);
        const   playerList = JSON.parse(filedata);
        
        let currentIDs = [];
        let playerObject = player;
        
    
        for (const player of playerList){
            currentIDs.push(player.id)
        }
        const playerIndex = currentIDs.indexOf(player.id);
    
        /*Actions for players already in the DB */
        if(playerIndex > -1){
            playerObject = playerList[playerIndex];
        
        /*Notifying of namechange */
        if (!(playerObject.currentName === playerData[1])){

            console.log('\x1b[33m%s\x1b[0m',    playerObject.currentName,''    + 
                        " has changed his name to "    + 
                        '\x1b[33m%s\x1b[0m',    playerData[1], '');
        }
            
            
        if(playerObject.names.indexOf(playerData[1]) == -1){
                
            /*If the new name is not stored in DB already */
                playerObject.names.push(playerData[1]);
                playerObject.currentName = playerData[1];
    
                
            }
            
            /*Updating current name */

            if (!(playerObject.currentName === playerData[1])){
                playerObject.currentName = playerData[1];
            }
            
            /*Storing changes */
            fs.writeFileSync(filePath, JSON.stringify(playerList));
        
        }
        /*Actions for players not in the DB */
        else{
            
            client.functions.get("addtofilearr").execute(filePath, player, true);
            // addToFileArr(filePath, player, true)
            console.log("Player "+ '\x1b[33m%s\x1b[0m', playerData[1],'' +" added to dataBase!")
        }


        
        return playerObject;
    }};