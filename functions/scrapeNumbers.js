module.exports = {
    name: "scrapeNumbers",
    description: "extracts numbers from a string",
    execute(string, decimals){
        
    let numbers = "1234567890.".split("");

    if (!decimals){
        numbers = "1234567890".split("");
    }

    let stringNumbers = [];
    
    for(let i = 0; i < string.length; i++)
    {
        let letter = string.substring(i, i + 1);
        if (numbers.indexOf(letter) > -1){
            stringNumbers.push(letter)
        };
    }


    stringNumbers = stringNumbers.join("");
    return +stringNumbers;
    
    }};