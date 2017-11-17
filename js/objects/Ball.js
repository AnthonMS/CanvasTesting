class Ball
{
    constructor(name, dy, dx, canvasWidth, canvasHeight, color)
    {
        this.name = name;
        this.radius = 30;
        this.x = this.randomIntFromRange(this.radius * 1.5, canvasWidth - (this.radius * 2));
        this.y = this.randomIntFromRange(this.radius * 1.5, canvasHeight - (this.radius * 2));
        this.color = color;
        this.dy = dy;
        this.dx = dx;
        this.gravity = 0.8;
        this.friction = 0.6; // Decrease the dy value exponetially with this friction variable
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
    }

    moveBall()
    {
        // Check if it is hitting bottom
        if (this.y + this.radius + this.dy > this.canvasHeight) { // It hits the bottom
            this.dy = -this.dy * this.friction;
        } else { // simulate the effect of gravity
            this.dy += this.gravity; // gravity of 0.8
        }

        // Check if it is hitting either side
        if (this.x + this.radius + this.dx > this.canvasWidth || // right side
            this.x - this.radius + this.dx < 0) { // left side
            this.dx = -this.dx * this.friction;
        }
        this.x += this.dx;
        this.y += this.dy;
    }

    bounceBall(mouseX, mouseY)
    {
        if (this.x - mouseX < 100 && this.x - mouseX > -100)
        {
            if (this.y - mouseY < 100 && this.y - mouseY > -100)
            {
                //console.log(this.name);
                this.dx = this.randomIntFromRange(-10, 10);
                this.dy = this.randomIntFromRange(-20, -10);
            }
        }
    }

    randomIntFromRange(min, max)
    {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}