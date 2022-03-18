module.exports = {
    name: "fileupdate",
    description: "this command will read and store files attached to the message(seems to only work with .json files atm, needs more testing)",
    execute(client, message){
        const   fs = require("fs");
        if(message.author.id === client.owner){
            const fileName      = message.attachments.at(0).name;
            const dataFile      = fileName.endsWith(".json");
            const fileURL       = message.attachments.at(0).attachment;
            const targetpath    = require("path").join(client.root, "functions", "data", fileName);
            let   dataBase      = false;
            let   previousCount = 0;

            if(dataFile){
                if(fileName == "nameId.json"
                || fileName == "playerDB.json"){
                    previousCount = JSON.parse(fs.readFileSync(targetpath)).length;
                    dataBase = true;
                };
                client.functions.get("storeFile")
                .execute(client, fileName, fileURL, targetpath, dataBase, previousCount);
                
            };
            client.functions
            .get("logUserAction")
            .execute(message, "updated " + fileName, "");
        }
        else{
            message.reply("Only the bot-owner may update the dataBase");
        };
}};