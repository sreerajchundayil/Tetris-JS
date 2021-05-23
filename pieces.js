let stopAnimation = false;
let score = 0;
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

const PiecePatternJ =
[
  [
    [
      [0,0,1],
      [0,0,1],
      [0,1,1]
    ],
    [
      [0,0,0],
      [1,0,0],
      [1,1,1]
    ],
    [
      [1,1,0],
      [1,0,0],
      [1,0,0]
    ],
    [
      [1,1,1],
      [0,0,1],
      [0,0,0]
    ]
  
  ]
  ,
  "red"

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

const PiecePatternS =
[
  [
    [
      [0,1,1],
      [1,1,0],
      [0,0,0]
    ],
    [
      [0,1,0],
      [0,1,1],
      [0,0,1]
    ],
    [
      [0,0,0],
      [0,1,1],
      [1,1,0]
    ],
    [
      [1,0,0],
      [1,1,0],
      [0,1,0]
    ]
  
  ]
  ,
  "magenta" 
]


const PiecePatternO =
[
  [
    [
      [1,1],
      [1,1]
    ],
    [
      [1,1],
      [1,1]
    ],
    [
      [1,1],
      [1,1]
    ],
    [
      [1,1],
      [1,1]
    ]
  ]
  ,
  "yellow" 
]

const AllPattern =
[
  PiecePatternL,
  PiecePatternI,
  PiecePatternJ,
  PiecePatternO,
  PiecePatternS,
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
    if(this.CollisionDetection(0,1))
    {
      //Check whether complete object can be presented
      let objectSize = this.tetrimino[0][this.type][0].length;
      for(let column = 0; column < objectSize; column++)
      {
        if(this.board.board[column][objectSize-1] != "white")
        {
          stopAnimation = true;
          scoreBoardCtx.font = "30px Arial";
          scoreBoardCtx.clearRect(0,0,160,160);
          scoreBoardCtx.fillText("Game Over",80,100);
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
    toBeTetrimino.x = this.x;
    toBeTetrimino.y = this.y;
    if(toBeTetrimino.CollisionDetection(0,0))
    {
      return;
    }
    else
    {
      this.UnDrawPiece();
      this.type = (this.type+1)%4;
      this.DrawPiece();
    }
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

        if( (newX < this.board.columnSize) && (newY < this.board.rowSize) && (this.board.board[newY][newX] != "white"))
        {
          return true;
        }
       
        if( (newX >= this.board.columnSize) 
          || (newY >= this.board.rowSize)) 
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

    //Remove full rows
    for(let r = 0; r < this.board.rowSize; r++) 
    {
      let isRowFull = true;
      for(let c = 0; c < this.board.columnSize; c++)
        isRowFull = isRowFull && (this.board.board[r][c] != "white"); 

      if(isRowFull)
      {
        for( let row = r; row > 1; row --)
        {
          for( let c = 0; c < this.board.columnSize; c++)
            this.board.board[row][c] = this.board.board[row-1][c] 
        }
        for(let c = 0; c <  this.board.columnSize; c++)
          this.board.board[0][c] = "white";
        score += 10;
      }
    }

    this.board.DrawGridOnBoard();
    scoreBoardCtx.clearRect(0,0,160,160);
    scoreBoardCtx.fillText(score,80,100);
  }

}

function RandomPiece()
{
  let r = Math.floor(Math.random() * AllPattern.length);
  return AllPattern[r];
}

