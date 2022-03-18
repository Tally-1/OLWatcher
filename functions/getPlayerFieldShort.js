module.exports = {
    name: "getPlayerFieldShort",
    description: "Retrieves title and subtext for embed, based of a playerObject, short version, only contains names and id",
    execute(player, txt){
        const pName         = (player.currentName);
        const otherNames    = (player.names);
        const steamIds      = (player.steamId);
        let   intelFound    = false;
        let title   = "\n**" + pName + " ** \u200b";
        let subtext = ""+ txt +"\n";
        if(otherNames.length > 1){
            subtext = subtext + "*Other names*:\n";
            for(nombre of otherNames){
                if(!(nombre == pName)){
                    subtext = subtext + nombre +"\n";
                }
            }
        }
        
        
        if(steamIds.length > 0){
            subtext = subtext + "*StatsPage:*\n";
            for(id of steamIds){
                subtext = subtext + "https://stats.olympus-entertainment.com/stats/players/"+id+"/"+"\n";
            }
            intelFound = true;
        }
        else{
            subtext = subtext + "*Steam-id not found*\n"
        };
        subtext = subtext +  "-----------------------------------------------------------------\n";
        return {Title : title,
            SubText : subtext}

    }};