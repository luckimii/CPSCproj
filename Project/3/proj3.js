let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

const TAU = Math.PI * 2;

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
      selectedPiece.isClicked = false;
    }
    cBoard[clickY][clickX].isClicked = true;
  } else if (cBoard[clickY][clickX] == "") {
    let selectedPiece = getSelectedPiece();

    if (selectedPiece != null) {
      if (selectedPiece.isValidMove(clickY, clickX)) {
        selectedPiece.move(clickY, clickX);

        selectedPiece.isClicked = false;
      } else {
        console.log("Invalid move!");
        alert("Invalid move!");
      }
    }
  }
  drawBoard();
  drawPieces();
};

const SQUAREWIDTH = 100;
const CENTEROFFSET = 50;
const SELECTRADIUS = 40;
const PIECERADIUS = 35;

function Piece(row, col, color) {
  this.row = row;
  this.col = col;
  this.color = color;
  this.isClicked = false;
  this.isKing = false;

  this.draw = function() {
    if (this.isClicked) {
      ctx.fillStyle = "yellow";
      ctx.beginPath();
      ctx.arc(
        this.col * SQUAREWIDTH + CENTEROFFSET,
        this.row * SQUAREWIDTH + CENTEROFFSET,
        SELECTRADIUS,
        0,
        TAU,
      );
      ctx.fill();
    }
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.col * SQUAREWIDTH + CENTEROFFSET,
      this.row * SQUAREWIDTH + CENTEROFFSET,
      PIECERADIUS,
      0,
      TAU,
    );
    ctx.fill();
    if (this.isKing) {
      ctx.fillStyle = "white";
      ctx.strokeStyle = "white";
      ctx.beginPath();
      ctx.arc(
        this.col * SQUAREWIDTH + CENTEROFFSET - 10,
        this.row * SQUAREWIDTH + CENTEROFFSET,
        5,
        0,
        TAU,
      );
      ctx.fill();
      ctx.beginPath();
      ctx.arc(
        this.col * SQUAREWIDTH + CENTEROFFSET + 10,
        this.row * SQUAREWIDTH + CENTEROFFSET,
        5,
        0,
        TAU,
      );
      ctx.fill();
      ctx.beginPath();
      ctx.arc(
        this.col * SQUAREWIDTH + CENTEROFFSET,
        this.row * SQUAREWIDTH + CENTEROFFSET + 10,
        5,
        0,
        Math.PI,
      );
      ctx.lineWidth = 5;
      ctx.stroke();
    }
  };

  this.checkKing = function() {
    if (this.color == "red" && this.row == 7) {
      this.isKing = true;
    }
    if (this.color == "grey" && this.row == 0) {
      this.isKing = true;
    }
  };
  this.move = function(newRow, newCol) {
    cBoard[this.row][this.col] = "";

    if (newRow == this.row + 2) {
      let middleRow = this.row + 1;
      let middleCol = newCol > this.col ? this.col + 1 : this.col - 1;
      cBoard[middleRow][middleCol] = "";
    } else if (newRow == this.row - 2) {
      let middleRow = this.row - 1;
      let middleCol = newCol > this.col ? this.col + 1 : this.col - 1;
      cBoard[middleRow][middleCol] = "";
    }

    this.row = newRow;
    this.col = newCol;
    cBoard[newRow][newCol] = this;
    this.checkKing();
  };

  this.isValidMove = function(newRow, newCol) {
    if (cBoard[newRow][newCol] == "white") {
      return false;
    }
    if (cBoard[newRow][newCol] != "") {
      return false;
    }

    if (
      (this.color == "red" || this.isKing) &&
      newRow == this.row + 1 &&
      (newCol == this.col + 1 || newCol == this.col - 1)
    ) {
      return true;
    }

    if (
      (this.color == "grey" || this.isKing) &&
      newRow == this.row - 1 &&
      (newCol == this.col + 1 || newCol == this.col - 1)
    ) {
      return true;
    }

    if (
      (this.color == "red" || this.isKing) &&
      newRow == this.row + 2 &&
      (newCol == this.col + 2 || newCol == this.col - 2)
    ) {
      let middleRow = this.row + 1;
      let middleCol = newCol > this.col ? this.col + 1 : this.col - 1;
      let middlePiece = cBoard[middleRow][middleCol];
      if (middlePiece != "" && middlePiece.color == "grey") {
        return true;
      }
    }

    if (this.color == "grey" || this.isKing) {
      if (
        newRow == this.row - 2 &&
        (newCol == this.col + 2 || newCol == this.col - 2)
      ) {
        let midRow = this.row - 1;
        let midCol = newCol > this.col ? this.col + 1 : this.col - 1;
        let middlePiece = cBoard[midRow][midCol];
        if (middlePiece != "" && middlePiece.color == "red") {
          return true;
        }
      }
    }

    return false;
  };
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
