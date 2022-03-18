module.exports = {
    name: "searchPlayer",
    description: "Retrieves players based on Name or Steam-id",
    execute(searchObject, client){
        
        const searchObject2 = client.functions.get("trimAndCleanString").execute(searchObject);
        let searchedById = false;
        const   path    = require("path");
        const   fs      = require("fs");
        const allPlayers    = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "playerDB.json")));
        
        const firstFinds        = [];
        const bestFinds         = [];
        const goodFinds         = [];
        const mediocreFinds     = [];
        const badFinds          = [];
        const allFinds          = [];
    
        if(searchObject.startsWith("7656")){searchedById = true}; 
        
    
        if(!searchedById){
            for(let player of allPlayers){
    
                let viableResult = false;
                
                if(searchObject == player.currentName){
                    firstFinds.push(player);
                    viableResult = true;
                }
                else if(searchObject2 == player.currentName){
                    bestFinds.push(player);
                    viableResult = true;
                }
                else if(searchObject2 == client.functions.get("trimAndCleanString").execute(player.currentName)){
                    goodFinds.push(player);
                    viableResult = true;
                }
                else{
                    for(let name of player.names){
    
                        if(name == searchObject){
                            mediocreFinds.push(player);
                            viableResult = true;
                        }
                        else if(client.functions.get("trimAndCleanString").execute(name) == searchObject2){
                            badFinds.push(player);
                            viableResult = true;
                        }
                    }
                }
                
                if(viableResult){allFinds.push(player)};
            }
        }
        else {
            
            searchObject = client.functions.get("trimAndCleanString").execute(searchObject);

            for(let player of allPlayers){
                if(player.steamIdReviewed){
                    if(searchObject == player.steamId){
                        firstFinds.push(player);
                        allFinds.push(player);
                    }
                }
            }
    
        }

        return{
            firstFinds: firstFinds, 
            bestFinds: bestFinds, 
            goodFinds:  goodFinds, 
            mediocreFinds:  mediocreFinds, 
            badFinds:  badFinds, 
            allFinds: allFinds
        };
    
    }}