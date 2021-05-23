
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
  constructor(tetriminos, board)
  {
    this.board = board;
    this.tetrimino = tetriminos;
    this.type = 0;
    this.x = 0;
    this.y = 0;
    console.log("Piece creation done");
  }
  
  DrawPiece()
  {
    let color = this.tetrimino[1] ;
    //console.log(piece.tetrimino[0][piece.type]);
    for(let r = 0; r < this.tetrimino[0][this.type].length; r++)
    {
      for(let c = 0; c < this.tetrimino[0][this.type].length; c++)
      {
          if(this.tetrimino[0][this.type][r][c] == 1)
            this.board.DrawSqaure(this.x+c, this.y+r, color); //x is from left, means it's the column and y is from up means the row
      }
    }
  }
}

