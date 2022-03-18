module.exports = {
    name: "duplicateName",
    description: "Checks if the name is repeated in other entries in the player DB. Returns array, [0] = bool, [1] = integer occurrences of the same name",
    execute(client, player){
        const fs = require("fs");
        const players = JSON.parse(fs.readFileSync(client.playerDB));
        let duped = false;
        let dupeCount = 0;
        const names = player.names; 

        if(!(names instanceof Array)){console.log("Could not verify duped names" + names); return [duped, dupeCount]}

        for(playah of players){
            duped = false;

                for(nombre of names){
                    
                    if((playah.names.indexOf(nombre) > -1 )
                    &&(!(playah == player))){
                        duped = true;
                        
                        
                    }};
            if(duped){dupeCount++;}
            
        };
        if(dupeCount > 2){duped = true}

        return [duped, dupeCount];
    }};