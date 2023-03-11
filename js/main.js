let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

//Interactivity
let plusOneRockBtn = document.querySelector('.spawn-rock-button')
let plusOnePaperBtn = document.querySelector('.spawn-paper-button')
let plusOneScissorsBtn = document.querySelector('.spawn-scissors-button')

plusOneRockBtn.addEventListener('click', (e) => {
    board.spawnPiece(1)
    board.drawBoard()
    removeWinner()
})
plusOnePaperBtn.addEventListener('click', (e) => {
    board.spawnPiece(2)
    board.drawBoard()
    removeWinner()
})
plusOneScissorsBtn.addEventListener('click', (e) => {
    board.spawnPiece(3)
    board.drawBoard()
    removeWinner()
})

let plus10OfEachBtn = document.querySelector('.spawn-10-each-button')
plus10OfEachBtn.addEventListener('click', (e) => {
    board.addNPiecesOfEach(10)
    board.drawBoard()
    removeWinner()
})

let resetBtn = document.querySelector('.reset-button')
resetBtn.addEventListener('click', resetGame)


//GRID Initialization
ctx.canvas.width = COLS * BLOCK_SIZE
ctx.canvas.height = ROWS * BLOCK_SIZE
ctx.scale(BLOCK_SIZE, BLOCK_SIZE) //the scale of 1 will now be scaled to a block size

let requestId
let time
let isPaused = true
let moves = 1 //this value will range between 0 and skipRedraw+, each time it is moves>=skipRedraw, a redraw will trigger

//Board initilization
let winner = null
let board = new Board(ctx)
// board.addNPiecesOfEach(10)
// board.spawnPiece(1)
// board.drawBoard()

//TODO : sprites are mirrored if they go left/right
//TODO : pause button?
//TODO Mutating pieces ? a rock becomes a paper, etc
//TODO Chart.js?
//TODO delete on mouse click?


//Functions

function play() { //called on start button in html
    if(board.hasPieces() === false){ //do nothing if board is empty
        return
    }
    if(isPaused){ //unpause if it was paused
        isPaused = !isPaused
    }
    time = { start: 0, elapsed: 0}
    time.start = performance.now() //reset time
    if (requestId) { //cancel animation from the old game
        cancelAnimationFrame(requestId)
    }

    animate()
}

function animate(now = 0) {
    time.elapsed = now - time.start
    if(time.elapsed > period && !isPaused){
        time.start = now
        board.move()

        //check for winner
        if(board.doWeHaveWinner() && winner===null){
            winner = board.returnWinner()
            displayWinner()
        }
    }

    //redraw the canvas
    if(moves >= skipRedraw){
        moves = 0
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        board.drawBoard()
    }

    //skipping when nPieces is high
    let nPieces = board.howManyPieces()
    if(nPieces < 100){ //redraw every moves if nPieces is smaller than 100
        moves++
    }else{ //skip some redraw if there are too many pieces
        moves += 100/(nPieces*1.05)
    }
    requestId = requestAnimationFrame(animate) //not sure what it does but it make the animation work
}

function pause(){
    isPaused = !isPaused
}

function resetGame() { //clears board, winner and winner p
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    board.reset()
    pause()
    time = { start: 0, elapsed: 0}

    removeWinner()
}


// DOM manipulation
function removeWinner(){
    winner = null
    let p = document.querySelector(".winner-p")
    p.innerHTML = ""
}

function displayWinner(){
    let p = document.querySelector(".winner-p")
    let win = whoIsTheWinner()
    let legend = generateLegend()
    p.innerHTML = `<span class="winner-span">${win}</span> wins. <span class="winner-span">${legend}</span>.`
}

function whoIsTheWinner(){
    switch (winner) {
        case 1:
            return 'Rock'
            break;

        case 2:
            return 'Paper'
            break;

        case 3:
            return 'Scissors'
            break;

        default:
            return
            break;
    }
}

function generateLegend(){
    switch (winner) {
        case 1:
            return 'Rocket science'
            // 'Get recked'
            break;

        case 2:
            return 'Fly high'
            break;

        case 3:
            return 'Cutting edge'
            // 'Edgy'
            break;

        default:
            return
            break;
    }
}
