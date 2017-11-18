class Player
{
    constructor(name, width, height, canvasWidth, canvasHeight, color, playerStill, playerSheet, sheetCols)
    {
        this.name = name;
        this.width = width;
        this.height = height;
        this.x = this.randomIntFromRange(this.width, canvasWidth - (this.width));
        this.y = this.randomIntFromRange(this.height, canvasHeight - (this.height));
        this.color = color;
        this.speed = 5;
        this.velX = 0;
        this.velY = 0;
        this.gravity = 0.5;
        this.friction = 0.8; // Decrease the dy value exponetially with this friction variable
        this.jumping = false;
        this.grounded = false;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;

        this.playerStill = playerStill;
        this.playerSheet = playerSheet;
        this.sheetCols = sheetCols;
        this.colDisplay = 1;
    }

    playerRightLeft(keyVal) {
        if (keyVal == 'A') { // A
            this.x += -this.speed;
            this.grounded = false;
            //console.log(keyVal);
            //console.log(platformArray);
        } else if (keyVal == 'D') { // D
            this.x += this.speed;
            this.grounded = false;
            if (this.colDisplay == 1) {
                this.colDisplay = 2;
            } else if (this.colDisplay == 2) {
                this.colDisplay = 3;
            } else if (this.colDisplay == 3) {
                this.colDisplay = 4;
            } else if (this.colDisplay == 4) {
                this.colDisplay = 2;
            }
            //console.log(keyVal);
        }
    }

    playerJump() {
        //console.log("jumptesting");
        if (!this.jumping && this.grounded)
        {
            //console.log("jumptesting");
            this.velY = -this.speed * 2;
            this.jumping = true;
            this.grounded = false;
        }
    }

    playerUpdate()
    {
        //this.y += this.velY;
        //this.y += this.velY;

        this.velX *= this.friction;
        this.velY += this.gravity;

        for (var i = 0; i < platformArray.length; i++)
        {
            var dir = this.colCheck(this, platformArray[i]);
            //console.log(dir);
            if (dir === "l" || dir === "r") {
                this.velX = 0;
                this.jumping = false;
            } else if (dir === "b") {
                this.grounded = true;
                this.jumping = false;
            } else if (dir === "t") {
                this.velY *= -1;
            } else {

            }
        }

        if (this.grounded) {
            this.velY = 0;
        }

        this.x += this.velX;
        this.y += this.velY;
    }

    colCheck(shapeA, shapeB)
    {
        // get the vectors to check against
        var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2));
        var vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2));
        var hWidths = (shapeA.width / 2) + (shapeB.width / 2);
        var hHeights = (shapeA.height / 2) + (shapeB.height / 2);
        var colDir = null;

        if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
            // figures out on which side we are colliding (top, bottom, left, or right)
            var oX = hWidths - Math.abs(vX);
            var oY = hHeights - Math.abs(vY);
            if (oX >= oY) {
                if (vY > 0) {
                    colDir = "t"; // shapeA colliding on top of shapeB
                    shapeA.y += oY;
                } else {
                    colDir = "b"; // colliding bottom
                    shapeA.y -= oY;
                }
            } else {
                if (vX > 0) {
                    colDir = "l"; // colliding left
                    shapeA.x += oX;
                } else {
                    colDir = "r"; // colliding right
                    shapeA.x -= oX;
                    //console.log("colliding right");
                }
            }
        }
        return colDir;
    }

    playerShootBullet(mouseX, mouseY)
    {
        //console.log(mouseX, mouseY);
        bulletArray.push(new Bullet(this.x + (this.width / 2), this.y, this.canvasWidth, this.canvasHeight, 'white', mouseX, mouseY));
        //console.log(bulletArray);
    }

    randomIntFromRange(min, max)
    {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}











