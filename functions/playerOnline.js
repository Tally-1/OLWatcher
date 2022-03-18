module.exports = {
    name: "playerOnline",
    description: "Checks if a player is online, returns bool",
    execute(player){

        const   path    = require("path");
        const   fs      = require("fs");
        const   onlinePlayers    = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "currentPlayers.json")));
        const   onlineIds = [];
        
        let     online = false;
    
        for(let jugador of onlinePlayers){
            onlineIds.push(jugador.id);
        };
    
        if (onlineIds.indexOf(player.id) > -1){online = true};
    
        return online;
    }}