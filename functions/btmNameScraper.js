module.exports = {
    name: "btmNameScraper",
    description: "returns playername from a html-scrape of the battlemetrics web-site",
    execute(string){
        for(let i = 0; i < string.length; i++)
    {
        let letter = string.substring(i, i + 1);
        if (letter == ">"){
            returnString = string.substring(i + 1, 
                                            i + (string.length - i));
        };
    }

    return returnString;
    }}