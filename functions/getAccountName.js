module.exports = {
    name: "getAccountName",
    description: "gets the name of an account based off steam-id, very fallible condsidering the amount of duped and wrong entries of steam-id in the DB",
    execute(client, steamId){
        const fs = require("fs");
        const players = JSON.parse(fs.readFileSync(client.playerDB));
        let accountName = "";

        for(play3r of players){
            
                if(play3r.steamId.length > 0){
                    if(play3r.steamId == steamId){
                    accountName = play3r.currentName;
                    return accountName;
                }};
            
        };
        return accountName;
    }}