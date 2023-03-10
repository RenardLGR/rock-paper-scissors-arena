const COLS = 30;
const ROWS = 30;
const BLOCK_SIZE = 30; //in px

const period = 17 //time in ms between 2 movements, this is around 60FPS

const skipRedraw = 1 //moves are done but not redrawn, set to 1 if every moves should be drawn

function getRandCoord(maxCoord = COLS){ //Get a random valid coord.
    return Math.floor(Math.random() * (maxCoord))
}