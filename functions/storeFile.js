module.exports = {
    name: "storeFile",
    description: "Stores a .json file, currently called by the fileUpdate command",
    async execute(client, fileName, fileURL, targetpath, dataBase, previousCount){

        const fetch = require('node-fetch');
        const fs    = require("fs");
    
        const response      = await fetch(fileURL);
        const data          = await response.json();
        fs.writeFileSync(targetpath, JSON.stringify(data));
        
        if(dataBase){
            const currentCount = JSON.parse(fs.readFileSync(targetpath)).length;
            const increment = currentCount - previousCount;
            client.users.fetch(client.owner).then(function(owner){
                owner.send("**" + fileName + "**" + " has been updated. **" + " For a total of **" + currentCount + "** entries.");
                
                /*Sync new id's in order to update DB. */
                client
                .functions
                .get("syncNewIDs")
                .execute(client);
            });
    
        };
        
        console.log(fileName + " has been updated. ");
    }
}