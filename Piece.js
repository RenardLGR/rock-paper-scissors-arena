class Piece{
    constructor (ctx, x, y, id){
        this.ctx = ctx
        this.color = 'red'
        this.id = id //1 is rock, 2 is paper, 3 is scissors
        //Starting position, origin is top left corner, increasing x will go left, increasing y will go bottom
        this.x = x
        this.y = y
        this.maxX = COLS - 1
        this.maxY = ROWS - 1
        this.direction = Math.random() * 2 * Math.PI
        // this.direction = 0
    }

    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, 1, 1);
    }

    move(){
        if(this.x >= this.maxX){ //check for wall collision
            this.direction = this.reflect(this.direction, 'right')
        }
        if(this.y >= this.maxY){ //check for wall collision
            this.direction = this.reflect(this.direction, 'bottom')
        }
        if(this.x <= 0){ //check for wall collision
            this.direction = this.reflect(this.direction, 'left')
        }
        if(this.y <= 0){ //check for wall collision
            this.direction = this.reflect(this.direction, 'top')
        }
        this.x += Math.cos(this.direction)/8
        this.y += Math.sin(this.direction)/8
        this.noClip()
    }

    noClip(){ //ensure our pieces don't go inside walls
        if(this.x < 0){
            this.x = 0
        }
        if(this.y < 0){
            this.y = 0
        }
        if(this.x > this.maxX){
            this.x = this.maxX
        }
        if(this.y > this.maxY){
            this.y = this.maxY
        }
    }

    reflect(angle, wall) {
        //This function returns a new direction when a collision on a wall occurs


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
}

