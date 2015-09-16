var MAX_STOPS = 4;
var MIN_STOPS = 2;

var numStops = Math.floor(MAX_STOPS + (1+MIN_STOPS-MAX_STOPS)*Math.random());
var canvas = document.getElementById("polyCanvas");
var ctx = canvas.getContext("2d");
var gradient = ctx.createLinearGradient(0,0,170,0);

function generateColor(){
    var color ='#'+Math.floor(Math.random()*16777215).toString(16);
    console.log(color);
    return color;
}

for(var i=0; i<MAX_STOPS; i++){
    gradient.addColorStop(Math.random(), generateColor());
}

ctx.fillStyle=gradient;
ctx.fillRect(0,0,300,300);