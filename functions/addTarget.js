module.exports = {
    name: "addTarget",
    description: "Adds a player from to a list tied to the user requesting it, future implementation live-monitoring, and notifications",
    execute(searchResultMessage, userMessage, args, targetList, client){
        const   fs = require("fs");
        const   path = require("path");
        const   numbers = "0123456789".split("");
        const   filePath = path.join(__dirname, "functions", "data", "userDB.json");
        const   allUsers = JSON.parse(fs.readFileSync(filePath));
        let     userId = userMessage.author.id;
        let     UserObject = "";
        let     targetSelector   = "";
        let     argIsNumeric = true;
        let     target = "";
        let     replyMessage = "";
    
        console.log(args);
    
        /*This block checks the text after the command(if there is any)(reffered to as args) and verifies that it contains numbers only*/
        if(!(args[0] == undefined)){for(let i = 0; i < args[0].length; i++){
            let letter = args[0][i];
            if(numbers.indexOf(letter) == -1){argIsNumeric = false};
        }}
        else{argIsNumeric = false};
    
        if(argIsNumeric){targetSelector = (+args[0]) -1};
    
        // find the correct user in order to assign the desired target
        for(let user of allUsers){if(user.Object.id === userId){UserObject = user}};
        
        if(targetList.length == 0){}
        else
        if(targetList.length == 1){target = targetList[0]}
        else 
        if(targetList.length > 1){
    
            if(argIsNumeric){target = targetList[targetSelector]}
            else{target = targetList[0]};
    
        }
    
        if(!(target === "")){
            console.log(target);
            if(UserObject.targets.indexOf(target) == -1){
                UserObject.targets.push(target);
                replyMessage = target.currentName + " has been added to your target-list!";
            }
            else{
                replyMessage = target.currentName + " is already in your target-list";
            };
        }
        else{
            replyMessage = "Could not add the target to your list. Please try again, or contact the developer and send a bug-report";
        }
    
    
      fs.writeFileSync(filePath, JSON.stringify(allUsers));
      client.functions.get("asyncReply").execute(client, userMessage, replyMessage);
    
    }}