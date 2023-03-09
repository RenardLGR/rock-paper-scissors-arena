const COLS = 30;
const ROWS = 30;
const BLOCK_SIZE = 30; //in px

const period = 15 //time in ms between 2 movements

function getRandCoord(maxCoord = COLS){ //Get a random valid coord.
    return Math.floor(Math.random() * (maxCoord))
}