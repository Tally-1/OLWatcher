module.exports = {
    name: "setGlobalVarValue",
    description: "sets the value for a variable found in the object in the globalVariables.json file",
execute(varName, value){
    const path          = require("path");
    const fs            = require("fs");
    const filePath      = path.join(__dirname, "data", "temp", "globalVariables.json");
    const allVariables  = JSON.parse(fs.readFileSync(filePath));

    if      (varName == "watcherBusy")  {allVariables.watcherBusy = value}
    else if (varName == "dafuqIsThis")  {allVariables.dafuqIsThis = value}
    else                                {console.log("global variable: '"+varName+"' not found...")};
    

    fs.writeFileSync(filePath, JSON.stringify(allVariables));
    return allVariables;
}}