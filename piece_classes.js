
class Pawn {
    constructor(player, chess){
        this.chess = chess;
        this.pieceName = "Pawn";
        this.player = player;
        this.moveCount = 0;
        this.doubleStepped = false;
        this.enPassantPos = null;
    }

    getMoves(row, col){
        let moves = [];
        let steps = [[-1, 0], [-2, 0]];
        if (this.player == 2)
            steps = [[1, 0], [2, 0]];
        
        steps.forEach((step, i) => {
            let nRow = row + step[0], nCol = col + step[1];

            // check if cell is valid
            if (nRow >= 0 && nRow < this.chess.board.length && nCol >= 0 && nCol < this.chess.board[0].length){
                let piece = this.chess.board[nRow][nCol];
                if (!piece){
                    if (i == 1 && moves.length == 1 && this.moveCount == 0)
                        moves.push([[nRow, nCol], "Move"]);
                    if (i == 0)
                        moves.push([[nRow, nCol], "Move"]);
                }
            }
        });

        let takes = [[-1, -1], [-1, 1]];
        if (this.player == 2)
            takes = [[1, -1], [1, 1]];

        takes.forEach((take, i) => {
            let nRow = row + take[0], nCol = col + take[1];

            // check if cell is valid
            if (nRow >= 0 && nRow < this.chess.board.length && nCol >= 0 && nCol < this.chess.board[0].length){
                let piece = this.chess.board[nRow][nCol];
                if (piece && this.player != piece.player){
                    moves.push([[nRow, nCol], "Take"]);
                }
            }
        });


        let enPassants = [[-1, -1], [-1, 1]];
        if (this.player == 2)
            enPassants = [[1, -1], [1, 1]];
        
        enPassants.forEach((enPassant, i) => {
            let nRow = row + enPassant[0], nCol = col + enPassant[1];

            // check if cell is valid
            if (nRow >= 0 && nRow < this.chess.board.length && nCol >= 0 && nCol < this.chess.board[0].length){
                let rowAdjust = this.player == 1 ? 1 : -1;

                let piece = this.chess.board[nRow + rowAdjust][nCol];
                if (piece && this.enPassantPos && this.enPassantPos[0] == nRow && this.enPassantPos[1] == nCol && this.player != piece.player && piece.moveCount == 1 && piece.doubleStepped){
                    moves.push([[nRow, nCol], "EnPassant"]);
                }
            }
        });


        // finally check if moves are safe for the king
        let finalMoves = [];
        moves.forEach(move => {
            if (King.IsMoveSafeForKing(this.chess, move))
                finalMoves.push(move);
        });

        return finalMoves;
    }
    draw(row, col, cvs=this.chess.cvs, img=this.chess.img){
        let cell_width = cvs.width / 8
        let cell_height = cvs.height / 8

        if (this.player == 1)
            this.chess.ctx.drawImage(img, 1650, -6, this.chess.img.width/6 - 25, this.chess.img.height/2 - 25, col * cell_width, row * cell_height, cell_width, cell_height);
        else
            this.chess.ctx.drawImage(this.chess.img, 1650, 333, this.chess.img.width/6 - 25, this.chess.img.height/2 - 25, col * cell_width, row * cell_height, cell_width, cell_height);
    }

    static Draw(row, col, player, cvs, img){
        let cell_width = cvs.width / 1
        let cell_height = cvs.height / 4
        let ctx = cvs.getContext("2d");

        if (player == 1)
            ctx.drawImage(img, 1650, -6, img.width/6 - 25, img.height/2 - 25, col * cell_width, row * cell_height, cell_width, cell_height);
        else
            ctx.drawImage(img, 1650, 333, img.width/6 - 25, img.height/2 - 25, col * cell_width, row * cell_height, cell_width, cell_height);
    }
}

class Knight {
    constructor(player, chess){
        this.chess = chess;
        this.pieceName = "Knight";
        this.player = player;
    }

