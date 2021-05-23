const cvs = document.getElementById("tetris");
const ctx = cvs.getContext("2d");

const ROW = 20;
const COL = 15;
const EMPTY = "WHITE"
const SQSIZE = 40;

function drawSqaure(x,y,color)
{
  ctx.fillStyle = color;
  ctx.fillRect(x*SQSIZE,y*SQSIZE,SQSIZE, SQSIZE);
  ctx.strokeStyle = "BLACK";
  ctx.strokeRect(x*SQSIZE,y*SQSIZE,SQSIZE, SQSIZE);
}

let board = [];

function CreateBoard()
{
  for(r = 0; r < ROW; r++)
  {
    board[r] = [];
    for(c = 0; c < COL; c++)
    {
      board[r][c] = EMPTY;
    }
  }
}

function DrawGridOnBoard()
{
  for(r = 0; r < ROW; r++)
  {
    for(c = 0; c < COL; c++)
    {
        drawSqaure(c,r, board[r][c]);
    }
  }
}

CreateBoard();
DrawGridOnBoard();


