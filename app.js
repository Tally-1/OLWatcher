const express = require("express");
const app = express();

const   fs            = require("fs");
const   path          = require("path");
const   console       = require("console");
const   Discord       = require("discord.js");/*added once npm init, and npm install discord.js is done*/
const   client        = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"] });/* declare the client (bot)*/
client. root          = path.join(__dirname);

client.commands     = new Discord.Collection(); //creates a new object on the client
const commandFiles  = fs.readdirSync("./commands").filter(file => file.endsWith(".js")); //creates array of files at "currentDir/commands". Filters out non-js files
client.functions    = new Discord.Collection(); 
const functionFiles = fs.readdirSync("./functions").filter(file => file.endsWith(".js")); 

/*Declaring commands */
for(const file of commandFiles){
    const command = require(`./commands/${file}`); 
    client.commands.set(command.name, command);
};

/*Declaring functions */
for(const file of functionFiles){
    const fnc = require(`./functions/${file}`); 
    client.functions.set(fnc.name, fnc);
};

client.functions.get("initBot").execute(client, "config");



//event-handler on a message
client.on("messageCreate", message =>{
    if (message.author.bot)  {return};
    if (message.content.startsWith(client.prefix)){
        client.commands.get("commandHandler").execute(client, message);
    }});



client.on('interactionCreate', interaction => {
	// console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
    // console.dir(interaction.message)
    //console.log(interaction.customId);
    if (!interaction.isButton()) return;
    
    const message   = interaction.message;
    const buttonId  = interaction.customId;

    if (buttonId.startsWith("deleteMessage_")) {
        try{
            message.delete();
        }
        catch(error){
            console.log(error);
        }
    }
    else if (buttonId.startsWith("refresh")) {
        try{
            
            client.functions.get("refreshSearch").execute(client, interaction);
            
        }
        catch(error){
            console.log(error);
        }
    };

    
});


/*function to run once bot is loaded*/
client.once("ready", () => {

    
    let watcherWorking = false;
    let timeActivated = Date.now();
    console.log("Olympus watcher is online");
    app.listen(client.port);



    
   
setInterval(async function(){   
      
      
      
      if(!watcherWorking)
      {
        
        watcherWorking = true;

        let refreshRate = client.functions.get("getRefreshRate").execute();

        client.functions.get("watcher").execute(client);
        var x = await client.functions.get("sleep").execute("", refreshRate);

        let timeSinceLastRefresh = Math.round((Date.now() - timeActivated) / 1000);
        let refreshMessage       = "Refreshing data. " + timeSinceLastRefresh + " Seconds have passed";
        console.log(refreshMessage);


        timeActivated = Date.now();

        
        
        watcherWorking = false;
    };
    
    if(client.restart){console.log("Restarting olWatcher"); process.exit()};
    if(client.shutDown){console.log("Shutting down olWatcher"); process.exit()};

    }, 1000);
    

});


let     identifiedPlayers = 0;
let     allPlayers    = JSON.parse(fs.readFileSync(path.join(__dirname, "functions", "data", "playerDB.json")));
for(let player of allPlayers){
    if(player.steamId.length == 1){player.steamIdReviewed = true};

    if(player.steamIdReviewed){identifiedPlayers++};
    
};

JSON.stringify(allPlayers);
fs.writeFileSync((path.join(__dirname, "functions", "data", "playerDB.json")), JSON.stringify(allPlayers));


console.log("identified Players: " + identifiedPlayers);

/*load bot */
client.login(client.token);









app.get('/', function (req, res) {
    res.json("The home of Olympus watcher");
  });

//This will start the bot as a background-process if the "reset" command is used or if the bot crashed. (can be removed).
process.on("exit", function () {
    if(!(client.shutDown)){
        
        if((!(client.shutDown))
        &&(!(client.restart))){console.log("Client crashed")};
        
        client.restart = false;
        require("child_process").spawn(process.argv.shift(), process.argv, {
            cwd: process.cwd(),
            detached : true,
            stdio: "inherit"


    })}});