    getMoves(row, col){
        let moves = [];

        let possibleMoves =[[[row - 2, col - 1], "Move"],
                            [[row - 2, col + 1], "Move"],
                            [[row - 1, col - 2], "Move"],
                            [[row + 1, col - 2], "Move"],
                            [[row + 2, col - 1], "Move"],
                            [[row + 2, col + 1], "Move"],
                            [[row - 1, col + 2], "Move"],
                            [[row + 1, col + 2], "Move"]]
        
        for (let i = 0; i < possibleMoves.length; i++){
            let r = possibleMoves[i][0][0], c = possibleMoves[i][0][1];

            // check first if knight move is in board
            if (r >= 0 && r < this.chess.board.length && c >= 0 && c < this.chess.board[0].length){
                // now check if knight move is blocked by your pieces
                let piece = this.chess.board[r][c]
                if (piece){
                    if (piece.player != this.player){
                        possibleMoves[i][1] = "Take";
                        moves.push(possibleMoves[i]); 
                    }
                }
                else
                    moves.push(possibleMoves[i]); 
            }
        }

        return moves;
    }
    draw(row, col){
        let cell_width = this.chess.cvs.width / 8
        let cell_height = this.chess.cvs.height / 8

        if (this.player == 1)
            this.chess.ctx.drawImage(this.chess.img, 986, -6, this.chess.img.width/6 - 25, this.chess.img.height/2 - 25, col * cell_width, row * cell_height, cell_width, cell_height);
        else
            this.chess.ctx.drawImage(this.chess.img, 986, 333, this.chess.img.width/6 - 25, this.chess.img.height/2 - 25, col * cell_width, row * cell_height, cell_width, cell_height);
    }

    static Draw(row, col, player, cvs, img){
        let cell_width = cvs.width / 1
        let cell_height = cvs.height / 4
        let ctx = cvs.getContext("2d");

        if (player == 1)
            ctx.drawImage(img, 986, -6, img.width/6 - 25, img.height/2 - 25, col * cell_width, row * cell_height, cell_width, cell_height);
        else
            ctx.drawImage(img, 986, 333, img.width/6 - 25, img.height/2 - 25, col * cell_width, row * cell_height, cell_width, cell_height);
    }
}

class Bishop {
    constructor(player, chess){
        this.chess = chess;
        this.pieceName = "Bishop";
        this.player = player;
    }

    getMoves(row, col){
        let moves = [];
        let steps = [[-1, 1], [1, 1], [1, -1], [-1, -1]];

        steps.forEach((step) => {
            let nRow = row, nCol = col;
            while (true){
                nRow += step[0];
                nCol += step[1];

                // check if cell is valid
                if (nRow < 0 || nRow >= this.chess.board.length || nCol < 0 || nCol >= this.chess.board[0].length)
                    break;

                let piece = this.chess.board[nRow][nCol];
                if (piece){
                    if (piece.player != this.player)
                        moves.push([[nRow, nCol], "Take"]);
                    break;
                }
                else
                    moves.push([[nRow, nCol], "Move"]);
            }
        });

        return moves;
    }
    draw(row, col){
        let cell_width = this.chess.cvs.width / 8
        let cell_height = this.chess.cvs.height / 8

        if (this.player == 1)
            this.chess.ctx.drawImage(this.chess.img, 650, -6, this.chess.img.width/6 - 25, this.chess.img.height/2 - 25, col * cell_width, row * cell_height, cell_width, cell_height);
        else
            this.chess.ctx.drawImage(this.chess.img, 645, 320, this.chess.img.width/6 - 15, this.chess.img.height/2 - 15, col * cell_width, row * cell_height, cell_width, cell_height);
    }

    static Draw(row, col, player, cvs, img){
        let cell_width = cvs.width / 1
        let cell_height = cvs.height / 4
        let ctx = cvs.getContext("2d");

        if (player == 1)
            ctx.drawImage(img, 650, -6, img.width/6 - 25, img.height/2 - 25, col * cell_width, row * cell_height, cell_width, cell_height);
        else
            ctx.drawImage(img, 645, 320, img.width/6 - 15, img.height/2 - 15, col * cell_width, row * cell_height, cell_width, cell_height);
    }
}

class Rook {
    constructor(player, chess){
        this.chess = chess;
        this.player = player;
        this.pieceName = "Rook";
        this.moveCount = 0;
    }

