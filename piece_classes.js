
class Pawn {
    constructor(player, chess){
        this.chess = chess;
        this.pieceName = "Pawn";
        this.player = player;
        this.moveCount = 0;
        this.doubleStepped = false;
    }

    getMoves(row, col){
        let moves = [];

        // you can heavily simplify this shit
        if (this.player == 1){
            // check legal moves 1st
            if (!this.chess.board[row - 1][col]){ // there's no piece above
                moves.push([[row - 1, col], "Move"]);

                if (this.moveCount == 0 && !this.chess.board[row - 2][col]) { // first move and there's no piece 1 and 2 squares above the pawn
                    moves.push([[row - 2, col], "Move"]);
                }
            }

            // check legal takes
            if (col < 7 && this.chess.board[row - 1][col+1] && this.chess.board[row - 1][col+1].player == 2){
                moves.push([[row - 1, col + 1], "Take"]);
            }
            if (col > 0 && this.chess.board[row - 1][col-1] && this.chess.board[row - 1][col-1].player == 2){
                moves.push([[row - 1, col - 1], "Take"]);
            }
        }
        else{
            // check legal moves 1st
            if (!this.chess.board[row + 1][col]){ // there's no piece above
                moves.push([[row + 1, col], "Move"]);

                if (this.moveCount == 0 && !this.chess.board[row + 2][col]) { // first move and there's no piece 1 and 2 squares above the pawn
                    moves.push([[row + 2, col], "Move"]);
                }
            }

            // check legal takes
            if (col < 7 && this.chess.board[row + 1][col+1] && this.chess.board[row + 1][col+1].player == 1){
                moves.push([[row + 1, col + 1], "Take"]);
            }
            if (col > 0 && this.chess.board[row + 1][col-1] && this.chess.board[row + 1][col-1].player == 1){
                moves.push([[row + 1, col - 1], "Take"]);
            }
        }

        // todo: check if each pieces are pinned to the king, so the piece cannot move
        

        return moves;
    }
    draw(row, col){
        let cell_width = this.chess.cvs.width / 8
        let cell_height = this.chess.cvs.height / 8

        if (this.player == 1)
            this.chess.ctx.drawImage(this.chess.img, 1650, -6, this.chess.img.width/6 - 25, this.chess.img.height/2 - 25, col * cell_width, row * cell_height, cell_width, cell_height);
        else
            this.chess.ctx.drawImage(this.chess.img, 1650, 333, this.chess.img.width/6 - 25, this.chess.img.height/2 - 25, col * cell_width, row * cell_height, cell_width, cell_height);
    }
}

class Knight {
    constructor(player, chess){
        this.chess = chess;
        this.player = player;
    }

    getMoves(row, col){

    }
    draw(row, col){
        let cell_width = this.chess.cvs.width / 8
        let cell_height = this.chess.cvs.height / 8

        if (this.player == 1)
            this.chess.ctx.drawImage(this.chess.img, 986, -6, this.chess.img.width/6 - 25, this.chess.img.height/2 - 25, col * cell_width, row * cell_height, cell_width, cell_height);
        else
            this.chess.ctx.drawImage(this.chess.img, 986, 333, this.chess.img.width/6 - 25, this.chess.img.height/2 - 25, col * cell_width, row * cell_height, cell_width, cell_height);
    }
}

class Bishop {
    constructor(player, chess){
        this.chess = chess;
        this.player = player;
    }

    getMoves(row, col){

    }
    draw(row, col){
        let cell_width = this.chess.cvs.width / 8
        let cell_height = this.chess.cvs.height / 8

        if (this.player == 1)
            this.chess.ctx.drawImage(this.chess.img, 650, -6, this.chess.img.width/6 - 25, this.chess.img.height/2 - 25, col * cell_width, row * cell_height, cell_width, cell_height);
        else
            this.chess.ctx.drawImage(this.chess.img, 645, 320, this.chess.img.width/6 - 15, this.chess.img.height/2 - 15, col * cell_width, row * cell_height, cell_width, cell_height);
    }
}

