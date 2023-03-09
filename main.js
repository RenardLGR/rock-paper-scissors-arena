var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

//GRID Initialization
ctx.canvas.width = COLS * BLOCK_SIZE
ctx.canvas.height = ROWS * BLOCK_SIZE
ctx.scale(BLOCK_SIZE, BLOCK_SIZE) //the scale of 1 will now be scaled to a block size

let requestId

//Board initilization
let winner = 0
let board = new Board(ctx)
board.addNPiecesOfEach(10)
// board.spawnPiece(1)
board.drawBoard()

//TODO : personalization, sprites, sprites are mirrored if they go left/right, change the winner p to reflect the team winning
//TODO : pause button?
//TODO Mutating pieces ? a rock becomes a paper, etc


function play() { //called on start button in html
    resetGame()
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
        board.move()
        if(board.doWeHaveWinner() && winner===0){
            winner = board.returnWinner()
            displayWinner()
        }
    }

    //redraw the canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    board.drawBoard()
    requestId = requestAnimationFrame(animate) //not sure what it does but it take himself as a callback??
}

function resetGame() {
    // board.reset()
    time = { start: 0, elapsed: 0}
}

function displayWinner(){
    let p = document.getElementById("winner")
    p.innerText = `Congratulations, ${winner} is the winner`
}