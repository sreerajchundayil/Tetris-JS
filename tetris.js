const cvs = document.getElementById("tetris");
const ctx = cvs.getContext("2d");


const board  = new Board(400,80,"white",40)
board.DrawGridOnBoard();

let piece1 = new Piece(PiecePatternT, board);
let piece2 = new Piece(PiecePatternI, board);
piece1.DrawPiece();
piece2.DrawPiece();



