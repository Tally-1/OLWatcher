module.exports = {
    name: "handleSearchResults",
    description: "Takes the result from a player-search and turns it into a string that can be used as a reply-message",
    execute(results, client, embed){
  
        const   resultAmount = results.allFinds.length;
        const   { MessageEmbed } = require('discord.js');

        const   newEmbed = new MessageEmbed();
        newEmbed.titleName = false;

        const newEmbeds = [newEmbed];

        const   targets     = [];
        let     queryAnswer = "We could not find any players matching your search....";
        let     resultIndexText = "";
        let     playerText      = " player "
                newEmbed.setTitle(queryAnswer);

        if(resultAmount > 0){
            
            if(resultAmount > 1){playerText = " players "};
        
            queryAnswer = "We found "+resultAmount+ playerText + "matching your search: \n";
            let onlineText = "OFFLINE";
            let resultIndex = 1;
            let link = "";
            newEmbed.setTitle(queryAnswer);
            
            if(resultAmount === 1){ 
                newEmbed.setTitle(results.allFinds[0].currentName);
                newEmbed.titleName = true;
            };
     
            for(let player of results.allFinds){ 

                const field = client.functions.get("getPlayerField").execute(client, player, newEmbed); //getPlayerField(client, player, newEmbed);
                newEmbed
                .addFields({ name:  field.Title , 
                             value: field.SubText });
    
                let alternativeAccounts = "";
                
                if(resultAmount > 1){resultIndexText = "\n\n Result: " +resultIndex}
                else{
                    if (player.steamIdReviewed){
                        link = '\nhttps://stats.olympus-entertainment.com/stats/players/' +player.steamId[0]+'/'
                        
                        if(!(player.secondaryAccountIDs == undefined)){
                            
                            alternativeAccounts = "\n\n Alternative account:\n " + 'https://stats.olympus-entertainment.com/stats/players/' +player.secondaryAccountIDs[0]+'/'
                        }
                        
                        
                    };
                };
    
                if ((queryAnswer.length < 1750 && !embed)
                || (queryAnswer.length  < 5800 &&  embed)){
                    
                    if(client.functions.get("playerOnline").execute(player)){onlineText = "ONLINE"};
    
                let basicInfo       = client.functions.get("getUserInfo").execute(player);
    
                let basicInfoStart  = basicInfo.substring(0, basicInfo.length -3);
                let onlineStatus    = "\n The player is " + onlineText + "!";
                let basicInfoEnd    = "```";
                let playerInfo      = basicInfoStart + onlineStatus + resultIndexText +basicInfoEnd + link + alternativeAccounts;
                
                queryAnswer = queryAnswer + playerInfo;

                targets.push(player)
    
                };
                
                resultIndex++;
            };
    
        };
        
        if(embed)   {return [queryAnswer, targets, newEmbeds]}
        else        {return [queryAnswer, targets]};
        
    
    
    }}