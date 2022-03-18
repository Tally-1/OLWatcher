module.exports = {
    name: "getRefreshRate",
    description: "returns amount of ms to wait pr iteration of main function based on playercount.",
execute() {

const fs = require("fs");
const path = require("path");
const currentPlayers   = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "currentPlayers.json")));

let updateFrequency = 599000;
if(currentPlayers.length < 120 && currentPlayers.length > 60)
{updateFrequency = 299000}
else 
if(currentPlayers.length <= 149 && currentPlayers.length >= 120)
{updateFrequency = 119000}
else 
if(currentPlayers.length > 149)
{updateFrequency = 119000};

// console.log("UpdateFrequency set to " + Math.round(updateFrequency / 60000) + " minutes...");

return updateFrequency;
/*
UpdateFrequency is as follows:
    Less than 60 players it updates every 10 minutes.
    Between 60 and 120 players it updates every 5 minutes.
    between 120 and 149 players it updates every 2 minutes.
    at max pop (150 players) it updates every 1 minute.
*/
}}