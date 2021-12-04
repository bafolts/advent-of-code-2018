const fs = require("fs");

const input = fs.readFileSync("./input4.txt").toString().split("\n");

input.pop();

const numbers = input[0].split(",").map(Number);

const boards = [];

for (let i = 2; i < input.length; i += 6) {
    const board = [];
    for (let j = 0; j < 5; j++) {
        const row = [];
        for (let k = 0; k < 5; k++) {
            row.push(input[i + j].substring(k * 3, (k * 3) + 3).trim());
        }
        board.push(row.map(Number));
    }
    boards.push(board);
}

function boardHasWon(board) {
    for (let y = 0; y < 5; y++) {
        let x = 0;
        for (; x < 5; x++) {
            if (board[y][x] !== -1) {
                break;
            }
        }
        if (x === 5) {
            return true;
        }
    }
    for (let x = 0; x < 5; x++) {
        let y = 0;
        for (; y < 5; y++) {
            if (board[y][x] !== -1) {
                break;
            }
        }
        if (y === 5) {
            return true;
        }
    }
    return false;
}

function updateBoard(board, number) {
    for (let y = 0; y < 5; y++) {
        for (let x = 0; x < 5; x++) {
            if (board[y][x] === number) {
                board[y][x] = -1;
            }
        }
    }
}

for (let i = 0; i < numbers.length; i++) {
    let b = 0;
    for (; b < boards.length; b++) {
        updateBoard(boards[b], numbers[i]);
        if (boardHasWon(boards[b])) {
            let sum = 0;
            for (let y = 0; y < 5; y++) {
                for (let x = 0; x < 5; x++) {
                    if (boards[b][y][x] !== -1) {
                        sum += boards[b][y][x];
                    }
                }
            }
            console.log(sum * numbers[i]);
            boards.splice(b, 1);
            b--;
        }
    }
}

