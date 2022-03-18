module.exports = {
    name: "getStoredEmbed",
    description: "retrieves a stored message-embed",
    execute(fileName){
        const fs                = require("fs");
        const path              = require("path");
        const filePath          = path.join(__dirname, "data", "embeds", fileName + ".json");
        const filedata          = fs.readFileSync(filePath);
        const embed             = JSON.parse(filedata);

        return embed;
        }}