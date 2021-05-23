const cvs = document.getElementById("tetris");
const ctx = cvs.getContext("2d");


const board  = new Board(400,80,"white",40)
board.DrawGridOnBoard();

let piece1 = new Piece(PiecePatternT);
let piece2 = new Piece(PiecePatternI);
board.DrawPiece(piece1);
board.DrawPiece(piece2);



