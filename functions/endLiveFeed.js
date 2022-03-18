module.exports = {
    name: "endLiveFeed",
    description: "removes a live-feed-object from the list, thus stopping said live-feed",
execute(feed) {
    const   fs = require("fs");
    const   path = require("path");
    let   filePath = path.join(__dirname, "data", "liveFeedList.json");
    let   filedata = fs.readFileSync(filePath);
    
    const liveList = JSON.parse(filedata);
    
    liveList.splice(feed.index,1);

    for(object of liveList){
        object.index = (object.index -1);
    };
    fs.writeFileSync(filePath, JSON.stringify(liveList));
}}