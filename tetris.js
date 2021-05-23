const cvs = document.getElementById("tetris");
const ctx = cvs.getContext("2d");



const board  = new Board(800,600,"white",40)
board.DrawGridOnBoard();

let piece1 = new Piece(board, PiecePatternL);
let piece2 = new Piece(board, PiecePatternI);


piece1.Drop();

document.addEventListener("keydown",CONTROL);

function CONTROL(event)
{
  if(event.keyCode == 37)
  {
    piece1.MoveLeft();
  }
  else if(event.keyCode == 38)
  {
    piece1.Rotate();
  }
  else if(event.keyCode == 39)
  {
    piece1.MoveRight();
  }
  else if(event.keyCode == 40)
  {
    piece1.MoveDown();
  }
}
