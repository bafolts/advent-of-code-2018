const fs = require("fs");

function line(s) {
    const p = s.split(" ");
    p[1] = Number(p[1]);
    return p;
}

const input = fs.readFileSync("./input2.txt").toString().split("\n").map(line);

input.pop();

let horizontal = 0;
let vertical = 0;

for (let i = 0; i < input.length; i++) {
    switch (input[i][0]) {
        case "forward":
            horizontal += input[i][1];
            break;
        case "down":
            vertical += input[i][1];
            break;
        case "up":
            vertical -= input[i][1];
            break;
    }
}

console.log("part 1", horizontal * vertical);

horizontal = 0;
vertical = 0;

let aim = 0;

for (let i = 0; i < input.length; i++) {
    switch (input[i][0]) {
        case "forward":
            horizontal += input[i][1];
            vertical += aim * input[i][1];
            break;
        case "down":
            aim += input[i][1];
            break;
        case "up":
            aim -= input[i][1];
            break;
    }
}

console.log("part 2", horizontal * vertical);