    getMoves(row, col){
        let moves = [];
        let steps = [[-1, 0], [0, 1], [1, 0], [0, -1]];

        steps.forEach((step) => {
            let nRow = row, nCol = col;
            while (true){
                nRow += step[0];
                nCol += step[1];

                // check if cell is valid
                if (nRow < 0 || nRow >= this.chess.board.length || nCol < 0 || nCol >= this.chess.board[0].length)
                    break;

                let piece = this.chess.board[nRow][nCol];
                if (piece){
                    if (piece.player != this.player)
                        moves.push([[nRow, nCol], "Take"]);
                    break;
                }
                else
                    moves.push([[nRow, nCol], "Move"]);
            }
        });

        return moves;
    }
    draw(row, col){
        let cell_width = this.chess.cvs.width / 8
        let cell_height = this.chess.cvs.height / 8

        if (this.player == 1)
            this.chess.ctx.drawImage(this.chess.img, 1320, -6, this.chess.img.width/6 - 25, this.chess.img.height/2 - 25, col * cell_width, row * cell_height, cell_width, cell_height);
        else
            this.chess.ctx.drawImage(this.chess.img, 1320, 330, this.chess.img.width/6 - 25, this.chess.img.height/2 - 25, col * cell_width, row * cell_height, cell_width, cell_height);
    }

    static Draw(row, col, player, cvs, img){
        let cell_width = cvs.width / 1
        let cell_height = cvs.height / 4
        let ctx = cvs.getContext("2d");

        if (player == 1)
            ctx.drawImage(img, 1320, -6, img.width/6 - 25, img.height/2 - 25, col * cell_width, row * cell_height, cell_width, cell_height);
        else
            ctx.drawImage(img, 1320, 330, img.width/6 - 25, img.height/2 - 25, col * cell_width, row * cell_height, cell_width, cell_height);
    }
}

class Queen {
    constructor(player, chess){
        this.chess = chess;
        this.pieceName = "Queen";
        this.player = player;
    }

    getMoves(row, col){
        let moves = [];
        let steps = [[-1, 1], [1, 1], [1, -1], [-1, -1], [-1, 0], [0, 1], [1, 0], [0, -1]];

        steps.forEach((step) => {
            let nRow = row, nCol = col;
            while (true){
                nRow += step[0];
                nCol += step[1];

                // check if cell is valid
                if (nRow < 0 || nRow >= this.chess.board.length || nCol < 0 || nCol >= this.chess.board[0].length)
                    break;

                let piece = this.chess.board[nRow][nCol];
                if (piece){
                    if (piece.player != this.player)
                        moves.push([[nRow, nCol], "Take"]);
                    break;
                }
                else
                    moves.push([[nRow, nCol], "Move"]);
            }
        });

        return moves;
    }
    draw(row, col){
        let cell_width = this.chess.cvs.width / 8
        let cell_height = this.chess.cvs.height / 8

        if (this.player == 1)
            this.chess.ctx.drawImage(this.chess.img, 320, -5, this.chess.img.width/6 - 25, this.chess.img.height/2 - 25, col * cell_width, row * cell_height, cell_width, cell_height);
        else
            this.chess.ctx.drawImage(this.chess.img, 312, 328, this.chess.img.width/6 - 13, this.chess.img.height/2 - 15, col * cell_width, row * cell_height, cell_width, cell_height);
    }

    static Draw(row, col, player, cvs, img){
        let cell_width = cvs.width / 1
        let cell_height = cvs.height / 4
        let ctx = cvs.getContext("2d");

        if (player == 1)
            ctx.drawImage(img, 320, -5, img.width/6 - 25, img.height/2 - 25, col * cell_width, row * cell_height, cell_width, cell_height);
        else
            ctx.drawImage(img, 312, 328, img.width/6 - 13, img.height/2 - 15, col * cell_width, row * cell_height, cell_width, cell_height);
    }
}

class King {
    constructor(player, chess){
        this.chess = chess;
        this.pieceName = "King";
        this.player = player;
    }

