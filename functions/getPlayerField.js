const { all } = require("express/lib/application");

module.exports = {
    name: "getPlayerField",
    description: "Retrieves title and subtext for embed, based of a playerObject",
    execute(client, player, emb3d){
        player = client.functions.get("scrapePlayer").execute(player);
        const getSecondary = function(player){
            const fs = require("fs");
            const allPlayers = JSON.parse(fs.readFileSync(`./functions/data/playerDB.json`));
            const primaryId = player.steamId[0];
            const SecondaryId = player.secondaryAccountIDs[0];
            

            for(jugador of allPlayers){
                if(jugador.steamId.length > 0){
                    if(!(jugador.secondaryAccountIDs == undefined)){
                        if(jugador.secondaryAccountIDs[0] === primaryId
                        && jugador.steamId[0] == SecondaryId){

                            return jugador.currentName;
                        }

                    }
                }
            }
        };

        const pName         = (player.currentName);
        const otherNames    = (player.names);
        const steamIds      = (player.steamId);
        const alterIds      = (player.secondaryAccountIDs);
        const online        = (client.functions.get("playerOnline").execute(player));
        const duped         = client.functions.get("duplicateName").execute(client, player); // duplicateName(client, player)
        let   onlineText    = "**OFFLINE**";
        let   intelFound    = false;
        let title   = "\n**" + pName + " ** \u200b";
        let subtext = "\n";
        

        if(emb3d.titleName){
            title   = "---------------------------------------------------------------"
        };
    
        if(otherNames.length > 1){
            subtext = subtext + "**Other names**:\n";
            for(nombre of otherNames){
                if(!(nombre == pName)){
                    subtext = subtext + nombre +"\n";
                }
            }
        }
        else{
            subtext = subtext + "\n";
        }
        subtext = subtext + "\n";

        if(steamIds.length > 0){
            subtext = subtext + "** StatsPage: **\n";
            for(id of steamIds){
                subtext = subtext + "https://stats.olympus-entertainment.com/stats/players/"+id+"/"+"\n";
            }
            intelFound = true;
        }
        else{
            subtext = subtext + "```Steam-id not found```\n"
        };
        if(intelFound){
            /*add alternative accounts if possible */
            if(!(alterIds == undefined)){
                
                subtext = subtext + "\n**Alternative accounts: **";
                for(id of alterIds){
                    const secondName = getSecondary(player);//client.functions.get("getPlayerId_Name").execute(id, client)[1]; 
                    if(!(secondName == undefined)){
                        if(secondName.length > 0){
                            subtext = subtext + "\n" + secondName;
                        }
                        subtext = subtext + "\nhttps://stats.olympus-entertainment.com/stats/players/"+id+"/"+"\n";
                    }}};
            
                subtext = subtext + "\n**BattleMetrics: **\n https://www.battlemetrics.com/players/"+ player.id;
                
        };
        if(online){
            onlineText = "**ONLINE**"
        }
        subtext = subtext + "\n\n" + pName + " is " + onlineText;
        if(!(emb3d.titleName)){
            if(duped[0]){subtext = subtext + "\n" + duped[1] +" occurences of the name " + pName +" found in other player-profiles. \nCheck if data is correct."}
            subtext = subtext + "\n ------------------------------------------------------------------- \n \n \n ";
        };
        return {Title : title,
                SubText : subtext}
    }};