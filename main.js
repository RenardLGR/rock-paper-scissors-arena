var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

//GRID Initialization
ctx.canvas.width = COLS * BLOCK_SIZE
ctx.canvas.height = ROWS * BLOCK_SIZE
ctx.scale(BLOCK_SIZE, BLOCK_SIZE) //the scale of 1 will now be scaled to a block size

let requestId

let board = new Board(ctx)
// board.reset()

//rand spawn coordinates for now
let rock1 = new Piece(ctx, Math.floor(Math.random() * (19 + 1)), Math.floor(Math.random() * (19 + 1)), 1)
let paper1 = new Piece(ctx, Math.floor(Math.random() * (19 + 1)), Math.floor(Math.random() * (19 + 1)), 2)



rock1.draw()
paper1.draw()


function play() { //called on start button in html
    resetGame()
    //console.table(board.grid)
    time.start = performance.now() //reset time
    if (requestId) { //cancel animation from the old game
        cancelAnimationFrame(requestId)
    }

    animate()
}

function animate(now = 0) {
    time.elapsed = now - time.start
    if(time.elapsed > period){
        time.start = now
        // if(!board.drop()){ //no  piece can move
        //     gameOver()
        //     return
        // }
        rock1.move()
        paper1.move()
    }

    //redraw the canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    // board.draw()
    rock1.draw()
    paper1.draw()
    requestId = requestAnimationFrame(animate) //not sure what it does but it take himself as a callback??
}

function resetGame() {
    board.reset()
    time = { start: 0, elapsed: 0}
}