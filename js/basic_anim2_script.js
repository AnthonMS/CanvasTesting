var canvas, ctx, innerWidth, innerHeight;
var platforms = [];
var circleArray = [];

window.onload = function () {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    innerWidth = window.innerWidth;
    innerHeight = window.innerHeight;
    canvas.width = innerWidth;
    canvas.height = innerHeight;


    pushPLatforms(200, 300, 100, 20);
    pushPLatforms(300, innerHeight - 100, 100, 20);
    pushPLatforms(innerWidth - 200, innerHeight - 300, 100, 20);

    for (var i = 0; i < 100; i++)
    {
        //tempCircle = new Circle('TestCircle'+i, innerWidth, innerHeight, platforms);
        circleArray.push(new Circle('TestCircle'+i, innerWidth, innerHeight, platforms));
    }

    animate();

};

function createCircleAndDraw(){
    circle = new Circle('TestCircle', innerWidth, innerHeight, platforms);
    //console.log(circle.name);
    /*ctx.clearRect(0, 0, innerWidth, innerHeight);
    ctx.beginPath();
    ctx.arc(circle.circleX, circle.circleY, circle.circleRadius, 0, Math.PI * 2, false);
    ctx.strokeStyle = 'blue';
    ctx.stroke();*/
}

function animate() {
    setInterval(function () {
        createPlatforms();
        //ctx.clearRect(0, 0, innerWidth, innerHeight);
        for (var i = 0; i < circleArray.length; i++)
        {
            ctx.beginPath();
            ctx.arc(circleArray[i].circleX, circleArray[i].circleY, circleArray[i].circleRadius, 0, Math.PI * 2, false);
            ctx.strokeStyle = 'blue';
            ctx.stroke();
            ctx.fill();
            circleArray[i].moveCircle();
        }
    }, 1000/50); // 50 frames per second
}


function createPlatforms() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (var i = 0; i < platforms.length; i++)
    {
        ctx.fillRect(platforms[i].x, platforms[i].y, platforms[i].width, platforms[i].height);
    }
}


function pushPLatforms(x, y, width, height) {
    platforms.push({
        x: x,
        y: y,
        width: width,
        height: height
    });
}








