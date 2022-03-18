module.exports = {
    name: "duplicateId",
    description: "Checks if the steam-id is repeated in other entries in the player DB. Returns array, [0] = bool, [1] = integer occurrences of the same id",
    execute(client, player){
        const fs = require("fs");
            const path = require("path");
            const players = JSON.parse(fs.readFileSync(client.playerDB));
            let duped = false;
            let dupeCount = 0;
            const Ids = player.steamId;

            for(playah of players){
                duped = false;

                    for(id of Ids){
                        
                        if((playah.steamId.indexOf(id) > -1 )
                        &&(!(playah == player))){
                            duped = true;
                        }};
                if(duped){dupeCount++;}
                
            };
            if(dupeCount > 2){duped = true}

            return [duped, dupeCount];
    }};