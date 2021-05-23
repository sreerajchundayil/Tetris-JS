class Board
{
  constructor(rowSize,columnSize,emptyColor,sqSize)
  {
    this.rowSize = rowSize/sqSize;
    this.columnSize = columnSize/sqSize;
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


  DrawSqaure(x,y,color)
  {
    ctx.fillStyle = color;
    ctx.fillRect(x*this.sqSize,y*this.sqSize,this.sqSize,this.sqSize);
    ctx.strokeStyle = "BLACK";
    ctx.strokeRect(x*this.sqSize,y*this.sqSize,this.sqSize, this.sqSize);
  }

}



class Stats 
{
  constructor(rowSize,columnSize,emptyColor,sqSize)
  {
    this.rowSize = rowSize/sqSize;
    this.columnSize = columnSize/sqSize;
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


  DrawSqaure(x,y,color)
  {
    ctxMini.fillStyle = color;
    ctxMini.fillRect(x*this.sqSize,y*this.sqSize,this.sqSize,this.sqSize);
    ctxMini.strokeStyle = "BLACK";
    ctxMini.strokeRect(x*this.sqSize,y*this.sqSize,this.sqSize, this.sqSize);
  }

  DrawPiece(piece)
  {
    let color = piece.tetrimino[1] ;
    for(let r = 0; r < piece.tetrimino[0][piece.type].length; r++)
    {
      for(let c = 0; c < piece.tetrimino[0][piece.type].length; c++)
      {
        if(piece.tetrimino[0][piece.type][r][c] == 1)
        {
          //y has -1 as index, adding +1
            this.DrawSqaure(piece.x+c, piece.y+r+1, color); //x is from left, means it's the column and y is from up means the row
        }
      }
    }
  }

}
