let stopAnimation = false;
const PiecePatternI =
[
  [
    [
      [1,0,0,0],
      [1,0,0,0],
      [1,0,0,0],
      [1,0,0,0]
    ],
    [
      [1,1,1,1],
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0]
    ],
    [
      [1,0,0,0],
      [1,0,0,0],
      [1,0,0,0],
      [1,0,0,0]
    ],
    [
      [1,1,1,1],
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0]
    ]
  ]
  ,
  ["BLUE"]

]

const PiecePatternL =
[
  [
    [
      [1,0,0],
      [1,0,0],
      [1,1,0]
    ],
    [
      [1,1,1],
      [1,0,0],
      [0,0,0]
    ],
    [
      [0,1,1],
      [0,0,1],
      [0,0,1]
    ],
    [
      [0,0,0],
      [0,0,1],
      [1,1,1]
    ]
  
  ]
  ,
  ["RED"]

]

const PiecePatternT =
[
  [
    [
      [1,1,1],
      [0,1,0],
      [0,1,0]
    ],
    [
      [0,0,1],
      [1,1,1],
      [0,0,1]
    ],
    [
      [0,1,0],
      [0,1,0],
      [1,1,1]
    ],
    [
      [1,0,0],
      [1,1,1],
      [1,0,0]
    ]
  
  ]
  ,
  ["GREEN"]

]

class Piece
{
  constructor(board, tetriminos, type = 0)
  {
    this.board = board;
    this.tetrimino = tetriminos;
    this.type = type;
    this.x = 0;
    this.y = 0;
    this.locked = false;
    this.dropStart = Date.now();
  }
  
  DrawPiece()
  {
    let color = this.tetrimino[1] ;
    for(let r = 0; r < this.tetrimino[0][this.type].length; r++)
    {
      for(let c = 0; c < this.tetrimino[0][this.type].length; c++)
      {
          if(this.tetrimino[0][this.type][r][c] == 1)
            this.board.DrawSqaure(this.x+c, this.y+r, color); //x is from left, means it's the column and y is from up means the row
      }
    }
  }

  UnDrawPiece()
  {
    for(let r = 0; r < this.tetrimino[0][this.type].length; r++)
    {
      for(let c = 0; c < this.tetrimino[0][this.type].length; c++)
      {
          if(this.tetrimino[0][this.type][r][c] == 1)
            this.board.DrawSqaure(this.x+c, this.y+r, "WHITE"); //x is from left, means it's the column and y is from up means the row
      }
    }
  }
  
  MoveDown()
  {
    if(this.locked)
      return;
    if(this.CollisionDetection(0,1))
    {
      this.Lock();
      return;
    }
    
    this.UnDrawPiece();
    this.y++;
    this.DrawPiece();
  }
  
  MoveLeft()
  {
    if(this.locked)
      return;
    if(this.CollisionDetection(-1,0))
    {
      return;
    }
    
    this.UnDrawPiece();
    this.x--;
    this.DrawPiece();
  }
  
  MoveRight()
  {
    if(this.locked)
      return;
    if(this.CollisionDetection(1,0))
    {
      return;
    }
    this.UnDrawPiece();
    this.x++;
    this.DrawPiece();
  }

  Rotate()
  {
    if(this.locked)
      return;
    let toBeTetrimino = new Piece(this.board, this.tetrimino, (this.type+1)%4);
    if(toBeTetrimino.CollisionDetection(0,0))
    {
      return;
    }
    this.UnDrawPiece();
    this.type = (this.type+1)%4;
    this.DrawPiece();
  }

  
  Drop()
  {
    let now = Date.now();
    let delta = now - this.dropStart;
    if(delta > 1000)
    {
      this.MoveDown();
      this.dropStart = now;
    }

    if(this.y >= (this.board.rowSize - this.tetrimino[0][this.type].length))
      return; 
    if(stopAnimation == false)
      requestAnimationFrame(this.Drop.bind(this)); //requestAnimationFrame(()=>this.loop());
    else
      return;
  }

  CollisionDetection(x,y)
  {
    for(let r = 0 ; r < this.tetrimino[0][this.type].length; r++)
    {
      for(let c = 0 ; c < this.tetrimino[0][this.type].length; c++)
      {
        if(!this.tetrimino[0][this.type][r][c])
          continue;
        let newX = this.x + c + x;
        let newY = this.y + r + y;

        if(newX < 0 || newX >= this.board.colSize || newY >= this.board.rowSize)
          return true;

        if(newY < 0)
          continue;

        if(this.board.board[newY][newX] != "white")
          return true;
      }
    }
    return false;
  }

  Lock()
  {
    this.locked = true;
    let color = this.tetrimino[1];
    //Give board piece Color
    for(let r = 0; r < this.tetrimino[0][this.type].length; r++)
    {
      for(let c = 0; c < this.tetrimino[0][this.type].length; c++)
      {
          if(this.tetrimino[0][this.type][r][c] == 1)
          {
            this.board.DrawSqaure(this.x+c, this.y+r, color); //x is from left, means it's the column and y is from up means the row
          }
      }
    }
    stopAnimation = true; 
  }

}

