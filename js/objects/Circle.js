class Circle
{
    /*_canvasWidth
    _canvasHeight

    _name
    _circleX
    _circleY
    _circleRadius
    _circleSpdX
    _circleSpdY*/

    constructor(name, canvasWidth, canvasHeight, platforms, color)
    {
        this._circleRadius = Math.floor(Math.random() * 10 + 1);
        this._maxRadius = Math.floor((Math.random() * 10 + 1) * 10);
        this._minRadius = this._circleRadius;
        this._circleX = Math.random() * (canvasWidth - this._circleRadius * 2) + this._circleRadius;
        this._circleY = Math.random() * (canvasHeight - this._circleRadius * 2) + this._circleRadius;
        this._circleSpdX = (Math.random() - 0.5) * 3;
        this._circleSpdY = (Math.random() - 0.5) * 3;
        this._name = name;
        this._canvasWidth = canvasWidth;
        this._canvasHeight = canvasHeight;
        this._platforms = platforms;
        this._color = color;
    }

    moveCircle()
    {
        this.checkWallCollision();
        this.checkPlatformCollision();
        this._circleX += this._circleSpdX;
        this._circleY += this._circleSpdY;
    }

    checkWallCollision()
    {
        if (this._circleX + this._circleRadius > this._canvasWidth) { // It is too far right if True
            this._circleSpdX = -this._circleSpdX;
        } else if (this._circleX - this._circleRadius < 0) { // It is too far left if true
            this._circleSpdX = -this._circleSpdX;
        }

        if (this._circleY + this._circleRadius > this._canvasHeight || // It is too far down if True
            this._circleY - this._circleRadius < 0) { // it is to far uuup if true
            this._circleSpdY = -this._circleSpdY; // We do the same thing either way.
        }
    }

    changeRadius(mouseX, mouseY)
    {
        if (mouseX - this._circleX < 50 && // If this mouse is closer than 50 pixels from the right
            mouseX - this._circleX > -50) { // and if the mouse is closer than 50 px from the left
            if (mouseY - this._circleY < 50 && mouseY - this._circleY > -50)
            {
                if (this._circleRadius < this._maxRadius)
                {
                    this._circleRadius += 1;
                }
            }

        } else if (this._circleRadius > this._minRadius) {
            this._circleRadius -= 1;
        }
    }

    checkPlatformCollision()
    {
        //for (var i = 0; i < this._platforms.length; i++)
        //{
            //var tempPlat = this._platforms[i];

        //}
    }

    get name() { return this._name; }
    get canvasWidth() { return this._canvasWidth; }
    get canvasHeight() { return this._canvasHeight; }
    get circleX() { return this._circleX; }
    get circleY() { return this._circleY; }
    get circleRadius() { return this._circleRadius; }
    get circleSpdX() { return this._circleSpdX; }
    get circleSpdY() { return this._circleSpdY; }
    get color() { return this._color; }

    set circleX(value) { this._circleX = value; }
    set circleY(value) { this._circleY = value; }
    set circleRadius(value) { this._circleRadius = value; }
    set circleSpdX(value) { this._circleSpdX = value; }
    set circleSpdY(value) { this._circleSpdY = value; }
    set name(value) { this._name = value; }
    set canvasWidth(value) { this._canvasWidth = value; }
    set canvasHeight(value) { this._canvasHeight = value; }
    set color(value) { this._color = value; }
}