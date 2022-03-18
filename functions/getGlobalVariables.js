module.exports = {
    name: "getGlobalVariables",
    description: "returns an object containing variable-names and values",
execute(){
    const path          = require("path");
    const fs            = require("fs");
    let   filePath      = path.join(__dirname, "data", "temp", "globalVariables.json");
    let   filedata      = fs.readFileSync(filePath);
    let   allVariables  = JSON.parse(filedata);
   
    return allVariables;
}}