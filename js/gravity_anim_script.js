var canvas, ctx, innerWidth, innerHeight;
var platforms = [];
var ballArray = [];
var colorArray = ['blue', 'purple', 'red', 'yellow', 'orange', 'green'];

window.onload = function () {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    innerWidth = window.innerWidth;
    innerHeight = window.innerHeight;
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    for (var i = 0; i < 100; i++)
    {
        var tempCol = Math.floor(Math.random() * colorArray.length);
        var tempdx = randomIntFromRange(-2, 2);
        ballArray.push(new Ball("Ball"+i, 2, tempdx, innerWidth, innerHeight, colorArray[tempCol]));
    }
    console.log(ballArray);

    animate();

};

addEventListener('click', function (event) {
    //console.log(event);
    for (var i = 0; i < ballArray.length; i++)
    {
        ballArray[i].bounceBall(event.clientX, event.clientY);
    }
});

function animate() {
    setInterval(function () {
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        updateBalls();
    }, 1000/50); // 50 frames per second
}

function updateBalls() {
    for (var i = 0; i < ballArray.length; i++)
    {
        ballArray[i].moveBall();
        ctx.beginPath();
        ctx.arc(ballArray[i].x, ballArray[i].y, ballArray[i].radius, 0, Math.PI * 2, false);
        ctx.strokeStyle = 'black';
        ctx.stroke();
        ctx.fillStyle = ballArray[i].color;
        ctx.fill();
    }
}

function randomIntFromRange(min, max)
{
    return Math.floor(Math.random() * (max - min + 1) + min);
}








