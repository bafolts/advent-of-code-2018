const fs = require("fs");

let input = fs.readFileSync("./input22.txt").toString().split("\n");

input.pop();

input = input.map((line) => {
    let isOn = true;
    let xPos = 3;
    if (line[2] === 'f') {
        isOn = false;
        xPos++;
    }
    line = line.substring(xPos).split(",").map((l) => l.substring(2).split("..").map(Number))
    return {
        isOn: isOn,
        x: line[0].sort((a, b) => a - b),
        y: line[1].sort((a, b) => a - b),
        z: line[2].sort((a, b) => a - b),
    };
});

function intersects(p1, p2) {
    return (p1[0] >= p2[0] && p1[0] <= p2[1]) ||
           (p1[1] >= p2[0] && p1[1] <= p2[1]);
}

function totalInArray(arr) {
    let result = 0;
    for (let i = 0; i < arr.length; i++) {
        result += 1 + (arr[i][1] - arr[i][0]);
    }
    return result;
}

function totalOn(map) {
    const keys = Object.keys(map);
    let ans = 0;
    for (let i = 0; i < keys.length; i++) {
        ans += totalInArray(map[keys[i]]);
    }
    return ans;
}

function runFor(x1, x2, y1, y2, z1, z2) {
    let ans = 0;
    let result = {};
    input.forEach((instruction) => {
        if (instruction.x[1] < x1 || instruction.x[0] > x2) {
            return;
        }
        if (instruction.y[1] < y1 || instruction.y[0] > y2) {
            return;
        }
        if (instruction.z[1] < z1 || instruction.z[0] > z2) {
            return;
        }
        let startX = x1;
        if (instruction.x[0] > x1) {
            startX = instruction.x[0];
        }
        let stopX = x2;
        if (instruction.x[1] < x2) {
            stopX = instruction.x[1];
        }
        let startY = y1;
        if (instruction.y[0] > y1) {
            startY = instruction.y[0];
        }
        let stopY = instruction.y[1];
        if (instruction.y[1] > y2) {
            stopY = y2;
        }
        let stopZ = instruction.z[1];
        let startZ = z1;
        if (instruction.z[0] > z1) {
            startZ = instruction.z[0];
        }
        if (instruction.z[1] > z2) {
            stopZ = z2;
        }
        for (let x = startX; x <= stopX; x++) {
            if (result[x] === undefined) {
                result[x] = {};
            }
            for (let y = startY; y <= stopY; y++) {
                if (result[x][y] === undefined) {
                    result[x][y] = {};
                }
                for (let z = startZ; z <= stopZ; z++) {
                    if (instruction.isOn) {
                        result[x][y][z] = 1;
                        ans++;
                    } else if (result[x][y][z] === 1) {
                        result[x][y][z] = 0;
                        ans--;
                    }
                }
            }
        }
    });
    return ans;
}

console.log(runFor(-50, 50, -50, 50, -50, 50));
