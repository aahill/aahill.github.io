app.controller('polyController', ['$scope', function($scope){
    //number of minimum and maximum color stops (color changes in the gradient)
    $scope.maxStops = 5;
    $scope.minStops = 2;

    $scope.createNewPoly = function(){
        //number of actual stops
        var numStops = generateWholeNum($scope.minStops, $scope.maxStops);
        //number of triangle points
        var numTrianglePoints = generateWholeNum(30,90);
        var trianglePoints = [];

        var canvas = document.getElementById("polyCanvas");
        var ctx = canvas.getContext("2d");
        erase(ctx, canvas);
        var gradient = ctx.createLinearGradient(0,0,170,0);
        //add color stops to canvas
        for(var i=0; i<numStops; i++){
            gradient.addColorStop(Math.random(), generateColor());
        }
        ctx.fillStyle=gradient;
        ctx.fillRect(0,0,canvas.width,canvas.height);
        //randomly place points on the canvas
        addPoints(ctx, trianglePoints, numTrianglePoints, canvas.height, canvas.width);
        //begin triangulation process
        var triangleVertices = Delaunay.triangulate(trianglePoints);
        drawTriangles(ctx, trianglePoints, triangleVertices);
    }

    //erase the canvas
    function erase(ctx, canvas){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

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
        return color;
    }

    function rgbToHex(r, g, b) {
        if (r > 255 || g > 255 || b > 255)
            throw "Invalid color component";
        return ((r << 16) | (g << 8) | b).toString(16);
    }

    //get hex value of a pixel at X,Y using canvas context
    function getPixel(x, y, ctx){
        var p = ctx.getImageData(x, y, 1, 1).data; 
        //darken the colors by a random constant
        darken_factor = Math.random() * (.4 - .001) + .001;
        var r = p[0] * (1 - darken_factor);
        var g = p[1] * (1 - darken_factor);
        var b = p[2] * (1 - darken_factor);
        var hex = "#" + ("000000" + rgbToHex(r, g, b)).slice(-6);  
        return hex;
    }

    //randomly place points on the canvas
    function addPoints(ctx, trianglePoints, numTrianglePoints, canvasHeight, canvasWidth){ 
        for(var i=0; i< numTrianglePoints; i++){
        	var x = generateWholeNum(0,canvasWidth);
        	var y = generateWholeNum(0,canvasHeight);
            trianglePoints.push([x,y]);
        	ctx.rect(x,y,1,1);
            ctx.fillStyle="black";
        	ctx.fill();
        }
    }


    function drawTriangles(ctx, trianglePoints, triangleVertices){
        //use delaunay triangulation to determine the points of each triangle using the points placed on the canvas
        for(var i=0; i < triangleVertices.length - triangleVertices.length % 3; i += 3){
            var point1 = trianglePoints[triangleVertices[i]];
            var point2 = trianglePoints[triangleVertices[i+1]];
            var point3 = trianglePoints[triangleVertices[i+2]];

            //draw lines corresponding to the triangle
            //line 1  
            ctx.beginPath();
            ctx.strokeStyle = "rgba(255,255,255,0)";           
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
            var color = getPixel(triangleCenter[0], triangleCenter[1], ctx);
            
            ctx.fillStyle = color;
            ctx.fill();
            ctx.closePath();
        }
    }
}]);