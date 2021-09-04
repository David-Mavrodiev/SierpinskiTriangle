var requestAnimationFrame = window.requestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback) { setTimeout (callback, 1000 / 30); };

var canvas = document.getElementById("canvas-id");
const size = screen.width > screen.height 
    ? screen.height
    : screen.width;

canvas.width = canvas.height = size;
var context = canvas.getContext("2d");

// The triangle points
let A, B, C;

A = new Object();
A.x = size / 2;
A.y = size / 4;

B = new Object();
B.x = size / 4;
B.y = size / 2 + A.y;

C = new Object();
C.x = size / 1.25;
C.y = size / 2 + A.y;

// Starting point
const start = new Object();
start.x = A.x;
start.y = A.y + size / 4;

let points = [A, B, C, start];

function update() {
    const last = points[points.length - 1];
    const rand = Math.floor(Math.random() * 3);

    // Choose one of the initial triangle points.
    let chosenPoint;
    if (rand === 0) {
        chosenPoint = A;
    } else if (rand === 1) {
        chosenPoint = B;
    } else if (rand === 2) {
        chosenPoint = C;
    }

    // Get the mid point between the last generated point and one of the starting points A, B, C.
    const halfX = last.x + ((chosenPoint.x - last.x) / 2); 
    const halfY = last.y + ((chosenPoint.y - last.y) / 2);

    let newPoint = new Object();
    newPoint.x = halfX;
    newPoint.y = halfY;
    points.push(newPoint);

    setTimeout(update, 1);
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);      
    context.globalAlpha = 1;

    for (let i = 0; i < points.length; i++) {
        context.fillStyle = "white";
        context.fillRect(points[i].x, points[i].y, 1, 1);
    }

    requestAnimationFrame(draw);        
}

update();      
draw(); 