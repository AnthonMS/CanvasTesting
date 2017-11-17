class Bullet
{
    constructor(x, y, canvasWidth, canvasHeight, color, mouseX, mouseY)
    {
        this.radius = 5;
        this.x = x;
        this.y = y;
        this.color = color;
        this.speed = 15;

        var tempX = mouseX - this.x;
        var tempY = mouseY - this.y;
        var tempMag = Math.sqrt(tempX * tempX + tempY * tempY);
        this.dy = (tempY / tempMag) * this.speed;
        this.dx = (tempX / tempMag) * this.speed;

        this.gravity = 0.075;
        this.toRemove = false;
        this.mouseX = mouseX;
        this.mouseY = mouseY;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
    }

    moveBullet()
    {
        this.checkRemoval();

        this.dy += this.gravity;
        this.x += this.dx;
        this.y += this.dy;
    }

    checkRemoval()
    {
        for (var i = 0; i < platformArray.length; i++)
        {
            var dir = this.colCheck(this, platformArray[i]);
            if (dir === "l" || dir === "r") {
                //console.log("It is hitting the left or right of the bullet");
                this.toRemove = true;
            } else if (dir === "b") {
                //console.log("It is hitting the bottom of the bullet");
                this.toRemove = true;
            } else if (dir === "t") {
                //console.log("It is hitting the top of the bullet");
                this.toRemove = true;
            }

            if (this.x + this.radius > this.canvasWidth || this.x < 0) {
                this.toRemove = true;
            }
            if (this.y + this.radius > this.canvasHeight || this.y < 0) {
                this.toRemove = true;
            }
        }
    }

    colCheck(shapeA, shapeB)
    {
        // get the vectors to check against
        var vX = (shapeA.x + (shapeA.radius / 2)) - (shapeB.x + (shapeB.width / 2));
        var vY = (shapeA.y + (shapeA.radius / 2)) - (shapeB.y + (shapeB.height / 2));
        var hWidths = (shapeA.radius / 2) + (shapeB.width / 2);
        var hHeights = (shapeA.radius / 2) + (shapeB.height / 2);
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

    randomIntFromRange(min, max)
    {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}