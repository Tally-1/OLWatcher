module.exports = {
    name: "drawGraph",
    description: "Uses js.canvas to draw a singular graph. (called by the drawGraphArray function)",
execute( 
    canvas, 
    graphPrcnt, 
    graphWidth, 
    pos, 
    focusDimentions,
    color,
    frameWidth){

const width         = focusDimentions.width;
const height        = focusDimentions.height - (frameWidth * 2); 
let graphHeight     = (height * graphPrcnt);
const frameRelation = ( height / focusDimentions.height);
let graphYstart     = (focusDimentions.yPos - graphHeight) + height;

let finalGraphHeight = graphHeight * frameRelation;
graphYstart = graphYstart + (graphHeight - finalGraphHeight)
const context   = canvas.getContext('2d');

context.strokeStyle     = color;
context.lineWidth       = graphWidth;
context.strokeRect( pos, 
graphYstart, 
graphWidth, 
finalGraphHeight
);
}}