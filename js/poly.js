//number of minimum and maximum color stops (color changes in the gradient)
var MAX_STOPS = 5;
var MIN_STOPS = 2;
//number of actual stops
var numStops = generateWholeNum(MIN_STOPS, MAX_STOPS);
//number of triangle points
var numTrianglePoints = generateWholeNum(30,90);

var trianglePoints = [];

var canvas = document.getElementById("polyCanvas");
var ctx = canvas.getContext("2d");
var gradient = ctx.createLinearGradient(0,0,170,0);

//generates a random whole number between min and max
function generateWholeNum(min, max){
	return Math.floor((Math.random() * max) + min);
}

//averages the three points of a triangle to find the center XY coordinate
function getTriangleCenter(p1,p2,p3){
	var centerX = (p1[0],p2[0],p3[0])/3;
    var centerY = (p1[1],p2[1],p3[1])/3;
    return [centerX, centerY];
}

//generate a random hex color
function generateColor(){
    var color = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
    console.log(color);
    return color;
}

function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}

//get hex value of a pixel at X,Y using canvas context
function getPixel(x, y){
    var p = ctx.getImageData(x, y, 1, 1).data; 
    var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);  
    return hex;
}

//add color stops to canvas
for(var i=0; i<numStops; i++){
    gradient.addColorStop(Math.random(), generateColor());
}

ctx.fillStyle=gradient;
ctx.fillRect(0,0,500,500);

//randomly place points on the canvas
for(var i=0; i< numTrianglePoints; i++){
	var x = generateWholeNum(0,500);
	var y = generateWholeNum(0,500);
    trianglePoints.push([x,y]);
	ctx.rect(x,y,1,1);
    ctx.fillStyle="black";
	ctx.fill();
}

//begin triangulation process
var triangleVertices = Delaunay.triangulate(trianglePoints);

//use delaunay triangulation to determine the points of each triangle using the points placed on the canvas
for(var i=0; i < triangleVertices.length - triangleVertices.length % 3; i += 3){
    var point1 = trianglePoints[triangleVertices[i]];
    var point2 = trianglePoints[triangleVertices[i+1]];
    var point3 = trianglePoints[triangleVertices[i+2]];

    //draw lines corresponding to the triangle
    //line 1  
    ctx.strokeStyle = "rgba(255,255,255,1)";
    ctx.beginPath();
    ctx.moveTo(point1[0], point1[1]);
    ctx.lineTo(point2[0],point2[1]);
    //line 2
    ctx.lineTo(point3[0],point3[1]);
    //line 3
    ctx.lineTo(point1[0],point1[1]);
    //draw line
    ctx.stroke();
    //color the triangle based on color value in the center of the shape
    var triangleCenter = getTriangleCenter(point1,point2,point3);
    var color = getPixel(triangleCenter[0], triangleCenter[1]);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
}