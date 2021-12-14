const fs = require("fs");

let input = fs.readFileSync("./input14.txt").toString().split("\n");

input.pop();

const map = new Map();
const lines = input.slice(2);

lines.forEach((line) => {
    map.set(line[0] + line[1], line[line.length - 1]);
});

const lookup = {};

function getCount(str) {
    const c = {};
    for (let i = 0; i < str.length; i++) {
        if (c[str[i]] === undefined) {
            c[str[i]] = 1;
        } else {
            c[str[i]]++;
        }
    }
    return c;
}

function merge(a, b) {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    let n = {};
    for (let i = 0; i < aKeys.length; i++) {
        if (b[aKeys[i]] !== undefined) {
            n[aKeys[i]] = b[aKeys[i]] + a[aKeys[i]];
        } else {
            n[aKeys[i]] = a[aKeys[i]];
        }
    }
    for (let i = 0; i < bKeys.length; i++) {
        if (a[bKeys[i]] === undefined) {
            n[bKeys[i]] = b[bKeys[i]];
        }
    }
    return n;
}

function runTimes(str, times) {
    const key = str + ":" + times;
    if (lookup[key] !== undefined) {
        return lookup[key];
    }
    if (str.length === 2) {
        if (times === 0) {
            return lookup[key] = getCount(str);
        } else {
            return lookup[key] = merge(
                runTimes(str[0] + map.get(str[0] + str[1]), times - 1),
                runTimes(map.get(str[0] + str[1]) + str[1], times - 1)
            );
        }
    }
    return merge(runTimes(str[0] + str[1], times), runTimes(str.substring(1), times));
}

function answer(str, times) {
    const part = Array.from(Object.values(runTimes(str, times)));
    return Math.floor((Math.max.apply(null, part) - Math.min.apply(null, part)) / 2);
}

console.log("part 1", answer(input[0], 10));
console.log("part 2", answer(input[0], 40));

