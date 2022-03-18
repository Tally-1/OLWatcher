module.exports = {
    name: "trimAndCleanString",
    description: "Retrieves players based on Name or Steam-id",
    execute(string){
        string = string.toLowerCase();
        let newString = [];
        
    
        const removeArr = " .,;:<>'!#¤%&/()=@£${[]}-_¨^~|".split("");
        removeArr.push("\@", '"');
        
    
        for(let i = 0; i < string.length; i++)
        {
            letter = string.substring(i, i + 1);
    
            if(removeArr.indexOf(letter) === -1)
            {
                newString.push(letter)
            }
            
        }
        newString = newString.join("");
        return newString;
    }}