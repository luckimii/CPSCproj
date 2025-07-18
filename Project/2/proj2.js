let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");



function Piece(row,col,color,isClicked,isKing){
    this.row = row;
    this.col = col;
    this.color = color;
    this.isClicked = isClicked;
    this.isKing = isKing;

    
}
