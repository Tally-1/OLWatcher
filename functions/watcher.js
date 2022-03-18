module.exports = {
    name: "watcher",
    description: "the bots main-function, scrapes the playerlist from battleMetrics then organizes and sends that data wherever needed",
async    execute(client){
        
        const rp = require('request-promise');
        const url = "https://www.battlemetrics.com/servers/arma3/7991938";
    
        rp(url)
      .then(function(html){
        //    console.log(html);
        
        client.functions.get("elmentContentScraper").execute(html, '<tbody>').then(async function(returnArr){
            
            
            client.functions.get("elmentContentScraper")
            .execute(returnArr[0], '<a')
            .then(function(playerList){
                
                const   fs = require("fs");
                const   path = require("path");
    
                let   filePath = path.join(__dirname, "data", "currentPlayers.json");
                let   filedata = fs.readFileSync(filePath);
                
                const previousPlayers   = JSON.parse(filedata);
                const currentPlayers    = [];
                const previousIDs       = [];
                const currentIDs        = [];
    
                const playersLeft       = [];
                const playersJoined     = [];
                
                console.log("------------------------------------------");
                for(let player of playerList){

                    

                    const playerData = client.functions.get("getPlayerId_Name").execute(player, client);
                    player = {
                        id: playerData[0],
                        names: [playerData[1]],
                        currentName: playerData[1],
                        steamId:    [],
                        steamIdReviewed: false
                    };
                    
    
                    player = client.functions.get("UpdatePlayerList").execute("playerDB", player, playerData, client);
                    currentPlayers.push(player);
                    
                }
    
                    filePath = path.join(__dirname, "data", "playerDB.json");
                    filedata = fs.readFileSync(filePath);
                
                    const dataBase   = JSON.parse(filedata);
    
                console.log("------------------------------------------");
                console.log("DataBase update complete");
                
    
                for(let player of previousPlayers){previousIDs.push(player.id)};
                for(let player of currentPlayers){currentIDs.push(player.id)};
    
                let index = 0;
                for(let playerID of previousIDs){
                    if(currentIDs.indexOf(playerID) == -1){
                         playersLeft.push(previousPlayers[index]);
                        };
                    index++;
                };
    
    
                index = 0;
                for(let playerID of currentIDs){
                    if(previousIDs.indexOf(playerID) == -1){
                        playersJoined.push(currentPlayers[index]);
                        };
                    index++;
                };
    
                  
                console.log(dataBase.length + " players in dataBase...");
                console.log("");
                
                filePath = path.join(__dirname, "data", "playersLeft.json");
                // filedata = fs.readFileSync(filePath);

                

                for(let player of playersLeft){
                    console.log(player.currentName + " has left the game..."); console.log("");
                    client.functions.get("addtofilearr").execute(filePath, player, true);
                };



                for(let player of playersJoined){console.log(player.currentName + " has joined the game..."); console.log("")};
    
                console.log(playersLeft.length + " players have left the game and " + playersJoined.length + " players have joined the game...");
                console.log(currentPlayers.length + " players online....");
                
                
    
                
                /*Updating "dataBase" */
                let filename = "currentPlayers.json";
                let data     = currentPlayers;
                const playerCount = currentPlayers.length;

                for(let i = 0; i < 3; i++){
                    if(i===1){filename = "playersJoined.json"; data = playersJoined};
                    if(i===2){filename = "playersLeft.json"; data = playersLeft};
                    

                    
                    filePath = path.join(__dirname, "data", filename);
                    fs.writeFileSync(filePath, JSON.stringify(data));
                }

                /*Store playerCount and timeStamp for GraphImage */
                filePath = path.join(__dirname, "data", "playerCountStats.json");
                client.functions.get("addtofilearr")
                .execute(
                         filePath, 
                         {value : playerCount, time : Math.round(new Date())}, 
                         true
                        );
                
                client.functions.get("updatePlayercountStats").execute();



                
                
            })
            .then(async function() {
                
                const   fs = require("fs");
                const   path = require("path");

                const playerStats      = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "playerCountStats.json")));
                const imgName          = "graphs.png";
                
                /*draw and upload a .png image. the url is stored as client.ImgUrl */
                client.graphPath = await client.functions.get("getGraphImage")
                .execute(client, playerStats, 150, imgName);
                
                client.functions.get("writeStatusEmbed").execute(client);
                client.functions.get("writePlayerCountEmbed").execute(client);

                client.serverStatusStats = playerStats;
                client.imgName = imgName;

                filedata = fs.readFileSync(path.join(__dirname, "data", "liveFeedList.json"));
                const liveList   = JSON.parse(filedata);

                if (liveList.length > 0){
                    for(feed of liveList){
                        client.functions.get("updateLiveInfo")
                        .execute(client, feed);
                     
                    }
                    console.log("\n\nUpdating " + liveList.length + " live-feeds\n");
                 }

            })
    
    
        })
    
        
      })
      .catch(function(err){
        console.log('\x1b[33m%s\x1b[0m', "Error ", err)
        return -1;
        
      });
    }}