class Rook {
    constructor(player, chess){
        this.chess = chess;
        this.player = player;
    }

    getMoves(row, col){

    }
    draw(row, col){
        let cell_width = this.chess.cvs.width / 8
        let cell_height = this.chess.cvs.height / 8

        if (this.player == 1)
            this.chess.ctx.drawImage(this.chess.img, 1320, -6, this.chess.img.width/6 - 25, this.chess.img.height/2 - 25, col * cell_width, row * cell_height, cell_width, cell_height);
        else
            this.chess.ctx.drawImage(this.chess.img, 1320, 330, this.chess.img.width/6 - 25, this.chess.img.height/2 - 25, col * cell_width, row * cell_height, cell_width, cell_height);
    }
}

class Queen {
    constructor(player, chess){
        this.chess = chess;
        this.player = player;
    }

    getMoves(row, col){

    }
    draw(row, col){
        let cell_width = this.chess.cvs.width / 8
        let cell_height = this.chess.cvs.height / 8

        if (this.player == 1)
            this.chess.ctx.drawImage(this.chess.img, 320, -5, this.chess.img.width/6 - 25, this.chess.img.height/2 - 25, col * cell_width, row * cell_height, cell_width, cell_height);
        else
            this.chess.ctx.drawImage(this.chess.img, 312, 328, this.chess.img.width/6 - 13, this.chess.img.height/2 - 15, col * cell_width, row * cell_height, cell_width, cell_height);
    }
}

class King {
    constructor(player, chess){
        this.chess = chess;
        this.player = player;
    }

    getMoves(row, col){

    }
    draw(row, col){
        let cell_width = this.chess.cvs.width / 8
        let cell_height = this.chess.cvs.height / 8

        if (this.player == 1)
            this.chess.ctx.drawImage(this.chess.img, 0, 0, this.chess.img.width/6 - 52, this.chess.img.height/2 - 30, col * cell_width, row * cell_height, cell_width, cell_height);
        else
            this.chess.ctx.drawImage(this.chess.img, 0, 333, this.chess.img.width/6 - 52, this.chess.img.height/2 - 30, col * cell_width, row * cell_height, cell_width, cell_height);
    }
}

class Chess {
    constructor(cvs, img) {
        this.cvs = cvs;
        this.ctx = cvs.getContext("2d");
        this.img = img
        this.board = [[new Rook(2, this), new Knight(2, this), new Bishop(2, this), new Queen(2, this), new King(2, this), new Bishop(2, this), new Knight(2, this), new Rook(2, this)],
                      [new Pawn(2, this), new Pawn(2, this), new Pawn(2, this), new Pawn(2, this), new Pawn(2, this), new Pawn(2, this), new Pawn(2, this), new Pawn(2, this)],
                      [null, null, null, null, null, null, null, null, null, null],
                      [null, null, null, null, null, null, null, null, null, null],
                      [null, null, null, null, null, null, null, null, null, null],
                      [null, null, null, null, null, null, null, null, null, null],
                      [new Pawn(1, this), new Pawn(1, this), new Pawn(1, this), new Pawn(1, this), new Pawn(1, this), new Pawn(1, this), new Pawn(1, this), new Pawn(1, this)],
                      [new Rook(1, this), new Knight(1, this), new Bishop(1, this), new Queen(1, this), new King(1, this), new Bishop(1, this), new Knight(1, this), new Rook(1, this)]];
        
        this.cvs.addEventListener('click', this.mouseDown.bind(this))

        
        // state fields/instance variables
        this.player = 1;
        this.player1TimeSecs = 600;
        this.player2TimeSecs = 600;

        this.currentPiece = null;
        this.currentPiecePos = null;
        this.currentMoves = null;
    }

