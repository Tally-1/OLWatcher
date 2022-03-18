module.exports = {
    name: "reportError",
    description: "Stores error-message in DB",
    execute(error) {
        const   fs = require("fs");
                    const   path = require("path");
        
            const   filePath = path.join(__dirname, "data", "errorMessages.json");
            const   filedata = fs.readFileSync(filePath);
            const   errorMSGs   = JSON.parse(filedata);
            errorMSGs.push(error);
            fs.writeFileSync(filePath, JSON.stringify(errorMSGs));
    }};