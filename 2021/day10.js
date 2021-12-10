const fs = require("fs");

let input = fs.readFileSync("./input10.txt").toString().split("\n");

input.pop();

const opener = new Set(["<", "{", "[", "("]);

const badIndex = new Set();

console.log("part 1", input.map((line, idx) => {
    const stack = [];
    for (let i = 0; i < line.length; i++) {
        if (opener.has(line[i])) {
            stack.push(line[i]);
        } else if (line[i] === ">" && stack[stack.length - 1] !== "<") {
            badIndex.add(idx);
            return 25137;
        } else if (line[i] === "}" && stack[stack.length - 1] !== "{") {
            badIndex.add(idx);
            return 1197;
        } else if (line[i] === ")" && stack[stack.length - 1] !== "(") {
            badIndex.add(idx);
            return 3;
        } else if (line[i] === "]" && stack[stack.length - 1] !== "[") {
            badIndex.add(idx);
            return 57;
        } else {
            stack.pop();
        }
    }
    return 0;
}).reduce((l, n) => l + n, 0));

const score = new Map([["(", 1], ["[", 2], ["{", 3], ["<", 4]]);
const part2 = input.filter((a, idx) => badIndex.has(idx) === false).map((line, idx) => {
    const stack = [];
    for (let i = 0; i < line.length; i++) {
        if (opener.has(line[i])) {
            stack.push(line[i]);
        } else {
            stack.pop();
        }
    }
    let result = 0;
    while (stack.length > 0) {
        result = (result * 5) + score.get(stack.pop());
    }
    return result;
});

part2.sort((a, b) => a - b);

console.log("part 2", part2[Math.floor(part2.length / 2)]);
