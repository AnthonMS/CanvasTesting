var canvas, ctx, innerWidth, innerHeight;

window.onload = function () {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    innerWidth = window.innerWidth;
    innerHeight = window.innerHeight;
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    drawOnCanvas();
};

function drawOnCanvas(){
    ctx.fillStyle = "blue";
    ctx.fillRect(100, 100, 100, 100); // startX, startY, width, height
    ctx.fillStyle = 'rgba(255, 0, 0, 0.5)'; // color and opacity
    ctx.fillRect(400, 100, 100, 100);

    drawLine();
    drawCircle();
}

function drawLine() {
    ctx.beginPath(); // This indicates it's a new path it is starting on
    ctx.moveTo(50, 300); // This makes it start at x, y position on canvas
    ctx.lineTo(300, 100); // This makes a line from start pos. to this x, y pos.
    ctx.lineTo(400, 400);
    ctx.strokeStyle = "#fa34a3"; // This indicates which color the stroke is gonna be.
    ctx.stroke(); // this actually draws it on the canvas.
}

function drawCircle() {
    ctx.beginPath(); // New path to start on, so we indicate this by calling beginPath
    ctx.arc(300, 300, 30, 0, Math.PI * 2, false); // startX, startY, radius, startAngle, endAngle pi*2=fullCircle
    ctx.strokeStyle = 'blue';
    ctx.stroke();

    // Draw 10 circles with random positions inside the canvas
    for (var i = 0; i < 10; i++)
    {
        var x = Math.random() * innerWidth; // random returns any number between 0 and 1 (ex. 0.3, 0.7) 0.7 * 1000 = 700 = x
        var y = Math.random() * innerHeight;
        ctx.beginPath();
        ctx.arc(x, y, 30, 0, Math.PI * 2, false);
        ctx.strokeStyle = 'blue';
        ctx.stroke();
    }

}