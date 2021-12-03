const fs = require("fs");

const input = fs.readFileSync("./input3.txt").toString().split("\n");

input.pop();

let ans1 = "";
let ans2 = "";

for (let j = 0; j < input[0].length; j++) {
    let count0 = 0;
    let count1 = 0;
    for (let i = 0; i < input.length; i++) {
          if (input[i][j] === "0") {
              count0++;
          } else {
              count1++;
          }
    }
    if (count0 > count1) {
        ans1 += "0";
        ans2 += "1";
    } else {
        ans1 += "1";
        ans2 += "0";
    }
}

ans1 = parseInt(ans1, 2);
ans2 = parseInt(ans2, 2);

console.log("part 1", ans1 * ans2);

let oxygen = input.slice();

for (let j = 0; j < input[0].length; j++) {
    let zeroes = [];
    let ones = [];
    for (let i = 0; i < oxygen.length; i++) {
          if (oxygen[i][j] === "0") {
              zeroes.push(oxygen[i]);
          } else {
              ones.push(oxygen[i]);
          }
    }
    if (zeroes.length > ones.length) {
        oxygen = zeroes;
    } else {
        oxygen = ones;
    }
    if (oxygen.length === 1) {
        oxygen = parseInt(oxygen[0], 2);
        break;
    }
}

let co2 = input.slice();

for (let j = 0; j < input[0].length; j++) {
    let zeroes = [];
    let ones = [];
    for (let i = 0; i < co2.length; i++) {
          if (co2[i][j] === "0") {
              zeroes.push(co2[i]);
          } else {
              ones.push(co2[i]);
          }
    }
    if (ones.length >= zeroes.length) {
        co2 = zeroes;
    } else {
        co2 = ones;
    }
    if (co2.length === 1) {
        co2 = parseInt(co2[0], 2);
        break;
    }
}

console.log("part 2", oxygen * co2);
