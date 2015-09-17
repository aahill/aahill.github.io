//number of minimum and maximum color stops (color changes in the gradient)
var MAX_STOPS = 4;
var MIN_STOPS = 2;
//number of actual stops
var numStops = generateWholeNum(MIN_STOPS, MAX_STOPS);
//number of triangle points
var numTrianglePoints = generateWholeNum(15,33);

var trianglePoints = [];

var canvas = document.getElementById("polyCanvas");
var ctx = canvas.getContext("2d");
var gradient = ctx.createLinearGradient(0,0,170,0);

function generateWholeNum(min, max){
	return Math.floor((Math.random() * max) + min);
}

//generate a random hex color
function generateColor(){
    var color ='#'+Math.floor(Math.random()*16777215).toString(16);
    console.log(color);
    return color;
}

for(var i=0; i<numStops; i++){
    gradient.addColorStop(Math.random(), generateColor());
}

ctx.fillStyle=gradient;
ctx.fillRect(0,0,300,300);

//randomly place points on the canvas
for(var i=0; i< numTrianglePoints; i++){
	var x = generateWholeNum(0,300);
	var y = generateWholeNum(0,300);
    trianglePoints.push([x,y]);
	ctx.rect(x,y,1,1);
    ctx.fillStyle="black";
	ctx.fill();
}

//begin triangulation process
var triangleVertices = Delaunay.triangulate(trianglePoints);

for(var i=0; i < triangleVertices.length - triangleVertices.length % 3; i += 2){
    var vertRef = triangleVertices[i];
    var point1 = trianglePoints[vertRef];
    var point2 = trianglePoints[vertRef+1];
    var point3 = trianglePoints[vertRef+2];
    //line 1
    ctx.beginPath();
    ctx.moveTo(point1[0], point1[1]);
    ctx.lineTo(point2[0],point2[1]);
    ctx.stroke();
    //line 2
    ctx.beginPath();
    ctx.moveTo(point2[0], point2[1]);
    ctx.lineTo(point3[0],point3[1]);
    ctx.stroke();
    //line 3
    ctx.beginPath();
    ctx.moveTo(point3[0], point3[1]);
    ctx.lineTo(point1[0],point1[1]);
    ctx.stroke();
}