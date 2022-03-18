module.exports = {
    name: "drawValueMarkers",
    description: "Uses js.canvas to draw lines and information pertaining to a graph-image (called by the getGraphImage function)",
execute(client, canvas, focusDimentions, frameWidth, maxValue, dataArray){
    
    const context        = canvas.getContext("2d");
    const markerAmount   = 10;
    const increment      = maxValue / markerAmount;
    const textSize       = (canvas.width / 100);
    const yShift         = focusDimentions.height / markerAmount;
    const xShift         = focusDimentions.width / markerAmount;
    const height         = focusDimentions.height - (frameWidth * 2);
    const lastValue      = dataArray[dataArray.length - 1].value;
    const lastGrHeight   = (height * (lastValue / maxValue));
    const finalGraphYpos = ((focusDimentions.yPos - lastGrHeight)+ height) //- (textSize / 2);
    const startTime      = dataArray[0].time;
    const endTime        = dataArray[dataArray.length - 1].time;
    const timeSpan       = endTime - startTime;
    const timeShift      = timeSpan / markerAmount;

    

    let value = 0;
    let xPos  = focusDimentions.xPos - textSize;
    let yPos  = (focusDimentions.yPos + focusDimentions.height) + (textSize /2);
    
    
    context.fillStyle = "#d9ffef";
    context.textAlign = "right";
    context.lineWidth   = 1;
    context.font = "lighter " + textSize + "px Arial";

    //write numbers from bottom to top within the range between min (0) and maxValue
    for(let i = 0; i <= markerAmount; i++){

        
        context.fillText(Math.round(value), xPos, yPos);
        yPos = yPos - yShift;

        value = (value +increment);
    };

    
    //Write the value for the last graph
    context.font = "Bold " + (textSize * 1.25) + "px Arial";
    xPos  = (focusDimentions.xPos + focusDimentions.width) + (textSize * 4);
    context.fillText("______" + Math.round(lastValue), xPos, finalGraphYpos  - (textSize / 2.5));

    xPos                = focusDimentions.xPos;
    yPos                = (focusDimentions.yPos + focusDimentions.height) + (textSize*4);
    let dTime           = startTime;
    context.font        = "lighter " + textSize + "px Arial";
    context.textAlign   = "center";
    context.strokeStyle = "#d9faebb7";
    context.lineWidth   = 0.5;

    // context.rotate(45 * Math.PI / 180);
    for(let i = 0; i <= markerAmount; i++){

        let timeObject = new Date(Math.round(dTime));
        const dateArr = client.functions.get("msToTime").execute(timeObject);
        let timeText = dateArr[3] + ":" + dateArr[4];

        //Draw a line to the timeStamp
        context.fillText(timeText, xPos, yPos);
        context.beginPath();
        context.moveTo(xPos,focusDimentions.yPos);
        context.lineTo(xPos,(yPos - textSize));
        context.stroke();

        xPos = xPos +xShift;
        dTime = dTime +(timeShift /* * 3*/);
    };

    

}}