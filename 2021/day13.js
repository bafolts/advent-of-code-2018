const fs = require("fs");

let input = fs.readFileSync("./input13.txt").toString().split("\n");

input.pop();

let grid = [];

const stop = input.length - 13;

for (let i = 0; i < stop; i++) {
    input[i] = input[i].split(",").map(Number);
    if (grid[input[i][1]] === undefined) {
        grid[input[i][1]] = [];
    }
    grid[input[i][1]][input[i][0]] = '#';
}

let ans = 0;

function foldX(x) {
    for (let x1 = x - 1; x1 >= 0; x1--) {
        for (let y1 = 0; y1 < grid.length; y1++) {
            if (grid[y1] !== undefined && grid[y1][x1] === '#') {
                grid[y1][x + (x - x1)] = '#';
            }
        }
    }
    let newGrid = [];
    for (let y1 = 0; y1 < grid.length; y1++) {
        if (grid[y1] === undefined) {
            continue;
        }
        for (let x1 = x; x1 < grid[y1].length; x1++) {
            if (grid[y1][x1] === '#') {
                ans++;
            }
        }
        newGrid[y1] = grid[y1].slice(x + 1); // get this right!
    }
    grid = newGrid;
}

function foldY(y) {
    for (let y1 = y + 1; y1 < grid.length; y1++) {
        if (grid[y1] === undefined) {
            continue;
        }
        for (let x1 = 0; x1 < grid[y1].length; x1++) {
            let newY = y - (y1 - y);
            if (grid[newY] === undefined) {
                grid[newY] = [];
            }
            if (grid[y1][x1] === '#') {
                grid[newY][x1] = '#';
            }
        }
    }
    let newGrid = [];
    for (let y1 = 0; y1 < y; y1++) {
        if (grid[y1] === undefined) {
            continue;
        }
        newGrid[y1] = grid[y1];
    }
    grid = newGrid;
}

foldX(655);

console.log('part 1', ans);

for (let i = stop + 2; i < input.length; i++) {
    const line = input[i].substring("fold along ".length);
    const value = parseInt(line.substring(2));
    if (line[0] === "x") {
        foldX(value);
    } else {
        foldY(value);
    }
}

let out = "";
for (let y = 0; y < grid.length; y++) {
    if (grid[y] === undefined) {
        continue;
    }
    for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x] === '#') {
            out += '#';
        } else {
            out += ' ';
        }
    }
    out += "\n";
}

console.log(out);