    getMoves(row, col){
        let moves = [];
        let steps = [[-1, 1], [1, 1], [1, -1], [-1, -1], [-1, 0], [0, 1], [1, 0], [0, -1]];

        steps.forEach((step) => {
            let nRow = row, nCol = col;
            nRow += step[0];
            nCol += step[1];

            // check if cell is valid
            if (nRow >= 0 && nRow < this.chess.board.length && nCol >= 0 && nCol < this.chess.board[0].length){
                let piece = this.chess.board[nRow][nCol];
                if (piece){
                    if (piece.player != this.player)
                        moves.push([[nRow, nCol], "Take"]);
                }
                else
                    moves.push([[nRow, nCol], "Move"]);
            }
        });

        return moves;
    }
    draw(row, col){
        let cell_width = this.chess.cvs.width / 8
        let cell_height = this.chess.cvs.height / 8

        if (this.player == 1)
            this.chess.ctx.drawImage(this.chess.img, 0, 0, this.chess.img.width/6 - 52, this.chess.img.height/2 - 30, col * cell_width, row * cell_height, cell_width, cell_height);
        else
            this.chess.ctx.drawImage(this.chess.img, 0, 333, this.chess.img.width/6 - 52, this.chess.img.height/2 - 30, col * cell_width, row * cell_height, cell_width, cell_height);
    }

    static Draw(row, col, player, cvs, img){
        let cell_width = cvs.width / 1
        let cell_height = cvs.height / 4
        let ctx = cvs.getContext("2d");

        if (player == 1)
            ctx.drawImage(img, 0, 0, img.width/6 - 52, img.height/2 - 30, col * cell_width, row * cell_height, cell_width, cell_height);
        else
            ctx.drawImage(img, 0, 333, img.width/6 - 52, img.height/2 - 30, col * cell_width, row * cell_height, cell_width, cell_height);
    }
    static IsMoveSafeForKing(chess, move){
        let currentBoard = chess.board.map(arr => {
            return arr.slice();
        });
        let newBoard = chess.performLegalMove(move, currentBoard, true);
        let isSafe = !King.IsKingChecked(chess.player, newBoard);
        return isSafe;
    }
    static IsKingChecked(player, currentBoard){
        let kingPos = King.LocateKing(player, currentBoard);
        let row = kingPos[0], col = kingPos[1];
        let kingPiece = currentBoard[row][col];

        // must go through all checks to be considered unchecked
        // check knight squares, and check if there is enemy knight there
        let knightMoves=[[row - 2, col - 1],
                         [row - 2, col + 1],
                         [row - 1, col - 2],
                         [row + 1, col - 2],
                         [row + 2, col - 1],
                         [row + 2, col + 1],
                         [row - 1, col + 2],
                         [row + 1, col + 2]];
        for (let i = 0; i < knightMoves.length; i++){
            let r = knightMoves[i][0], c = knightMoves[i][1];

            // check first if knight move is in board
            if (r >= 0 && r < currentBoard.length && c >= 0 && c < currentBoard[0].length){
                // now check if there is enemy knight in the knight move cell
                let piece = currentBoard[r][c]
                if (piece && piece.pieceName == "Knight" && piece.player != kingPiece.player)
                    return true;
            }
        }

        // check for diagonal squares step by step, continue if own piece is found, else king is checked
        let diagSteps = [[-1, 1], [1, 1], [1, -1], [-1, -1]];
        
        for (let i = 0; i < diagSteps.length; i++){
            let step = diagSteps[i];
            let nRow = row, nCol = col;
            while (true){
                nRow += step[0];
                nCol += step[1];

                // check if cell is valid
                if (nRow < 0 || nRow >= currentBoard.length || nCol < 0 || nCol >= currentBoard[0].length)
                    break;

                let piece = currentBoard[nRow][nCol];
                if (piece){
                    if (piece.player != kingPiece.player && ((piece.pieceName == "Pawn" && i == 0) || piece.pieceName == "Bishop" || piece.pieceName == "Queen" || (piece.pieceName == "King" && i == 1)))
                        return true;
                    else
                        break;
                }
            }
        }

        
        // check for straight squares step by step, continue if own piece is found, else king is checked
        let straightSteps = [[-1, 0], [0, 1], [1, 0], [0, -1]];

        for (let i = 0; i < straightSteps.length; i++){
            let step = straightSteps[i];
            let nRow = row, nCol = col;
            while (true){
                nRow += step[0];
                nCol += step[1];

                // check if cell is valid
                if (nRow < 0 || nRow >= currentBoard.length || nCol < 0 || nCol >= currentBoard[0].length)
                    break;

                let piece = currentBoard[nRow][nCol];
                if (piece){
                    if (piece.player != kingPiece.player && (piece.pieceName == "Rook" || (piece.pieceName == "King" && i == 0) || piece.pieceName == "Queen"))
                        return true;
                    else
                        break;
                }
            }
        }

        return false;
    }
    static LocateKing(player, currentBoard){
        for (let r = 0; r < currentBoard.length; r++){
            for (let c = 0; c < currentBoard[r].length; c++){
                let piece = currentBoard[r][c];
                if (piece && piece.pieceName == "King" && piece.player == player)
                    return [r, c];
            }
        }
        return null;
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
        
        // bind this to event methods and save it so it can be removed
        this.mouseDownEvent = this.mouseDown.bind(this);
        this.cvs.addEventListener('mousedown', this.mouseDownEvent);

        
        // state fields/instance variables
        this.player = 1;
        this.player1TimeSecs = 600;
        this.player2TimeSecs = 600;

        this.currentPiece = null;
        this.currentPiecePos = null;
        this.currentMoves = null;

        this.promotionCanvas = null;

        this.pawnThatCanEnPassant = null;
    }

