
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
  constructor(tetriminos)
  {
    this.tetrimino = tetriminos;
    this.type = 0;
    this.x = 0;
    this.y = 0;
    console.log("Piece creation done");
  }
}

