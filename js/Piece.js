class Piece {
    constructor(ctx, x, y, type, isDarkTheme) {
        this.ctx = ctx
        this.color = 'purple'
        this.type = type //1 is rock, 2 is paper, 3 is scissors
        this.isDarkTheme = isDarkTheme
        //Starting position, origin is top left corner, increasing x will go left, increasing y will go bottom
        this.imgsrc
        this.x = x
        this.y = y
        this.maxX = COLS - 1
        this.maxY = ROWS - 1
        this.direction = Math.random() * 2 * Math.PI
        // Using a direction in X and a diretion in Y and simply dirX = -dirX when hitting a wall would have probably made things easier
        // this.attributeColor()
        this.attributeImgsrc()
    }

    draw() { //draw our piece
        // ctx.fillStyle = this.color;
        // ctx.fillRect(this.x, this.y, 1, 1);
        var img = new Image();
        img.src = this.imgsrc
        //Img appears one page load
        img.onload = () => ctx.drawImage(img, this.x, this.y, 1, 1);
        //Img is redrawn every steps
        ctx.drawImage(img, this.x, this.y, 1, 1);
    }

    move() {
        if (this.x >= this.maxX) { //check for wall collision
            this.direction = this.reflectSimple(this.direction, 'right')
        }
        if (this.y >= this.maxY) { //check for wall collision
            this.direction = this.reflectSimple(this.direction, 'bottom')
        }
        if (this.x <= 0) { //check for wall collision
            this.direction = this.reflectSimple(this.direction, 'left')
        }
        if (this.y <= 0) { //check for wall collision
            this.direction = this.reflectSimple(this.direction, 'top')
        }
        this.x += Math.cos(this.direction) / 8
        this.y += Math.sin(this.direction) / 8
        this.noClip()
    }

    noClip() { //ensure our pieces don't go inside walls
        if (this.x < 0) {
            this.x = 0
        }
        if (this.y < 0) {
            this.y = 0
        }
        if (this.x > this.maxX) {
            this.x = this.maxX
        }
        if (this.y > this.maxY) {
            this.y = this.maxY
        }
    }

    reflect(angle, wall) {
        //Deprecated, kept if the container shape is no more a square
        //This function returns a new direction when a collision on a wall occurs

        //http://www.sunshine2k.de/articles/coding/vectorreflection/vectorreflection.html

        // Convert angle to unit vector
        const vx = Math.cos(angle);
        const vy = Math.sin(angle);

        // Calculate normal vector of wall
        let nx, ny;
        switch (wall) {
            case 'left':
                nx = 1;
                ny = 0;
                break;
            case 'right':
                nx = -1;
                ny = 0;
                break;
            case 'top':
                nx = 0;
                ny = 1;
                break;
            case 'bottom':
                nx = 0;
                ny = -1;
                break;
            default:
                throw new Error(`Invalid wall: ${wall}`);
        }

        // Calculate dot product of vector and normal
        const dot = vx * nx + vy * ny;

        // Calculate reflected vector
        const rx = vx - 2 * dot * nx;
        const ry = vy - 2 * dot * ny;

        // Calculate new angle
        const newAngle = Math.atan2(ry, rx);

        return newAngle;
    }

    reflectSimple(angle, wall){
        //This function returns a new direction when a collision on a wall occurs
        //As we are working with right walls (meaning if a wall has normal value in x, the normal value in y is 0), we can simplify the function above
        //∀ nx=/=0 <=> ny=0
        //∀ nx=/=0 <=> nx=0

        // https://stackoverflow.com/questions/283406/what-is-the-difference-between-atan-and-atan2-in-c

        //In fact, a hit on left or right wall will just inverse its cosine value and a hit on top or bottom wall will just inverse its sine value
        //To get back an angle we would use atan2(y, x) with x,y which are the projection of a vector with length v and angle θ on the y- and x-axis, i.e.
        // y = v * sin(θ)
        // x = v * cos(θ)
        //As every elements move with the same speed, we can consider v=1 and get rid of it

        // Convert angle to unit vector
        const vx = Math.cos(angle);
        const vy = Math.sin(angle);

        // atan(tanθ) ≡ θ mod π with -π/2 <= θ <= π/2
        // but atan2(vy, vx) gives back -π <= θ <= π
        let newAngle
        //Calculate new angle with sine or cosine flipped
        switch (wall) {
            case 'left':
                newAngle = Math.atan2(vy, -vx)
                break;
            case 'right':
                newAngle = Math.atan2(vy, -vx)
                break;
            case 'top':
                newAngle = Math.atan2(-vy, vx)
                break;
            case 'bottom':
                newAngle = Math.atan2(-vy, vx)
                break;
            default:
                throw new Error(`Invalid wall: ${wall}`);
        }

        return newAngle
    }

    turnToLightTheme(){
        this.isDarkTheme = false
        this.attributeImgsrc()
        this.draw()
    }

    turnToDarkTheme(){
        this.isDarkTheme = true
        this.attributeImgsrc()
        this.draw()
    }

    attributeColor() { //changed the default color to a color corresponding to its id
        //As we moved to img as sprites, obsolete
        switch (this.type) {
            case 1:
                this.color = 'red'
                break;

            case 2:
                this.color = 'green'
                break;

            case 3:
                this.color = 'blue'
                break;

            default:
                break;
        }
    }

    attributeImgsrc() { //changed the default src to a src corresponding to its id
        switch (this.type) {
            case 1:
                this.imgsrc = this.isDarkTheme ? "./img/rockwhite.svg" : "./img/rock.svg"
                break;

            case 2:
                this.imgsrc = this.isDarkTheme ? "./img/paperwhite.svg" : "./img/paper.svg"
                break;

            case 3:
                this.imgsrc = this.isDarkTheme ? "./img/scissorswhite.svg" : "./img/scissors.svg"
                break;

            default:
                break;
        }
    }
}

