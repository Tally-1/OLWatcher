module.exports = {
    name: "getPlayerId_Name",
    description: "returns an array with the players id (battleMetrics, not steamID) and playerName",
    execute(entry, client){
        
        const playerID = client.functions.get("scrapeNumbers").execute(entry, false);
        const playerName = client.functions.get("btmNameScraper").execute(entry);

        

        return [playerID, playerName]; 
    }}