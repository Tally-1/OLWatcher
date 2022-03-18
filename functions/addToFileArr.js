module.exports = {
    name: "addtofilearr",
    description: "opens a json file with a array inside and adds a element to that array",
    execute(filePath, valueToAdd, unique){
        
    const   fs = require("fs");
    const   filedata = fs.readFileSync(filePath);
    const   fileArr = JSON.parse(filedata);

    if (!unique){
        fileArr.push(valueToAdd);
        fs.writeFileSync(filePath, JSON.stringify(fileArr));
    }
    else {
        
        if(fileArr.indexOf(valueToAdd) === -1 ){
        fileArr.push(valueToAdd);
        fs.writeFileSync(filePath, JSON.stringify(fileArr));
    }}
    }}