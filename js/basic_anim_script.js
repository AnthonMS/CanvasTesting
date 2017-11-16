var canvas, ctx, innerWidth, innerHeight;
var circleX, circleY, circleRadius, circleSpeedX, circleSpeedY;

window.onload = function () {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    innerWidth = window.innerWidth;
    innerHeight = window.innerHeight;
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    circleX = Math.random() * innerWidth;
    circleY = Math.random() * innerHeight;
    circleRadius = 50;
    circleSpeedX = 7;
    circleSpeedY = 7;

    drawOnCanvas();
    animate();
};

function drawOnCanvas(){
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    ctx.beginPath();
    ctx.arc(circleX, circleY, circleRadius, 0, Math.PI * 2, false);
    ctx.strokeStyle = 'blue';
    ctx.stroke();

}

function animate() {
    setInterval(function () {
        //console.log("testing");
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        ctx.beginPath();
        ctx.arc(circleX, circleY, circleRadius, 0, Math.PI * 2, false);
        ctx.strokeStyle = 'blue';
        ctx.stroke();

        moveCircleX();
        moveCircleY();
        //circleX += circleSpeedX;

    }, 1000/50); // 50 frames per second
}

function moveCircleX() {
    if (circleX + circleRadius > innerWidth) { // It is too far right if true
        // We want to make it move the oppisit direction
        circleSpeedX = -circleSpeedX;
    } else if (circleX - circleRadius < 0) { // It is too far left if true
        circleSpeedX = -circleSpeedX;
    }

    circleX += circleSpeedX;
}

function moveCircleY() {
    if (circleY + circleRadius > innerHeight || // It is too far down if True
        circleY - circleRadius < 0){ // It is too far up if True
        circleSpeedY = -circleSpeedY; // We do the same thing as in moveCircleX, but in one if-statement.
    }
    circleY += circleSpeedY;
}