    drawBoard(){
        // draw cells
        for (let i = 0; i < 8; i++){
            for (let j = 0; j < 8; j++){
                this.drawCell(i, j);
            }
        }
        
        // set transparency of next drawings
        //this.ctx.globalAlpha = 0.4;
    }

    drawCell(row, col){
        let cell_width = this.cvs.width / 8
        let cell_height = this.cvs.height / 8

        this.ctx.fillStyle = (row + col) % 2 == 1 ? "#42352d" : "#ebdbd1";
        this.ctx.fillRect(col * cell_height, row  * cell_width, cell_width, cell_height);

        let piece = this.board[row][col];
        if (piece){
            piece.draw(row, col);
        }
    }

    drawLegalMovesIndicator(piece, r, c){
        if (!piece)
            return;
        
        let moves = piece.getMoves(r, c);
        
        let cell_width = this.cvs.width / 8;
        let cell_height = this.cvs.height / 8;

        moves.forEach((val) => {
            let row = val[0][0], col = val[0][1];

            // set transparency of next drawings
            this.ctx.globalAlpha = 0.5;

            this.ctx.beginPath();
            this.ctx.arc(col * cell_height + (cell_height / 2), row  * cell_width + (cell_width / 2), cell_width / 2 * .5, 0, 2 * Math.PI, false);
            this.ctx.fillStyle = '#7cd98e';
            this.ctx.fill();
            
            this.ctx.globalAlpha = 1;
        });

        // save state
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

                    // check if there's a pawn that can en passant, but player didn't en passant. Make that pawn unable to en passant anymore
                    if (this.pawnThatCanEnPassant && val[1] != "EnPassant"){
                        this.pawnThatCanEnPassant.enPassantPos = null;
                        this.pawnThatCanEnPassant = null;
                    }
                    this.performLegalMove(val);
                    return;
                }
            }
        }

        // erase previous moves indicator/highlights
        this.eraseLegalMovesIndicator();

        // save state and draw new indicator/highlights
        let piece = this.board[r][c];
        if (piece != null && piece.player != this.player)
            piece = null;

        this.currentPiece = piece;
        this.currentPiecePos = [r, c];

        this.drawLegalMovesIndicator(piece, r, c);
    }

    performLegalMove(move, board=this.board, simulated=false){ // simulated is for just passing own chess board and returning the move result change in that keyboard
        let row = move[0][0], col = move[0][1];
        let action = move[1];
        
        let cellsAffectedThatNeedRedraw = [];

        switch (action){
            case "Move":
                board[row][col] = this.currentPiece;
                board[this.currentPiecePos[0]][this.currentPiecePos[1]] = null;
                cellsAffectedThatNeedRedraw.push([row, col]);
                cellsAffectedThatNeedRedraw.push([this.currentPiecePos[0], this.currentPiecePos[1]]);

                // count rook and king moves for castle info
                if (this.currentPiece.pieceName == "Rook" || this.currentPiece.pieceName == "King" && !simulated)
                    this.currentPiece.moveCount++;
                // check if piece is a pawn
                if (this.currentPiece.pieceName == "Pawn" && !simulated){
                    this.currentPiece.moveCount++;

                    this.currentPiece.doubleStepped = Math.abs(this.currentPiecePos[0] - row) == 2;

                    // check if double stepped and 1st move, if so then check possible enemy pawns that can en passant this piece, save those pieces, 
                    // and if user didn't do en passant on the very next move, the saved pieces can't en passant anymore
                    if (this.currentPiece.doubleStepped && this.currentPiece.moveCount == 1){
                        let enPassants = [-1, 1];

                        for (let i = 0; i < enPassants.length; i++){
                            let nRow = row, nCol = col + enPassants[i];

                            // check if cell is valid
                            if (nRow >= 0 && nRow < board.length && nCol >= 0 && nCol < board[0].length){
                                let piece = board[nRow][nCol];
                                if (piece && this.currentPiece.player != piece.player){
                                    this.pawnThatCanEnPassant = piece;
                                    let rowAdjust = this.currentPiece.player == 1 ? -1 : 1;
                                    this.pawnThatCanEnPassant.enPassantPos = [this.currentPiecePos[0] + rowAdjust, this.currentPiecePos[1]];
                                    console.log(piece);
                                    break;
                                }
                            }
                        }
                    }

                    // check if promotion occurs
                    let isPromoting = this.player == 1 ? row == 0 : row == 1;
                    if (isPromoting){
                        move[1] = "Promote";
                        this.performLegalMove(move);
                        return;
                    }
                }
                break;
            case "Take":
                board[row][col] = this.currentPiece;
                board[this.currentPiecePos[0]][this.currentPiecePos[1]] = null;
                cellsAffectedThatNeedRedraw.push([row, col]);
                cellsAffectedThatNeedRedraw.push([this.currentPiecePos[0], this.currentPiecePos[1]]);
                
                // count rook and king moves for castle info
                if (this.currentPiece.pieceName == "Rook" || this.currentPiece.pieceName == "King" && !simulated)
                    this.currentPiece.moveCount++;
                // check if piece is a pawn
                if (this.currentPiece.pieceName == "Pawn" && !simulated){
                    this.currentPiece.moveCount++;

                    // check if promotion occurs
                    let isPromoting = this.player == 1 ? row == 0 : row == 7;
                    if (isPromoting){
                        move[1] = "Promote";
                        this.performLegalMove(move);
                        return;
                    }
                }
                break;
            case "Promote":
                var rect = this.cvs.getBoundingClientRect();

                // remove main canvas events, so only this promotion canvas events are listened, add events back on promotion (when user finished selecting promotion piece)
                this.cvs.removeEventListener('mousedown', this.mouseDownEvent);

                this.eraseLegalMovesIndicator();

                this.promotionCanvas = new PromotionCanvas(this, row, col, this.onPromotion.bind(this));
                return; // return instead of break, to only switch turns after user finishes selecting promotion piece. Switch turns using a callback instead
            case "EnPassant":
                board[row][col] = this.currentPiece;
                board[this.currentPiecePos[0]][this.currentPiecePos[1]] = null;
                let rowAdjust = this.player == 1 ? 1 : -1;
                board[row + rowAdjust][col] = null;
                cellsAffectedThatNeedRedraw.push([row, col]);
                cellsAffectedThatNeedRedraw.push([this.currentPiecePos[0], this.currentPiecePos[1]]);
                cellsAffectedThatNeedRedraw.push([row + rowAdjust][col]);
                break;
        }

        // redraw/reset states
        if (!simulated){
            cellsAffectedThatNeedRedraw.forEach((cell) =>{
                this.drawCell(cell[0], cell[1]);
            });
    
            this.eraseLegalMovesIndicator();
    
            this.currentPiece = null;
            this.currentPiecePos = null;
            this.currentMoves = null;
    
            this.player = this.player == 1 ? 2 : 1;
        }

        return board;
    }

    onPromotion(row, col, promotionPiece){
        // reset/change states
        this.currentPiece = null;
        this.currentPiecePos = null;
        this.currentMoves = null;

        this.player = this.player == 1 ? 2 : 1;

        this.board[row][col] = promotionPiece;
        this.drawCell(row, col);

        this.cvs.addEventListener('mousedown', this.mouseDownEvent);
        
        this.promotionCanvas.destructor();
        this.promotionCanvas.cvs.remove();
    }
}

