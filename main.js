const COLS = 20;
const ROWS = 20;
const BLOCK_SIZE = 30; //in px

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

//GRID Initialization
ctx.canvas.width = COLS * BLOCK_SIZE
ctx.canvas.height = ROWS * BLOCK_SIZE
ctx.scale(BLOCK_SIZE, BLOCK_SIZE) //the scale of 1 will now be scaled to a block size


let board = new Board(ctx)
board.reset()

let rock1 = new Piece(ctx, Math.floor(Math.random() * (19 + 1)), Math.floor(Math.random() * (19 + 1)), 1)
let paper1 = new Piece(ctx, Math.floor(Math.random() * (19 + 1)), Math.floor(Math.random() * (19 + 1)), 2)

rock1.draw()
paper1.draw()