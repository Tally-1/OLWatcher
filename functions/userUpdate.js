module.exports = {
    name: "userUpdate",
    description: "Creates the object used for each entry in the user database and adds it to the DB.",
    execute(userObject, message) {
        const   fs = require("fs");
        const   path = require("path");

        const   filePath = path.join(__dirname, "data", "userDB.json");
        const   filedata = fs.readFileSync(filePath);
        const   users   = JSON.parse(filedata);
        const   userIDs = [];
        const   interActed = (message.author == userObject);

        for (let user of users){
            userIDs.push(user.Object.id)
        }
        const userIndex = userIDs.indexOf(userObject.id);

        let lastInterAction = -1;
        let timesContacted = 0;

        if(userIndex === -1){
        
        if(interActed){
                        lastInterAction = Date.now();
                        timesContacted = 1};

        const newUser = {Object: userObject,
                       lastChannel: message.channelId,
                       channelsUsed:[message.channelId],
                       serversUsed: [message.guildId],
                       lastInterAction: lastInterAction,
                       timesContacted: timesContacted,
                       liveFeedRoute: -1,
                       errorMessageSendt: false,
                       targets: []
                    };
        
        users.push(newUser);
                }
        else{
            const user = users[userIndex];
            if(interActed){
                    user.lastInterAction = Date.now();
                    user.timesContacted = (user.timesContacted + 1)
                };

            if(user.channelsUsed.indexOf(message.channelId) === -1){
                    user.channelsUsed.push(message.channelId)
                }
            if(user.serversUsed.indexOf(message.guildId) === -1){
                    user.serversUsed.push(message.guildId)
                }
            if(user.targets == undefined){
                user.targets = [];
            }
        }

        fs.writeFileSync(filePath, JSON.stringify(users));
}}