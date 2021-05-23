class Board
{
  constructor(rowSize,columnSize,emptyColor,sqSize)
  {
    this.rowSize = rowSize;
    this.columnSize = columnSize;
    this.emptyColor = emptyColor;
    this.sqSize = sqSize;
    this.board = [];
 
    for(let r = 0; r < this.rowSize; r++)
    {
      this.board[r] = [];
      for(let c = 0; c < this.columnSize; c++)
      {
        this.board[r][c] = this.emptyColor;
      }
    }
  }

  DrawGridOnBoard()
  {
    for(let r = 0; r < this.rowSize; r++)
    {
      for(let c = 0; c < this.columnSize; c++)
      {
          this.DrawSqaure(c,r, this.board[r][c]);
      }
    }
  }

  DrawPiece(piece)
  {
    let color = piece.tetrimino[1] ;
    //console.log(piece.tetrimino[0][piece.type]);
    for(let r = 0; r < piece.tetrimino[0][piece.type].length; r++)
    {
      for(let c = 0; c < piece.tetrimino[0][piece.type].length; c++)
      {
          if(piece.tetrimino[0][piece.type][r][c] == 1)
            this.DrawSqaure(piece.x+c, piece.y+r, color); //x is from left, means it's the column and y is from up means the row
      }
    }
  }

  DrawSqaure(x,y,color)
  {
    ctx.fillStyle = color;
    ctx.fillRect(x*this.sqSize,y*this.sqSize,this.sqSize,this.sqSize);
    ctx.strokeStyle = "BLACK";
    ctx.strokeRect(x*this.sqSize,y*this.sqSize,this.sqSize, this.sqSize);
  }

}
