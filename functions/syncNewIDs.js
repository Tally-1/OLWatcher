module.exports = {
    name: "syncNewIDs",
    description: "This is a function used when syncing new steamIds into the playerDatabase",
    execute(client){
       
        
function addBarToTag(name){
    let     newName       = [];
    let     tag           = ["-"];
    let     noSpace       = true;
    for(let i = 0; i < name.length; i++){
    let letter = name[i];
    
    if(noSpace)
    {
    if (letter == " "){
        tag.push("-");
        noSpace = false;
        newName.push(letter);
    }
    else
    {tag.push(letter);}
    
    }
    else{
    newName.push(letter);
    }}
    
    newName = (tag.join("") + newName.join(""));
    return newName;
    };
    

    function removeTags(name){
        let     newName       = [];
        let     tags           = ["-", "|"];
        
        for(let i = 0; i < name.length; i++){
        let previousLetter = name[newName.length -1];
        let letter = name[i];
        let doubleSpace = (letter == " " && previousLetter == " ");
        
        if ((
            (tags.indexOf(letter) == -1)
        ||  ((letter == " ") && tags.indexOf(previousLetter) == -1)
        )
        &&
        (!doubleSpace))
        {
        
            newName.push(letter);
        };
        };
    
        newName =  newName.join("");
        
        return newName;
        };
        




        
        const fs = require("fs");
        const   path = require("path");

        let     filePath    = path.join(__dirname, "data", "nameId.json");
        let     filedata    = fs.readFileSync(filePath);
        let     nameIdDB    = JSON.parse(filedata);
        let     names       = [];

        for(entry of nameIdDB){
            names.push(entry[1])
        }
             
             filePath    = path.join(__dirname, "data", "registeredPlayers.json");
             filedata    = fs.readFileSync(filePath);
        let  registeredPlayers    = JSON.parse(filedata);

             filePath    = path.join(__dirname, "data", "playerDB.json");
             filedata    = fs.readFileSync(filePath);
        let  playerDB    = JSON.parse(filedata);

        let i = 0;
        let playersUpdated = 0;

        for(let name of names){
            
            let alterName = addBarToTag(name);
            let ID = nameIdDB[i][0];

            for(let player of playerDB){

                if(((player.names.indexOf(name) > -1)
                || (player.names.indexOf(alterName) > -1)
                || (removeTags(player.currentName) == name))
                && (!player.steamIdReviewed))
                {
                    
                    if (player.steamId.indexOf(ID) == -1)
                    {
                        player.steamId.push(ID);
                        if(player.steamId.length === 1){player.steamIdReviewed = true};
                        playersUpdated++;
                        registeredPlayers.push(player);
                    };
                }
            }
        i++;
        };
        console.log("added steam-id to " + playersUpdated + " players...")
        
        if(playersUpdated > 1){
            client.users.fetch(client.owner).then(function (owner){
                owner.send("Updated steamId for " + playersUpdated + " new players.")
            });
        };

        filePath    = path.join(__dirname, "data", "playerDB.json");
        fs.writeFileSync(filePath, JSON.stringify(playerDB));
        filePath    = path.join(__dirname, "data", "registeredPlayers.json");
        fs.writeFileSync(filePath, JSON.stringify(registeredPlayers));

    }}