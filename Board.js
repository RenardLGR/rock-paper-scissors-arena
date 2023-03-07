class Board{
    constructor(ctx){
        this.ctx = ctx
        this.grid
    }

    reset() {
        this.grid = this.getEmptyGrid()
    }

    drawBoard(){ //draw a rectangle with its color
        this.grid.forEach((row, y) => {
            row.forEach((value, x) => {
                if(value > 0){
                    let randX = Math.floor(Math.random() * (n + 1));
                    let randY = Math.floor(Math.random() * (n + 1));
                    this.ctx.fillStyle = 'red'
                    this.ctx.fillRect(x,x,1,1)
                }
            })
        })
    }

    getEmptyGrid() {
        return Array.from(
            { length: ROWS }, () => Array(COLS).fill(0)
        )
        //https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/from
        //intersting stuff, .length is a data property, second argument is a function we call on each element
    }
}