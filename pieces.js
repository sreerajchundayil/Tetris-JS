let stopAnimation = false;
let GlobalPiece = null
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
  "blue" 

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
  "red"

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
  "green" 
]

const AllPattern =
[
  PiecePatternL,
  PiecePatternI,
  PiecePatternT
]

class Piece
{
  constructor(board, tetriminos, type = 0)
  {
    this.board = board;
    this.tetrimino = tetriminos;
    this.type = type;
    this.x = 0;
    this.y = -1;
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
            this.board.DrawSqaure(this.x+c, this.y+r, "white"); //x is from left, means it's the column and y is from up means the row
      }
    }
  }
  
  MoveDown()
  {
    if(stopAnimation)
      return;

    console.log(stopAnimation);

    if(this.CollisionDetection(0,1))
    {
      //Check whether complete object can be presented
      let objectSize = this.tetrimino[0][this.type][0].length;
      console.log(objectSize);

      for(let column = 0; column < objectSize; column++)
      {
        if(this.board.board[column][objectSize-1] != "white")
        {
          stopAnimation = true;
          return;
        }
      }
      this.Lock();
      return true;
    }
    else
    {
      this.UnDrawPiece();
      this.y++;
      this.DrawPiece();
      return false;
    }
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
    let toBeTetrimino = new Piece(this.board, this.tetrimino, (this.type+1)%4);
    toBeTetrimino.y = 0;
    if(toBeTetrimino.CollisionDetection(0,0))
    {
      return;
    }
    this.UnDrawPiece();
    this.type = (this.type+1)%4;
    this.DrawPiece();
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
        if(newX < 0 || newY < 0)
        {
          return true;
        }

        if( newX < this.board.columnSize && newY < this.board.rowSize && this.board.board[newY][newX] != "white")
        {
          return true;
        }
        
        if( newX >= this.board.columnSize || newY >= this.board.rowSize)
        {
          return true;
        }

        if(newY < 0)
        {
          continue;
        }
 
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
            let newX = this.x + c ;
            let newY = this.y + r ;
            this.board.board[newY][newX] = color;
            this.board.DrawSqaure(newX, newY, color); //x is from left, means it's the column and y is from up means the row
          }
      }
    }
  }

}

function RandomPiece()
{
  let r = Math.floor(Math.random() * AllPattern.length);
  return AllPattern[r];
}