    drawBoard(){
        // draw cells
        for (let i = 0; i < 8; i++){
            for (let j = 0; j < 8; j++){
                this.drawCell(i, j);
            }
        }
        
        //this.ctx.globalAlpha = 0.4;

        // draw pieces
        for (let i = 0; i < 8; i++){
            for (let j = 0; j < 8; j++){
                let piece = this.board[i][j];
                if (piece){
                    piece.draw(i, j);
                }
            }
        }
    }

    drawCell(row, col){
        let cell_width = this.cvs.width / 8
        let cell_height = this.cvs.height / 8

        this.ctx.fillStyle = (row + col) % 2 == 1 ? "#42352d" : "#ebdbd1";
        this.ctx.fillRect(col * cell_height, row  * cell_width, cell_width, cell_height);

        let piece = this.board[row][col];
        if (piece)
            piece.draw(row, col);
    }

    drawLegalMovesIndicator(piece, r, c){
        if (!piece)
            return;
        
        let moves = piece.getMoves(r, c);

        let cell_width = this.cvs.width / 8
        let cell_height = this.cvs.height / 8

        moves.forEach((val) => {
            let row = val[0][0], col = val[0][1];
            this.ctx.fillStyle = "#eee";
            this.ctx.fillRect(col * cell_height, row  * cell_width, cell_width, cell_height);
        });

        // save state
        this.currentPiece = piece;
        this.currentPiecePos = [r, c];
        this.currentMoves = moves;
    }

    eraseLegalMovesIndicator(){
        if (this.currentPiece){ // erase previous drawn moves highlight if there are existing
            this.currentPiece = null;
            this.currentPiecePos = null;
            this.currentMoves.forEach((val) => {
                let row = val[0][0], col = val[0][1];
                this.drawCell(row, col);
            });
            this.currentMoves = null;
        }
    }
    
    mouseDown(event){
        var rect = this.cvs.getBoundingClientRect();
        var x = event.pageX - rect.left, y = event.pageY - rect.top;
        let cell_width = this.cvs.width / 8
        let cell_height = this.cvs.height / 8
        
        let r = Math.floor(y / cell_height), c = Math.floor(x / cell_width);

        if (this.currentMoves){ // meaning there are moves highlighted that the user might select
            for (let i = 0; i < this.currentMoves.length; i++){
                let val = this.currentMoves[i];
                let row = val[0][0], col = val[0][1];
                if (row == r && col == c) { // meaning user chose to perform this legal move
                    this.performLegalMove(val);
                    return;
                }
            }
        }

        let piece = this.board[r][c];
        if (piece != null && piece.player != this.player)
            piece = null;

        this.eraseLegalMovesIndicator();

        this.drawLegalMovesIndicator(piece, r, c);
    }

    performLegalMove(move){
        let pos = move[0];
        let action = move[1];
        
        switch (action){
            case "Move":
                this.board[pos[0]][pos[1]] = this.currentPiece;
                this.board[this.currentPiecePos[0]][this.currentPiecePos[1]] = null;
                this.drawCell(pos[0], pos[1]);
                this.drawCell(this.currentPiecePos[0], this.currentPiecePos[1]);

                // check if piece is a pawn
                if (this.currentPiece.pieceName == "Pawn")
                    this.currentPiece.moveCount++;
                break;
            case "Take":
                this.board[pos[0]][pos[1]] = this.currentPiece;
                this.board[this.currentPiecePos[0]][this.currentPiecePos[1]] = null;
                this.drawCell(pos[0], pos[1]);
                this.drawCell(this.currentPiecePos[0], this.currentPiecePos[1]);
                
                // check if piece is a pawn
                if (this.currentPiece.pieceName == "Pawn")
                    this.currentPiece.moveCount++;
                
                break;
            case "Promote":
                break;
        }

        // reset/change states
        this.eraseLegalMovesIndicator();

        this.currentPiece = null;
        this.currentPiecePos = null;
        this.currentMoves = null;

        this.player = this.player == 1 ? 2 : 1;
    }
}