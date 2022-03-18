module.exports = {
    name: "elmentContentScraper",
    description: "returns the content of a html-element including sub-elements, returnData is in a array each array-item contains 1 occurence of the searched element",
    async execute(document, searchedElement){


        let searchSize = searchedElement.length;
    
        let endSearchElement = (searchedElement.substring(0,1) + 
                                "/" +
                                searchedElement.substring(1,searchSize));
        returnArr = [];
        let startPoint = 0;
        
        
    
        
        for(let i = 0; i < document.length; i++)
        {
            let startTag    = document.substring(i, i + searchSize);
            let endTag      = document.substring(i, i + (searchSize + 1));
            
            if (startTag == searchedElement){startPoint = i + searchSize};
            if (endTag == endSearchElement){
                
                returnArr.push(document.substring(startPoint, i));
                
            };
    
    
        }
        return returnArr;

    }}