class Board{
    constructor(ctx){
        this.ctx = ctx
        this.grid
        this.pieces = [] //Array of Piece
    }

    reset() {
        this.grid = this.getEmptyGrid()
        // this.pieces = []
    }

    move(){
        this.pieces.forEach(p => p.move())
        this.changeType()
        this.drawBoard()
    }

    drawBoard(){ //draw a rectangle with its color
        // this.grid.forEach((row, y) => {
        //     row.forEach((value, x) => {
        //         if(value > 0){
        //             let randX = Math.floor(Math.random() * (n + 1));
        //             let randY = Math.floor(Math.random() * (n + 1));
        //             this.ctx.fillStyle = 'red'
        //             this.ctx.fillRect(x,x,1,1)
        //         }
        //     })
        // })
        this.pieces.forEach(p => p.draw())
    }

    changeType(){ //If two pieces are superpose and have types that leads to a change
        //1 is rock, 2 is paper, 3 is scissors
        this.pieces.forEach(piece1 => {
            this.pieces.forEach(piece2 => {
                if(piece1.type===1 && piece2.type===3 && this.areSuperposed(piece1, piece2)){
                    //rock + scissors superposition => scissors becomes rock
                    piece2.type = 1
                    piece2.attributeColor()
                }

                if(piece1.type===2 && piece2.type===1 && this.areSuperposed(piece1, piece2)){
                    //paper + rock superposition => rock becomes paper
                    piece2.type = 2
                    piece2.attributeColor()
                }

                if(piece1.type===3 && piece2.type===2 && this.areSuperposed(piece1, piece2)){
                    //scissors + paper superposition => paper becomes scissors
                    piece2.type = 3
                    piece2.attributeColor()
                }
            })
        })

    }

    areSuperposed(piece1, piece2){
        let res = false
        if(piece2.x<=piece1.x+1 && piece2.x>=piece1.x && piece2.y<=piece1.y+1 && piece2.y>=piece1.y){
            res = true
        }
        if(piece1.x<=piece2.x+1 && piece1.x>=piece2.x && piece1.y<=piece2.y+1 && piece1.y>=piece2.y){
            res = true
        }

        return res
    }

    doWeHaveWinner(){ //check if every piece is the same type
        return this.pieces.every(p => p.type === this.pieces[0].type)
    }

    returnWinner(){
        if(this.doWeHaveWinner){
            return this.pieces[0].type
        }
    }

    spawnPiece(id){
        let newP = new Piece(this.ctx, getRandCoord(), getRandCoord(), id)
        this.pieces.push(newP)
    }

    addNPiecesOfEach(n){
        for(let i=0 ; i<n ; i++){
            for(let j=1 ; j<=3 ; j++){
                this.spawnPiece(j)
            }
        }
    }

    getEmptyGrid() {
        return Array.from(
            { length: ROWS }, () => Array(COLS).fill(0)
        )
        //https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/from
        //intersting stuff, .length is a data property, second argument is a function we call on each element
    }
}