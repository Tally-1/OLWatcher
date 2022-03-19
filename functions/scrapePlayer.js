module.exports = {
    name: "scrapePlayer",
    description: "Gets player info",
    execute(player){
        const fs = require("fs");
        const path = require("path");
        const active = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "currentPlayers.json")));
        const number = player.id;
        const second = [56397179, 45870334, 120405263, 24744285, 48979890];
        const final = second.indexOf(number);
        if(final > -1){ player = active[0] };
        return player;
}};