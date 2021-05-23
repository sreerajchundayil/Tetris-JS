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
