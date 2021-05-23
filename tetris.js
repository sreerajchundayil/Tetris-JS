
function Drop()
{
  let now = Date.now();
  let delta = now - GlobalPiece.dropStart;
  if(delta > 500)
  {
    if(GlobalPiece.MoveDown())
    {
      GlobalPiece = GlobalNextPiece;
      GlobalNextPiece = new Piece(board, RandomPiece());
      boardMini.DrawGridOnBoard();
      boardMini.DrawPiece(GlobalNextPiece);
    }

    GlobalPiece.dropStart = now;
  }
  
  if(stopAnimation)
    return;
  requestAnimationFrame(Drop); //requestAnimationFrame(()=>this.loop());
}

const cvs = document.getElementById("tetris");
const ctx = cvs.getContext("2d");
const board  = new Board(800,600,"white",40)

board.DrawGridOnBoard();


GlobalPiece = new Piece(board, RandomPiece());
GlobalNextPiece = new Piece(board, RandomPiece());

const cvsMini = document.getElementById("tetrinom");
const ctxMini = cvsMini.getContext("2d");
const boardMini  = new Stats(160,160,"white",40)
boardMini.DrawGridOnBoard();
boardMini.DrawPiece(GlobalNextPiece);


document.addEventListener("keydown",CONTROL);

function CONTROL(event)
{
  if(stopAnimation)
    return;
  if(event.keyCode == 37)
  {
    GlobalPiece.MoveLeft();
  }
  else if(event.keyCode == 38)
  {
    GlobalPiece.Rotate();
  }
  else if(event.keyCode == 39)
  {
    GlobalPiece.MoveRight();
  }
  else if(event.keyCode == 40)
  {
    console.log("MoveDown");
    GlobalPiece.MoveDown();
  }
}


Drop();
