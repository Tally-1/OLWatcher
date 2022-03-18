module.exports = {
    name: "updatePlayercountStats",
    description: "Deletes the oldest entries in order to avoid a too long time-span",
    execute(){
        
        const   fs = require("fs");
        const   path = require("path");
        const   filePath = path.join(__dirname, "data", "playerCountStats.json")
        const   filedata = fs.readFileSync(filePath);
        const   playerCountStats = JSON.parse(filedata);
        const   oneDayInMs = 86400000;

        let timeSpan = (playerCountStats[(playerCountStats.length - 1)].time - playerCountStats[0].time);

        while (timeSpan > oneDayInMs) {
            playerCountStats.shift(0);
            timeSpan = (playerCountStats[(playerCountStats.length - 1)].time - playerCountStats[0].time);
        };

        fs.writeFileSync(filePath, JSON.stringify(playerCountStats));
}};


//{"value":32,"time":1645442937772}