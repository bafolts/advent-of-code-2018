const fs = require("fs");

let input = fs.readFileSync("./input7.txt").toString().split("\n");

input.pop();

input = input[0].split(",").map(Number);

const min = Math.min.apply(undefined, input);
const max = Math.max.apply(undefined, input);

let minSum = undefined;
for (let m = min; m <= max; m++) {
    let sum = 0;
    input.forEach((inp) => {
        sum += Math.abs(inp - m);
    });
    if (minSum === undefined || sum < minSum) {
        minSum = sum;
    }
}

console.log("part 1", minSum);

minSum = undefined;

for (let m = min; m <= max; m++) {
    let sum = 0;
    input.forEach((inp) => {
        const n = Math.abs(inp - m);
        sum += (n * (n + 1)) >> 1;
    });
    if (minSum === undefined || sum < minSum) {
        minSum = sum;
    }
}

console.log("part 2", minSum);
