const fs = require("fs");

let input = fs.readFileSync("./input9.txt").toString().split("\n");

input.pop();

let ans = 0;
for (let i = 0; i < input.length; i++) {
    const row = input[i];
    for (let j = 0; j < row.length; j++) {
        let topValue = parseInt(i === 0 ? 10 : input[i - 1][j]);
        let leftValue = parseInt(row[j - 1] || 10);
        let rightValue = parseInt(row[j + 1] || 10);
        let bottomValue = parseInt(i === input.length - 1 ? 10 : input[i + 1][j]);
        let value = parseInt(row[j]);
        if (topValue > value && leftValue > value && rightValue > value && bottomValue > value) {
            ans += 1 + value;
        }
    }
}

console.log("part 1", ans);

let moreToGo = true;

let visited = {};

let grids = [];

function makeLargestGrid(y, x) {
    let size = 1;
    visited[y + ":" + x] = 1;
    let toVisit = [
        [y - 1, x],
        [y + 1, x],
        [y, x + 1],
        [y, x - 1]
    ];
    while (toVisit.length > 0) {
        const next = [];
        for (let i = 0; i < toVisit.length; i++) {
            const visiting = toVisit[i];
            if (visiting[0] < 0 || visiting[1] < 0 || visiting[0] >= input.length || visiting[1] >= input[0].length) {
                continue;
            }
            if (visited[visiting[0] + ":" + visiting[1]] === 1) {
                continue;
            }
            if (input[visiting[0]][visiting[1]] !== "9") {
                visited[visiting[0] + ":" + visiting[1]] = 1;
                size++;
            } else {
                continue;
            }
            next.push(
                [visiting[0] - 1, visiting[1]],
                [visiting[0] + 1, visiting[1]],
                [visiting[0], visiting[1] + 1],
                [visiting[0], visiting[1] - 1]
            );
        }
        toVisit = next;
    }
    return size;
}

while (moreToGo) {
    let madeGrid = false;
    for (let i = 0; i < input.length; i++) {
        const row = input[i];
        for (let j = 0; j < row.length; j++) {
            if (row[j] !== "9" && visited[i + ":" + j] === undefined) {
                grids.push(makeLargestGrid(i, j));
                madeGrid = true;
                break;
            }
        }
        if (madeGrid) {
            break;
        }
    }
    if (madeGrid === false) {
        moreToGo = false;
    }
}

grids.sort((a, b) => b - a);

console.log("part 2", grids[0] * grids[1] * grids[2]);
