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

function Piece(row, col, color) {
  this.row = row;
  this.col = col;
  this.color = color;
  this.isClicked = false;
  this.isKing = false;

  this.draw = function () {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.col * 100 + 50, this.row * 100 + 50, 35, 0, Math.PI * 2);
    ctx.fill();
  };
}

//for testing
for (let i = 0; i < cBoard.length; i++) {
  for (let j = 0; j < cBoard[i].length; j++) {
    if (cBoard[i][j] == "red") {
      cBoard[i][j] = new Piece(i, j, "red");
    }
    if (cBoard[i][j] == "grey") {
      cBoard[i][j] = new Piece(i, j, "grey");
    }
    if (cBoard[i][j] != "") {
      cBoard[i][j].draw();
    }
  }
}
