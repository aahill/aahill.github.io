//number of minimum and maximum color stops (color changes in the gradient)
var MAX_STOPS = 4;
var MIN_STOPS = 2;
//number of actual stops
var numStops = generateWholeNum(MIN_STOPS, MAX_STOPS);
//number of triangle points
var numTrianglePoints = generateWholeNum(20,40);


var trianglePoints = [];

var canvas = document.getElementById("polyCanvas");
var ctx = canvas.getContext("2d");
var gradient = ctx.createLinearGradient(0,0,170,0);

function generateWholeNum(min, max){
	Math.floor((Math.random() * max) + min);
}

//generate a random hex color
function generateColor(){
    var color ='#'+Math.floor(Math.random()*16777215).toString(16);
    console.log(color);
    return color;
}

for(var i=0; i<MAX_STOPS; i++){
    gradient.addColorStop(Math.random(), generateColor());
}

//randomly place points on the canvas
for(var i=0; i< numTrianglePointsPoints; i++){
	var x = generateWholeNum(0,300);
	var y = generateWholeNum(0,300);
	ctx.fillRect(x,y,1,1);
}

ctx.fillStyle=gradient;
ctx.fillRect(0,0,300,300);