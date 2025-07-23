let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let cBoard = [];
cBoard[0] = ["", "red", "", "red", "", "red", "", "red"];
cBoard[1] = ["red", "", "red", "", "red", "", "red", ""];
cBoard[2] = ["", "red", "", "red", "", "red", "", "red"];
cBoard[3] = ["", "", "", "", "", "", "", ""];
cBoard[4] = ["", "", "", "", "", "", "", ""];
cBoard[5] = ["grey", "", "grey", "", "grey", "", "grey", ""];
cBoard[6] = ["", "grey", "", "grey", "", "grey", "", "grey"];
cBoard[7] = ["grey", "", "grey", "", "grey", "", "grey", ""];

function drawBoard() {
  for (let y = 0; y < cBoard.length; y++) {
    if (y % 2 == 0) {
      for (let i = 0; i < cBoard.length; i++) {
        if (i % 2 == 0) {
          ctx.fillStyle = "white";
          ctx.fillRect(i * 100, y * 100, 100, 100);
        } else {
          ctx.fillStyle = "black";
          ctx.fillRect(i * 100, y * 100, 100, 100);
        }
      }
    } else {
      for (let i = 0; i < cBoard.length; i++) {
        if (i % 2 == 0) {
          ctx.fillStyle = "black";
          ctx.fillRect(i * 100, y * 100, 100, 100);
        } else {
          ctx.fillStyle = "white";
          ctx.fillRect(i * 100, y * 100, 100, 100);
        }
      }
    }
  }
}

drawBoard();

canvas.onclick = (event) => {
  let clickX = Math.floor(event.offsetX / 100);
  let clickY = Math.floor(event.offsetY / 100);
  console.log("X: " + clickX + " Y: " + clickY);
  console.log(cBoard[clickY][clickX]);
  if (cBoard[clickY][clickX] != "") {
    let selectedPiece = getSelectedPiece();
    if (selectedPiece != null) {
      selectedPiece.isClicked = !selectedPiece.isClicked;
    } else if (selectedPiece == null) {
      cBoard[clickY][clickX].isClicked = !cBoard[clickY][clickX].isClicked;
    }
  } else if (cBoard[clickY][clickX] == "") {
  }
  drawBoard();
  drawPieces();
};

function Piece(row, col, color) {
  this.row = row;
  this.col = col;
  this.color = color;
  this.isClicked = false;
  this.isKing = false;

  this.draw = function () {
    if (this.isClicked) {
      ctx.fillStyle = "yellow";
      ctx.beginPath();
      ctx.arc(this.col * 100 + 50, this.row * 100 + 50, 40, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.col * 100 + 50, this.row * 100 + 50, 35, 0, Math.PI * 2);
    ctx.fill();
  };

  this.checkKing = function (){
    if(this.color == "red" && this.row == 7){
        this.isKing = true;
    }
    if(this.color == "grey" && this.row == 0){
        this.isKing = true;
    }

  }
}


function instantiatePieces() {
  for (let y = 0; y < cBoard.length; y++) {
    for (let x = 0; x < cBoard[y].length; x++) {
      if (cBoard[y][x] == "red") {
        cBoard[y][x] = new Piece(y, x, "red");
      }
      if (cBoard[y][x] == "grey") {
        cBoard[y][x] = new Piece(y, x, "grey");
      }
      if (cBoard[y][x] != "") {
        cBoard[y][x].draw();
      }
    }
  }
}

function drawPieces() {
  for (let y = 0; y < cBoard.length; y++) {
    for (let x = 0; x < cBoard[y].length; x++) {
      if (cBoard[y][x] != "") {
        cBoard[y][x].draw();
      }
    }
  }
}
function getSelectedPiece() {
  let selectedPiece = null;
  for (let y = 0; y < cBoard.length; y++) {
    for (let x = 0; x < cBoard[y].length; x++) {
      if (cBoard[y][x].isClicked) {
        selectedPiece = cBoard[y][x];
      }
    }
  }
  return selectedPiece;
}

instantiatePieces();
drawPieces();
