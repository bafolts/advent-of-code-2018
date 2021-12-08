const fs = require("fs");

let input = fs.readFileSync("./input8.txt").toString().split("\n");

input.pop();

input = input.map((line) => {
    line = line.split(" | ");
    return [line[0].split(" "), line[1].split(" ")];
});

// 1 = 2 letters
// 4 = 4 letters
// 7 = 3 letters
// 8 = 7 letters

let part1 = 0;

input.forEach((inp) => {
    inp[1].forEach((s) => {
        if (s.length === 2 || s.length === 4 || s.length === 3 || s.length === 7) {
            part1++;
        }
    });
});

console.log("part 1", part1);

function sort(s) {
    s = s.split("");
    s.sort();
    return s.join("");
}

let result = 0;

input.forEach((inp) => {
    const lhs = inp[0];
    const rhs = inp[1];
    let one, seven, four, eight, nine, six, three, zero, five, two;
    for (let i = 0; i < lhs.length; i++) {
        if (lhs[i].length === 2) {
            one = lhs[i];
        } else if (lhs[i].length === 3) {
            seven = lhs[i];
        } else if (lhs[i].length === 4) {
            four = lhs[i];
        } else if (lhs[i].length === 7) {
            eight = lhs[i];
        }
    }
    for (let i = 0; i < lhs.length; i++) {
        if (lhs[i].length === 5 && lhs[i].indexOf(one[0]) !== -1 && lhs[i].indexOf(one[1]) !== -1) {
            three = lhs[i];
            break;
        }
    }
    for (let i = 0; i < lhs.length; i++) {
        if (lhs[i].length === 6 && lhs[i].indexOf(three[0]) !== -1 && lhs[i].indexOf(three[1]) !== -1 && lhs[i].indexOf(three[2]) !== -1 && lhs[i].indexOf(three[3]) !== -1 && lhs[i].indexOf(three[4]) !== -1) {
            nine = lhs[i];
            break;
        }
    }
    for (let i = 0; i < lhs.length; i++) {
        if (lhs[i].length === 6 && lhs[i] !== nine && lhs[i].indexOf(seven[0]) !== -1 && lhs[i].indexOf(seven[1]) !== -1 && lhs[i].indexOf(seven[2]) !== -1) {
            zero = lhs[i];
            break;
        }
    }
    for (let i = 0; i < lhs.length; i++) {
        if (lhs[i].length === 6 && lhs[i] !== nine && lhs[i] !== zero) {
            six = lhs[i];
            break;
        }
    }
    for (let i = 0; i < lhs.length; i++) {
        if (lhs[i].length === 5 && six.indexOf(lhs[i][0]) !== -1 && six.indexOf(lhs[i][1]) !== -1 && six.indexOf(lhs[i][2]) !== -1 && six.indexOf(lhs[i][3]) !== -1 && six.indexOf(lhs[i][4]) !== -1) {
            five = lhs[i];
            break;
        }
    }
    for (let i = 0; i < lhs.length; i++) {
        if (lhs[i].length === 5 && lhs[i] !== three && lhs[i] !== five) {
            two = lhs[i];
            break;
        }
    }
    const map = {};
    map[sort(zero)] = 0;
    map[sort(one)] = 1;
    map[sort(two)] = 2;
    map[sort(three)] = 3;
    map[sort(four)] = 4;
    map[sort(five)] = 5;
    map[sort(six)] = 6;
    map[sort(seven)] = 7;
    map[sort(eight)] = 8;
    map[sort(nine)] = 9;
    let ans = "";
    for (let i = 0; i < rhs.length; i++) {
        ans += String(map[sort(rhs[i])]);
    }
    result += parseInt(ans);
});

console.log("part 2", result);
