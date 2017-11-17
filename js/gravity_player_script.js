var canvas, ctx, innerWidth, innerHeight;
var keys = [];
var platformArray = [];
var bulletArray = [];
var colorArray = ['blue', 'purple', 'red', 'yellow', 'orange', 'green'];
var player;

window.onload = function () {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    innerWidth = window.innerWidth - 50;
    innerHeight = window.innerHeight - 50;
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    //console.log("Testing Updates!!!!");

    pushPlatform(0, 0, 10, innerHeight);
    pushPlatform(0, innerHeight - 10, innerWidth, 10);
    pushPlatform(innerWidth - 10, 0, 10, innerHeight);
    pushPlatform(0, 0, innerWidth, 10);

    player = new Player("Player1", 30, 60, innerWidth, innerHeight, 'red');

    animate();

};

function pushPlatform(startX, startY, platWidth, platHeight) {
    platformArray.push({
        x: startX,
        y: startY,
        width: platWidth,
        height: platHeight
    });
}

addEventListener('click', function (event) {
    //console.log(bulletArray);
    player.playerShootBullet(event.clientX, event.clientY);
});


function animate() {
    setInterval(function () {
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        ctx.fillStyle = 'skyblue';
        ctx.fillRect(0, 0, innerWidth, innerHeight);

        for (var i = 0; i < platformArray.length; i++)
        {
            ctx.fillStyle = 'black';
            ctx.fillRect(platformArray[i].x, platformArray[i].y, platformArray[i].width, platformArray[i].height);
        }

        updatePlayer();
        updateBullets();

    }, 1000/50); // 50 frames per second
}

function updatePlayer() {
    if (keys[38] || keys[32]) {
        // up arrow or space
        player.playerJump();
    }
    if (keys[39]) {
        // right arrow
        player.playerRightLeft('D');
    }
    if (keys[37]) {
        // left arrow
        player.playerRightLeft('A');
    }

    player.playerUpdate();

    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(player.x, player.y, player.width, player.height);
}

function updateBullets() {
    for (var i = 0; i < bulletArray.length; i++)
    {
        if (bulletArray[i].toRemove) {
            bulletArray.splice(i, 1);
        } else {
            ctx.beginPath();
            ctx.arc(bulletArray[i].x, bulletArray[i].y, bulletArray[i].radius, 0, Math.PI * 2, false);
            ctx.strokeStyle = 'black';
            ctx.stroke();
            ctx.fillStyle = bulletArray[i].color;
            ctx.fill();
            bulletArray[i].moveBullet();
        }
    }
}

function randomIntFromRange(min, max)
{
    return Math.floor(Math.random() * (max - min + 1) + min);
}

addEventListener("keydown", function(e) {
    keys[e.keyCode] = true;
});

addEventListener("keyup", function(e) {
    keys[e.keyCode] = false;
});