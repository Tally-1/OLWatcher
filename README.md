# OLWatcher
A Discord-bot watching Olympus server 1

----------------------------------------------------------------------------------------------------------------------------------------------------------

SETUP:

1 go to the config.json file and enter the correct values:

    {
    
    "prefix":"!", 
    "token":"INSERT TOKEN HERE",
    "owner":"1234567890", 
    "imgChannel":"1234567890",
    "port":3211,
    "iconURL": "https://avatars.akamai.steamstatic.com/3d14747b33b49b80a3d471d1ca8255dcf280c1f5_full.jpg",
    "botLink": "https://discord.com/api/oauth2/authorize?client_id=923548666717941811&permissions=311385238528&scope=bot"
    
    }

**prefix:**     the characters you want to have to initiate a command
token:      the tokem you retrieve at https://discord.com/developers/applications/
owner:      your discord-id (right-click on your avatar and choose "copy id").
imgChannel: A channel-id, this channel will be used to post the image of the graph that is used in the status-embed (right-click on a channel and copy its id)
port:       choose any port, the default will work unless you already have a node.js server running on it (currently only there with the purpose of hindering multiple 
             instances of the bot running at the same time. (You may shut down the bot using the command !shutdown).
iconURL:    URL adress to a image you wish the bot to use in its embeds
botLink     link to your bot.

----------------------------------------------------------------------------------------------------------------------------------------------------------

DATABASE MANAGEMENT:

The bot will automatically scrape all current players found on battlemetrics and store them in the playerDB.json file.
Each player is given a unique id, based on the battlemetrics web-page.
If a player changes his name, his previous name will be stored in the names array on the player-object.

example of player-object:

    {
    
    "id": 118938327,
    "names": ["[Medic] Sir Valentine"],
    "currentName": "[Medic] Sir Valentine",
    "steamId": [],
    "steamIdReviewed": false
    
    }


To back up your player-dataBase use the command !getPlayerDB. (a .json file will be dm'd to you).
To send files to the bot use the command !FileUpdate. And attach the file you wish to send.

If you send a file called "playerDB.json" then that will overwrite your current database.

If you send a file called "nameId.json" then that will overwrite your current name-steamId list, 
this will also sync the steamIds you sent to players with matching names. (!Warning! this is a heavy command if you are running the bot on a cell-phone).

--------------------------------------------------------------------------------------------------------------------------------------------------------------

MATCHING STEAM ID'S TO PLAYERS:

After finishing a relaxing session of quarreling with squeakers, trannies and drug-addicts on Olympus, go to your steam page (using a web-browser), and 
choose "recently played with". There you will find a list of all the players that were on the same server as you.
Copy their steam-id from the URL or use the developer tools.

once you have a list of steam-ids, log in to the olympus stats page, and check them one by one copying each name.

finally, make an array looking something like this:



    [
        ["76561198093436130", "Justi"],
        ["76561198079661896", "iPod 6SiXS6XSiX6"],
        ["76561198075431692", "dpi* X"],
        ["76561198272038173", "DWSHADOW"],
        ["76561198992458705", "Need Help?"]
    ]




store that array into a file called "nameId.json". 

Send that file to the bot using the command: !FileUpdate      (do not forget to attach the file to the message).

And the bot will match the id's to players with those names. (there will be some errors here so some manual review is needed)

---------------------------------------------------------------------------------------------------------------------------------------------

USER COMMANDS:



    !Link:                sends a link to the bot.
    !PlayerCount:         Returns the amount of players online at the moment.
    !PlayerCountLive:     Returns the amount of players online and updates the message.
    !Status:              Sends a embed containing a list of players that joined, and left including whatever data could be found on said players.
    !StatusLive:          Same embed as above, but it updates itself every 2-10 minutes depending on how many players are online.
    !Search <playername>: Searches the database for matching names (currently you need to be exact when searching, missing a letter might in some cases cause the bot to not find the requested entry).
    
   

-----------------------------------------------------------------------------------------------------------------------------------------------
 
 ADMIN COMMANDS:


    !GetPlayerDB:    Sends a DM containing the playerDB.json file
    !FileUpdate:     Takes whatever .json file you sent and stores it, in the case of files named "nameId.json" it will also link all steam-ids inside it to your player-db.
    !Restart:        Shuts down the bot and starts it as a background-process.
    !ShutDown:       Shuts down the bot (useful if it is running in the background).
    !Crash:          Crashes the bot (currently disabeled, used to test crash-events).
    !Ping:           Responds with Pong (quick way of testing if the bot is running).
    

------------------------------------------------------------------------------------------------------------------------------------------------

OTHER NOTES:

If the bot crashes, it will restart as a back-ground process, So if you see that the shell is not running, send a command (like !ping) to the bot to make sure the bot
Is actually down, if it is still running in the background send the !shutdown command to take it down. (or leave it as is if you do not mind not seeing the console).













