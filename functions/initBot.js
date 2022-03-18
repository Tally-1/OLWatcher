module.exports = {
    name: "initBot",
    description: "this initiates the bot, adding the values needed before login",
    execute(client, config){
        const fs    = require("fs");
        const path  = require("path");
        const settings    = JSON.parse(fs.readFileSync(path.join(client.root, config + ".json")));
        
        
        client.port         = settings.port;
        client.imgChannel   = settings.imgChannel;
        client.owner        = settings.owner;
        client.iconURL      = settings.iconURL;
        client.botLink      = settings.botLink;
        client.token        = settings.token;
        client.prefix       = settings.prefix;
        
        // client.portURL      = "http://localhost:"+ client.port +"/recommend";
        client.playerDB     = path.join(client.root, "functions", "data", "playerDB.json");
        client.nameID       = path.join(client.root, "functions", "data", "nameId.json");
        client.restart      = false;
        client.shutDown     = false;
        
}};