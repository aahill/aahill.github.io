var canvas = document.getElementById("polyCanvas");
var ctx = canvas.getContext("2d");

var gradient = ctx.createLinearGradient(0,0,170,0);
gradient.addColorStop(0, "black");
gradient.addColorStop(1, "white");
ctx.fillStyle=gradient;
ctx.fillRect(20,20,150,100);