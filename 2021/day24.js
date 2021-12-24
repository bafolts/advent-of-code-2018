const fs = require("fs");
const input = fs.readFileSync("./input24.txt").toString().split("\n");

input.pop();

const parts = [];
let part = [];
for (let i = 1; i < input.length; i++) {
    if (input[i].startsWith("inp ")) {
        parts.push(part);
        part = [];
    } else {
        part.push(input[i]);
    }
}

var alu = [0, 0, 0, 0];

function inps(index, val) {
    alu[index] = val;
}

function add(index1, index2) {
    alu[index1] += alu[index2];
}

function addVal(index1, val1) {
    alu[index1] += val1;
}

function mul(index1, index2) {
    alu[index1] *= alu[index2];
}

function mulVal(index1, val1) {
    alu[index1] *= val1;
}

function div(index1, index2) {
    alu[index1] = Math.floor(alu[index1] / alu[index2]);
}

function divVal(index1, val1) {
    alu[index1] = Math.floor(alu[index1] / val1);
}

function mod(index1, index2) {
    alu[index1] = alu[index1] % alu[index2];
}

function modVal(index1, val1) {
    alu[index1] = alu[index1] % val1;
}

function eql(index1, index2) {
    if (alu[index1] === alu[index2]) {
        alu[index1] = 1;
    } else {
        alu[index1] = 0;
    }
}

function eqlVal(index1, val1) {
    if (alu[index1] === val1) {
        alu[index1] = 1;
    } else {
        alu[index1] = 0;
    }
}

const letters = {
    w: 0,
    x: 1,
    y: 2,
    z: 3
};

const registerOps = {
    mul: mul,
    add: add,
    eql: eql,
    div: div,
    mod: mod
};

const ops = {
    mul: mulVal,
    add: addVal,
    eql: eqlVal,
    div: divVal,
    mod: modVal
};

function registers(line) {
    return letters[line[4]] !== undefined &&
           letters[line[6]] !== undefined;
}

function getRegisterOperation(line) {
    return registerOps[line.substring(0, 3)];
}

function getOperation(line) {
    return ops[line.substring(0, 3)];
}

let index = 0;
let nums = [];
const funcs = input.map((inp) => {
    if (inp.startsWith("inp ")) {
        return () => {
            inps(0, nums[index++]);
        };
    }
    let func;
    let args = [letters[inp[4]]];
    if (registers(inp)) {
        func = getRegisterOperation(inp);
        args.push(letters[inp[6]]);
        return () => {
            func.apply(undefined, args);
        };
    } else {
        func = getOperation(inp);
        args.push(parseInt(inp.substring(6)));
        return () => {
            func.apply(undefined, args);
        };
    }
});

function calculate(numbers) {
    nums = numbers;
    index = 0;
    alu = [0, 0, 0, 0];
    funcs.forEach((f) => f());
    return alu[3];
}

let num = 99999999999999;

while (num > 0) {
    const val = "" + num;
    if (val.indexOf("0") === -1) {
        const result = calculate("" + num);
        if (result === 0) {
            console.log(num);
            break;
        }
    }
    num--;
}
