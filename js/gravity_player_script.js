var canvas, ctx, innerWidth, innerHeight;
var keys = [];
var platformArray = [];
var bulletArray = [];
var colorArray = ['blue', 'purple', 'red', 'yellow', 'orange', 'green'];
var player;
var groundImg = new Image(), platform100 = new Image(), platform200 = new Image();
var playerSheet = new Image();
var playerStill = new Image();
var sheetCols = 5;
var pattern;

window.onload = function () {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    innerWidth = window.innerWidth - 50;
    innerHeight = window.innerHeight - 50;
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    groundImg.src = 'img/ground.png';
    platform100.src = 'img/platforms.png';
    platform200.src = 'img/platforms200.png';
    playerStill.src = 'img/playerStill.png';
    playerSheet.src = 'img/playerSheet.png';
    //pattern = ctx.createPattern(groundImg, 'repeat');

    //console.log("Testing Updates!!!!");

    // walls, roof and ground
    pushPlatform(0, 0, 5, innerHeight);
    pushPlatform(0, innerHeight - 20, innerWidth, 20);
    pushPlatform(innerWidth - 5, 0, 5, innerHeight);
    pushPlatform(0, 0, innerWidth, 5);
    // Platforms
    pushPlatform(200, innerHeight - 100, 100, 15);
    pushPlatform(innerWidth - 250, innerHeight - 100, 100, 15);
    pushPlatform((innerWidth / 2)-100, innerHeight - 200, 250, 15);
    pushPlatform(100, innerHeight/2, 100, 15);
    pushPlatform(200, innerHeight/2 + 100, 100, 15);
    pushPlatform(innerWidth - 200, innerHeight/2, 100, 15);
    pushPlatform(innerWidth - 300, innerHeight/2 + 100, 100, 15);

    player = new Player("Player1", 30, 60, innerWidth, innerHeight, 'red', playerStill, playerSheet, sheetCols);

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

        updatePlayer();
        updateBullets();

        for (var i = 0; i < platformArray.length; i++)
        {

            if (i >= 4) {
                if (i == 6) {
                    ctx.drawImage(platform200, platformArray[i].x, platformArray[i].y, platformArray[i].width, platformArray[i].height);
                } else {
                    ctx.drawImage(platform100, platformArray[i].x, platformArray[i].y, platformArray[i].width, platformArray[i].height);
                }
            } else {
                ctx.fillStyle = 'white';
                ctx.fillRect(platformArray[i].x, platformArray[i].y, platformArray[i].width, platformArray[i].height);
            }
        }

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

    //ctx.fillStyle = player.color;
    //ctx.fillRect(player.x, player.y, player.width, player.height);
    //ctx.strokeStyle = 'black';
    //ctx.strokeRect(player.x, player.y, player.width, player.height);
    // (image, srcX, srcY, srcWidth, srcHeight, x, y, width, height)
    if (player.colDisplay == 1) { // display colomn one
        ctx.drawImage(playerSheet,
            0, 0, playerSheet.naturalWidth/sheetCols, playerSheet.naturalHeight,
            player.x, player.y, player.width, player.height);
    } else if (player.colDisplay == 2) {
        ctx.drawImage(playerSheet,
            player.width, 0, playerSheet.naturalWidth/sheetCols, playerSheet.naturalHeight,
            player.x, player.y, player.width, player.height);
    } else if (player.colDisplay == 3) {
        ctx.drawImage(playerSheet,
            player.width*2, 0, playerSheet.naturalWidth/sheetCols, playerSheet.naturalHeight,
            player.x, player.y, player.width, player.height);
    } else if (player.colDisplay == 4) {
        ctx.drawImage(playerSheet,
            player.width*4, 0, playerSheet.naturalWidth/sheetCols, playerSheet.naturalHeight,
            player.x, player.y, player.width, player.height);
    }
    //ctx.drawImage(playerStill, player.x, player.y, player.width, player.height);

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