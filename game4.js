class Cell {
    constructor(alive) {
        this.alive = alive;
    }
}

class Board {
    constructor(size) {
        this.width = size.width;
        this.height = size.height;
        this.rows = new Array(this.height);
        this.rows.fill(new Array(this.width));
        this.rows.forEach(row => {
            row.fill(new Cell(false));
        });
    }

    get print() {
        this.rows.forEach(row => {
            let string = "";
            row.forEach(cell => {
                if (cell.alive) {
                    string += "x";
                } else {
                    string += " ";
                }
                string += "|";
            })
            console.log(string);
        });
    }
}

var initSize = {width: 10, height:10};

var initBoard = new Board(initSize);

initBoard.print;