const fs = require("fs");
const input = fs.readFileSync("./input1.txt").toString().split("\n").map(Number);

input.pop();

// part 1
let increase = 0;
for (let i = 1; i < input.length; i++) {
    if (input[i] > input[i - 1]) {
        increase++;
    }
}

console.log("part 1", increase);

// part 2
increase = 0;
for (let i = 3; i < input.length; i++) {
    if (input[i - 3] + input[i - 2] + input[i - 1] < input[i - 2] + input[i - 1] + input[i]) {
        increase++;
    }
}

console.log("part 2", increase);
