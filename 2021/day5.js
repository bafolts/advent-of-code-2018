const fs = require("fs");

let input = fs.readFileSync("./input5.txt").toString().split("\n");

input.pop();

input = input.map((l) => {
    l = l.split(" -> ");
    return [l[0].split(",").map(Number), l[1].split(",").map(Number)];
});

const diagonal = [];
const horizontal = [];
const vertical = [];

input.forEach((inp) => {
    if (inp[0][1] === inp[1][1]) {
        horizontal.push(inp);
    } else if (inp[0][0] === inp[1][0]) {
        vertical.push(inp);
    } else {
        diagonal.push(inp);
    }
});

const ans = {};

function multiMap(coor) {
    if (ans[coor] === undefined) {
        ans[coor] = 1;
    } else {
        ans[coor]++;
    }
}

for (let h = 0; h < horizontal.length; h++) {
    const line = horizontal[h].sort((h1, h2) => h1[0] - h2[0]);
    for (let x = line[0][0]; x <= line[1][0]; x++) {
        multiMap(x + ":" + line[0][1]);
    }
}

for (let v = 0; v < vertical.length; v++) {
    const line = vertical[v].sort((v1, v2) => v1[1] - v2[1]);
    for (let y = line[0][1]; y <= line[1][1]; y++) {
        multiMap(line[0][0] + ":" + y);
    }
}

console.log("part 1", Object.values(ans).filter((n) => n > 1).length);

for (let d = 0; d < diagonal.length; d++) {
    const line = diagonal[d].sort((d1, d2) => d1[0] - d2[0]);
    let dY = line[0][1] < line[1][1] ? 1 : -1;
    let y = line[0][1];
    for (let x = line[0][0]; x <= line[1][0]; x++) {
        multiMap(x + ":" + y);
        y += dY;
    }
}

console.log("part 2", Object.values(ans).filter((n) => n > 1).length);

