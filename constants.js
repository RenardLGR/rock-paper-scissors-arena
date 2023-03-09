const COLS = 30;
const ROWS = 30;
const BLOCK_SIZE = 30; //in px

const period = 15 //time in ms between 2 movements

function getRandCoord(){ //Get a random valid coord. As our canvas is a square COLS === ROWS
    return Math.floor(Math.random() * (COLS))
}