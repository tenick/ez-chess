
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

    static Draw(row, col, player, cvs, img){
        let cell_width = cvs.width / 1
        let cell_height = cvs.height / 4
        let ctx = cvs.getContext("2d");

        if (player == 1)
            ctx.drawImage(img, 0, 0, img.width/6 - 52, img.height/2 - 30, col * cell_width, row * cell_height, cell_width, cell_height);
        else
            ctx.drawImage(img, 0, 333, img.width/6 - 52, img.height/2 - 30, col * cell_width, row * cell_height, cell_width, cell_height);
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
            this.ctx.globalAlpha = 0.4;

            this.ctx.beginPath();
            this.ctx.arc(col * cell_height + (cell_height / 2), row  * cell_width + (cell_width / 2), cell_width / 2 * .5, 0, 2 * Math.PI, false);
            this.ctx.fillStyle = '#7cd98e';
            this.ctx.fill();
            
            this.ctx.globalAlpha = 1;
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
        let row = move[0][0], col = move[0][1];
        let action = move[1];
        
        switch (action){
            case "Move":
                this.board[row][col] = this.currentPiece;
                this.board[this.currentPiecePos[0]][this.currentPiecePos[1]] = null;
                this.drawCell(row, col);
                this.drawCell(this.currentPiecePos[0], this.currentPiecePos[1]);

                // check if piece is a pawn
                if (this.currentPiece.pieceName == "Pawn"){
                    this.currentPiece.moveCount++;

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
                this.board[row][col] = this.currentPiece;
                this.board[this.currentPiecePos[0]][this.currentPiecePos[1]] = null;
                this.drawCell(row, col);
                this.drawCell(this.currentPiecePos[0], this.currentPiecePos[1]);
                
                // check if piece is a pawn
                if (this.currentPiece.pieceName == "Pawn"){
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
        }

        // reset/change states
        this.eraseLegalMovesIndicator();

        this.currentPiece = null;
        this.currentPiecePos = null;
        this.currentMoves = null;

        this.player = this.player == 1 ? 2 : 1;
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