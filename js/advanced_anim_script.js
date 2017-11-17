var canvas, ctx, innerWidth, innerHeight;
var platforms = [];
var circleArray = [];
var colorArray = ['blue', 'purple', 'red', 'yellow', 'orange', 'green'];

window.onload = function () {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    innerWidth = window.innerWidth;
    innerHeight = window.innerHeight;
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    for (var i = 0; i < 1000; i++)
    {
        //tempCircle = new Circle('TestCircle'+i, innerWidth, innerHeight, platforms);
        var tempCol = Math.floor(Math.random() * colorArray.length);
        circleArray.push(new Circle('TestCircle'+i, innerWidth, innerHeight, platforms, colorArray[tempCol]));
    }

    animate();

};

window.addEventListener('mousemove',
    function (event) {
        //console.log(event);
        for (var i = 0; i < circleArray.length; i++)
        {
            circleArray[i].changeRadius(event.clientX, event.clientY);
        }
});

function animate() {
    setInterval(function () {
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        //ctx.clearRect(0, 0, innerWidth, innerHeight);
        updateCircles();
    }, 1000/50); // 50 frames per second
}

function updateCircles() {
    for (var i = 0; i < circleArray.length; i++)
    {
        ctx.beginPath();
        ctx.arc(circleArray[i].circleX, circleArray[i].circleY, circleArray[i].circleRadius, 0, Math.PI * 2, false);
        //ctx.strokeStyle = 'black';
        //ctx.stroke();
        ctx.fillStyle = circleArray[i].color;
        ctx.fill();
        circleArray[i].moveCircle();
    }
}








