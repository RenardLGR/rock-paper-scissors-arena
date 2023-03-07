class Piece{
    constructor (ctx, x, y, id){
        this.ctx = ctx
        this.color = 'red'
        this.id = id //1 is rock, 2 is paper, 3 is scissors
        //Starting position
        this.x = x
        this.y = y
    }

    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, 1, 1);
    }
}