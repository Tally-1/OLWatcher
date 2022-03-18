module.exports = {
    name: "getGraphImage",
    description: "Uses js.canvas to draw a .png image of a series of graphs based on an object-array containing time and value for each graph",
async execute(client, dataArray, maxValue, fileName){
    const startTime = new Date();
    const width       = 1200;
    const height      = 600;
    const margin      = 0.1;
    const frameWidth  = width * 0.0025;
    const focusXpos   = (width  *margin);
    const focusYpos   = (height *margin);
    const focusWidth  = (width  *(1 - (margin * 1.5))) - frameWidth;
    const focusHeight = (height *(1 - (margin * 2))) - frameWidth;
    const Canvas      = require('canvas');
    const fs          = require("fs"); 
    
    const focusDimentions = {xPos: focusXpos,
                            yPos: focusYpos,
                            width: focusWidth,
                            height: focusHeight};
                            
    const canvas = Canvas.createCanvas(width, height);
    const context = canvas.getContext('2d');

    // Set the color of the stroke
    context.strokeStyle = '#ffa600';
    context.lineWidth       = frameWidth;

    // Draw a rectangle in the center of the canvas.
    context.strokeRect( focusXpos,         /*The x-coordinate of the upper-left corner of the rectangle */
                        focusYpos,        /*The y-coordinate of the upper-left corner of the rectangle */
                        focusWidth,      /*width of rectangle  */
                        focusHeight     /*height of rectangle */
                       );
    
    client.functions.get("drawGraphArray").execute(client, canvas, dataArray, maxValue, focusDimentions);
    client.functions.get("drawValueMarkers").execute(client, canvas, focusDimentions, frameWidth, maxValue, dataArray);
    ;
    
    /*create a .png file containing graphs representing playercount */
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync('./images/' + fileName, buffer);

    /*post said image to a channel defined on the client-object in app.js*/
    const cha = await client.channels.fetch(client.imgChannel)
    const { MessageAttachment } = require('discord.js');
    const attachment = new MessageAttachment(canvas.toBuffer(), fileName);
    const msg = await cha.send({ files: [attachment] });
    const id = "" + msg.id + "";

    /*store url of posted image so that it may be used for a dynamic embed */
    client.ImgUrl = await msg.attachments.at(0).url;
    console.log(client.ImgUrl);

    client.previousGraphMsg = client.currentGraphMsg;
    client.currentGraphMsg  = msg;
    
    const previousMsg = client.previousGraphMsg;
    /*delete image from channel to keep it clean. */
    if(!(previousMsg == undefined))
        {try{
                /*Due to some issues with the message being undefined I implemented this workAround, that doesnt seem to work.... */
                previousMsg.channel.messages.fetch(previousMsg.id)
                .then(function(message){
                    if((!(message == undefined))
                    &&(message.deletable)){
                        message.delete();
                    };
                    
                })
                
                
            
        }
        catch(error){

        }};

    

    return './images/' + fileName;
}}