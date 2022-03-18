module.exports = {
    name: "drawGraphArray",
    description: "Uses js.canvas to draw a series of graphs based on an object-array (called by the GetGraphImage function)",
execute(client, canvas, dataArray, maxValue, focusDimentions){
    
    const frameWidth        = (canvas.getContext("2d")).lineWidth;

    const avgGraphWidth     = ((focusDimentions.width - (frameWidth * 2)) / (dataArray.length * 2));
    const lastGraphSpace    = avgGraphWidth / dataArray.length;
    const iterations        = dataArray.length - 1;
    const totalTimeSpan     = dataArray[iterations].time - dataArray[0].time; 
    const avgTimespan       = Math.round(totalTimeSpan / dataArray.length);
    
    
    let pos          = focusDimentions.xPos + frameWidth *2;
    let graphYpos    = focusDimentions.yPos;
    let previousGraphWidth = avgGraphWidth;
    let color        = '#92ec497e';
    let darkColor    = false;



    for(let i = 0; i < dataArray.length; i++)
    {
        let currentValue    = dataArray[i].value;
        let graphPrcnt      = currentValue / maxValue;
        let dataTime        = dataArray[i].time;
        let timeSpan        = avgTimespan;
        
        if(darkColor){darkColor = false; color = '#92ec497e'}
        else         {darkColor = true;  color = '#77c5387e'};

        if(i < iterations)
        {timeSpan = dataArray[i + 1].time - dataTime};
        let graphWidth = (avgGraphWidth * (timeSpan / avgTimespan)) - lastGraphSpace; 

        if(i == iterations){
            graphWidth = avgGraphWidth; 
            color           = '#9dff4db7';
        }
        if(currentValue < 1){color = '#ff3c00d5'}
        if(graphWidth > (avgGraphWidth * 6)){color = '#0066ff10'}

        client.functions.get("drawGraph")
          .execute(  
                    canvas, 
                    graphPrcnt,
                    graphWidth, 
                    pos,
                    focusDimentions,
                    color,
                    frameWidth);
            const relation = graphWidth / previousGraphWidth;
            pos = pos + ((previousGraphWidth * 2)*relation);

            previousGraphWidth = graphWidth;
           
    };
}}