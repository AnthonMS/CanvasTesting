var canvas, ctx, innerWidth, innerHeight;
var keys = [];
var platformArray = [];
var ballArray = [];
var colorArray = ['blue', 'purple', 'red', 'yellow', 'orange', 'green'];
var player;

window.onload = function () {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    innerWidth = window.innerWidth - 50;
    innerHeight = window.innerHeight - 50;
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    platformArray.push({
        x: 0,
        y: 0,
        width: 10,
        height: innerHeight
    });
    platformArray.push({
        x: 0,
        y: innerHeight - 10,
        width: innerWidth,
        height: 10
    });
    platformArray.push({
        x: innerWidth - 10,
        y: 0,
        width: 10,
        height: innerHeight
    });

    player = new Player("Player1", 30, 60, innerWidth, innerHeight, 'red');

    animate();

};

addEventListener('click', function (event) {
    //console.log(event);
});


function animate() {
    setInterval(function () {
        ctx.clearRect(0, 0, innerWidth, innerHeight);

        for (var i = 0; i < platformArray.length; i++)
        {
            ctx.fillStyle = 'black';
            ctx.fillRect(platformArray[i].x, platformArray[i].y, platformArray[i].width, platformArray[i].height);
        }

        updatePlayer();

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