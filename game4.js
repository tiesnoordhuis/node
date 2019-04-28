class Cell {
    constructor(alive) {
        this.alive = alive;
        this.neighbours = 0;
        this.setCycle = 0;
        this.complexity = 0;
    }

    setCell(alive, cycle) {
        if (alive != this.alive) {
            if (alive) {
                this.revive();
            } else {
                this.kill();
            }
            this.complexity = 1 - (1 / (cycle - this.setCycle + 1));
            this.setCycle = cycle;
        } else {
            this.complexity = 0;
        }
    }

    revive() {
        this.alive = true;
    }

    kill() {
        this.alive = false;
    }

    
}

class Board {
    constructor(size) {
        this.cycle = 0;
        this.complexity = 0;
        this.width = size.width;
        this.height = size.height;
        this.rows = new Array(this.height);
        for (let row = 0; row < this.rows.length; row++) {
            this.rows[row] = new Array(this.width);
            for (let column = 0; column < this.rows[row].length; column++) {
                this.rows[row][column] = new Cell(false);
            }
        }
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
        console.log("");
    }

    setCell(position, alive, cycle = 0) {
        this.rows[position.row][position.column].setCell(alive, cycle);
    }

    doCycle() {
        this.complexity = 0;
        this.cycle ++;
        this.setAllNeighbours();
        this.rows.forEach((columns, row) => {
            columns.forEach((cell, column) => {
                if ((cell.alive && cell.neighbours > 1 && cell.neighbours < 4) ||
                    (!cell.alive && cell.neighbours === 3)) {
                    cell.setCell(true, this.cycle);
                } else {
                    cell.setCell(false, this.cycle);
                }
                this.complexity += cell.complexity;
            })
        })
    }

    setAllNeighbours() {
        this.rows.forEach((columns, row) => {
            columns.forEach((cell, column) => {
                cell.neighbours = this.getNeighbours({row: row, column: column});
            })
        })
    }

    getNeighbours(position) {
        let left = 0, top = 0;
        let right = this.width - 1;
        let bottom = this.height - 1;
        if (position.row > top) {
            top = position.row - 1;
        }
        if (position.row < bottom) {
            bottom = position.row + 1;
        }
        if (position.column > left) {
            left = position.column - 1;
        }
        if (position.column < right) {
            right = position.column + 1;
        }
        let sum = 0;
        for (let row = top; row <= bottom; row++) {
            for (let column = left; column <= right; column++) {
                if (this.rows[row][column].alive) {
                    sum ++;
                }
            }            
        }
        if (this.rows[position.row][position.column].alive) {
            sum --;
        }
        return sum;
    }

    evolve(factor) {
        let chance = 1 / factor;
        this.cellsToEvolve = [];
        this.rows.forEach((row, rowIndex) => {
            row.forEach((column, columnIndex) => {
                if (column.alive) {
                    this.cellsToEvolve.push({row: rowIndex, column: columnIndex});
                }
            })
        })
        this.cellsToEvolve.forEach(position => {
            let left = 0, top = 0;
            let right = this.width - 1;
            let bottom = this.height - 1;
            if (position.row > top) {
                top = position.row - 1;
            }
            if (position.row < bottom) {
                bottom = position.row + 1;
            }
            if (position.column > left) {
                left = position.column - 1;
            }
            if (position.column < right) {
                right = position.column + 1;
            }
            let possibleCells = (right - left + 1) * ( bottom - top + 1);
            for (let row = top; row <= bottom; row++) {
                for (let column = left; column <= right; column++) {
                    if (Math.random() <= 1 / possibleCells) {
                        this.rows[row][column].setCell(true);
                    }
                }            
            }
        })
    }

    get getBoard() {
        return this.rows;
    }
}

function initBoard(initSize, cells = []) {
    let board = new Board(initSize);

    cells.forEach(cell => {
        board.setCell(cell, true);
    })

    var cellPosition = {
        row: 2,
        column: 5,
    }
    
    return board;
}

function play(initSize, cells = [], cycles = 10) {
    var board = initBoard(initSize, cells);
    board.print;
    board.evolve(1);
    board.print;

    var scores = playNCycles(board, cycles);

    board.print;
    //console.log(scores);
    var totalScore = 0;
    scores.forEach(score => {
        totalScore += score;
    })
    var avgScore = totalScore / scores.length;
    console.log(`gemmiddelde score is: ` + avgScore + " na " + scores.length + " cyles");
}

function playNCycles(board, nCycles) {
    var scores = []
    for (let cycle = 0; cycle < nCycles; cycle++) {
        board.doCycle();
        scores.push(board.complexity);
        //board.print;        
    }
    return scores;
}

function generateRandomCells(size, nCells) {
    var cells = [];
    var generated = 0;
    var total = size.height * size.width;
    var chance = nCells / total;
    while (generated < nCells) {
        for (let row = 0; row < size.height; row++) {
            for (let column = 0; column < size.width; column++) {
                if (generated < nCells && Math.random() < chance) {
                    cells.push({row: row, column: column});
                    generated ++;
                }
            }
        }
    }
    return cells;
}

var initSize = {width: 15, height:15};
var startingCells = 20;
var cycles = 1000;

var cells = generateRandomCells(initSize, startingCells);

play(initSize, cells, cycles);