class PromotionCanvas{
    constructor(chess, row, col, promotionCallback){
        this.chess = chess;
        this.player = chess.player;
        this.row = row;
        this.col = col;
        this.promotionCallback = promotionCallback;

        var rect = chess.cvs.getBoundingClientRect();
        var cvs = document.createElement('canvas');
        cvs.id     = "promotionCanvas";
        cvs.width  = chess.cvs.width / 8;
        cvs.height = chess.cvs.height / 2;
        
        var stylestring =  "position:absolute;\
                            top:"+rect.top+"px;\
                            left:"+((chess.cvs.width / 8) * col + rect.left)+"px;\
                            background-color:#eee;\
                            filter: drop-shadow(5px 5px 10px #222);\
                            border-radius:15px;";
        cvs.style.cssText = stylestring;

        document.body.append(cvs);
        Queen.Draw(0, 0, this.player, cvs, chess.img);
        Rook.Draw(1, 0, this.player, cvs, chess.img);
        Bishop.Draw(2, 0, this.player, cvs, chess.img);
        Knight.Draw(3, 0, this.player, cvs, chess.img);

        this.cvs = cvs;
        this.ctx = cvs.getContext("2d");

        // bind this to event methods and save it so it can be removed
        this.mouseDownEvent = this.mouseDown.bind(this);
        this.mouseMoveEvent = this.mouseMove.bind(this);
        this.cvs.addEventListener('mousedown', this.mouseDownEvent);
        this.cvs.addEventListener('mousemove', this.mouseMoveEvent);
        
        
        // state fields
        this.currentCellHovered = null;
    }
    mouseDown(event){
        var rect = this.cvs.getBoundingClientRect();
        var x = event.pageX - rect.left, y = event.pageY - rect.top;
        let cell_width = this.cvs.width;
        let cell_height = this.cvs.height / 4;

        let r = Math.floor(y / cell_height), c = Math.floor(x / cell_width);

        // get the appropriate piece for that cell
        let promotionPiece = null;
        switch(r){
            case 0:
                promotionPiece = new Queen(this.player, this.chess);
                break;
            case 1:
                promotionPiece = new Rook(this.player, this.chess);
                break;
            case 2:
                promotionPiece = new Bishop(this.player, this.chess);
                break;
            case 3:
                promotionPiece = new Knight(this.player, this.chess);
                break;
        }

        this.promotionCallback(this.row, this.col, promotionPiece);
    }
    mouseMove(event){
        var rect = this.cvs.getBoundingClientRect();
        var x = event.pageX - rect.left, y = event.pageY - rect.top;
        let cell_width = this.cvs.width;
        let cell_height = this.cvs.height / 4;

        let r = Math.floor(y / cell_height), c = Math.floor(x / cell_width);

        if (this.currentCellHovered == null){
            this.drawCell(r, c, true);
            this.currentCellHovered = r;
        }
        else{
            this.drawCell(this.currentCellHovered, c);
            this.drawCell(r, c, true);

            this.currentCellHovered = r;
        }
    }
    drawCell(row, col, highlighted=false){
        let cell_width = this.cvs.width;
        let cell_height = this.cvs.height / 4;

        // draw the cell first
        this.ctx.fillStyle = highlighted ? "#444" : "#eee";
        this.ctx.fillRect(col * cell_height, row  * cell_width, cell_width, cell_height);

        // draw the appropriate piece for that cell
        switch(row){
            case 0:
                Queen.Draw(0, 0, this.player, this.cvs, this.chess.img);
                break;
            case 1:
                Rook.Draw(1, 0, this.player, this.cvs, this.chess.img);
                break;
            case 2:
                Bishop.Draw(2, 0, this.player, this.cvs, this.chess.img);
                break;
            case 3:
                Knight.Draw(3, 0, this.player, this.cvs, this.chess.img);
                break;
        }
    }
    destructor(){
        this.cvs.removeEventListener('mousedown', this.mouseDownEvent);
        this.cvs.removeEventListener('mousemove', this.mouseMoveEvent);
    }
}