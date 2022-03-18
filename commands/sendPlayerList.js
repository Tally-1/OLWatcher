module.exports = {
    name: "playerList",
    description: "Replies to the command-message with a list of players currently online.",
    execute(root, message, client){
    
    const   fs = require("fs");
    const   path = require("path");

    let   filePath = path.join(root, "functions", "data", "currentPlayers.json");
    let   filedata = fs.readFileSync(filePath);
    
    const currentPlayers   = JSON.parse(filedata);

    let messages = 1;
    let maxCharacters = 1720;

    let replyMessage    = "Players currently on Olympus: \n\n"
    let secondReply     = "";
    let thirdReply      = "";
    let fourthReply     = "";
    let replies         = [];
    

    for(let player of currentPlayers){

    let playerInfoBlock = client.functions.get("getUserInfo").execute(player);

    if(replyMessage.length < maxCharacters){
        replyMessage = replyMessage + playerInfoBlock;
        }

    /*if the information cannot fit in one  message */
    else if(secondReply.length < maxCharacters){
        
        messages = 2;
        secondReply = secondReply + playerInfoBlock;
    }
    else if(thirdReply.length < maxCharacters){
        
        messages = 3;
        thirdReply = thirdReply + playerInfoBlock;
    }

    else if(fourthReply.length < maxCharacters){
        
        messages = 4;
        fourthReply = fourthReply + playerInfoBlock;
    } 
    }
    

    replyMessage    = replyMessage + "\n";
    secondReply     = secondReply + "\n";
    let willContinue= "\nlist continues in next message...\n"
    let endMessage  = "\n" + currentPlayers.length +" Players on Olympus right now...\n"
    


    if(messages === 1){ replyMessage = replyMessage + endMessage;
                        replies.push(replyMessage)}
    
    if(messages === 2){ replyMessage = replyMessage + willContinue;
                        secondReply = secondReply + endMessage
                        replies.push(replyMessage)
                        replies.push(secondReply)}
    
    if(messages === 3){ replyMessage = replyMessage + willContinue;
                        secondReply = secondReply + willContinue;
                        thirdReply = thirdReply + endMessage
                        replies.push(replyMessage)
                        replies.push(secondReply)
                        replies.push(thirdReply)}
    
    if(messages === 4){ replyMessage = replyMessage + willContinue;
                        secondReply = secondReply + willContinue;
                        thirdReply = thirdReply + willContinue;
                        fourthReply = fourthReply + endMessage;

                        replies.push(replyMessage)
                        replies.push(secondReply)
                        replies.push(thirdReply)
                        replies.push(fourthReply)}
            
                   
   
let charachtersUsed = 0;
for(let reply of replies){
    client.functions.get("asyncReply").execute(client, message, reply);
    charachtersUsed = charachtersUsed + reply.length;
}

let status =    " Bot has replied with " +replies.length+ " messages, using " 
                        +charachtersUsed+" characters...";

        
        client.functions.get("logUserAction").execute(message, "requested server list", status);    

}}