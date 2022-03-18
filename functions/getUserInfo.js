module.exports = {
    name: "getUserInfo",
    description: "Creates a code-block containing info(atm names only) on the player requested",/*name needs to be changed, because this function refers to players, not bot-users */
    execute(player, embed){
    
    let statsProfile = "";
    let previousName = "";
    let playerInfoBlock = "";
/*If the player has more than one name registered */
if(!embed)
    {if(player.names.length > 1){

        previousName = "\n Other names: "
        let linebreak =  '",\n              ';
        
        let i = 2;
        for(let name of player.names){

            if (i === player.names.length){linebreak = '",  '};

            if (!(name == player.currentName))
            {previousName = previousName + '"' + name + linebreak};
            
            i++;
        }};

        if(player.steamId == undefined){player.steamId = []};

        for(let steamId of player.steamId){
            statsProfile = statsProfile + '\n Stats: "https://stats.olympus-entertainment.com/stats/players/' +steamId+'/"\n'
        }


        playerInfoBlock =   '```sqf\n Name:        "' + player.currentName +'"\n' +
                                previousName + statsProfile + "```";
};
return playerInfoBlock;
}}