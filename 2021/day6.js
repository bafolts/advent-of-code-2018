const fs = require("fs");

let input = fs.readFileSync("./input6.txt").toString().split("\n");

input.pop();

input = input[0].split(",").map(Number);

function calcFish(totalDays) {
    let counts = [];
    input.forEach((f) => {
        if (counts[f] === undefined) {
            counts[f] = 1;
        } else {
            counts[f]++;
        }
    });
    for (let days = 0; days < totalDays; days++) {
        let nextFish = [];
        for (let c = 0; c < counts.length; c++) {
            const total = counts[c];
            if (total === undefined) {
                continue;
            }
            if (c === 0) {
                nextFish[8] = nextFish[6] = total;
            } else {
                if (nextFish[c - 1] === undefined) {
                    nextFish[c - 1] = total;
                } else {
                    nextFish[c - 1] += total;
                }
            }
        }
        counts = nextFish;
    }
    let ans = 0;
    counts.forEach((c) => {
        ans += c;
    });
    return ans;
}

console.log("part 1", calcFish(80));
console.log("part 2", calcFish(256));
