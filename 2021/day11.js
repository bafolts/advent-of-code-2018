const fs = require("fs");

let input = fs.readFileSync("./input11.txt").toString().split("\n");

input.pop();

input = input.map((i) => i.split("").map(Number));

let ans = 0;

function getNeighbors(x1, y1) {
    const ans = [];
    [-1, 0, 1].forEach((y) => {
        [-1, 0, 1].forEach((x) => {
            if (x === 0 && y === 0) {
                return;
            }
            ans.push([y1 + y, x1 + x]);
        });
    });
    return ans.filter((a) => a[0] >= 0 && a[0] <= 9 && a[1] >=0 && a[1] <=9);
}

for (let i = 0; i < 1000; i++) {
    let nines = [];
    let numFlashed = 0;
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            input[y][x]++;
            if (input[y][x] > 9) {
                nines.push([y, x]);
            }
        }
    }

    while (nines.length) {
        const nine = nines.pop();
        if (input[nine[0]][nine[1]] === 0) {
            continue;
        }
        input[nine[0]][nine[1]] = 0;
        numFlashed++;
        ans++;
        getNeighbors(nine[1], nine[0])
            .filter((neighbor) => input[neighbor[0]][neighbor[1]] > 0)
            .forEach((neighbor) => {
                input[neighbor[0]][neighbor[1]]++;
                if (input[neighbor[0]][neighbor[1]] > 9) {
                    nines.push(neighbor);
                }
            });
    }
    if (i === 99) {
        console.log("part 1", ans);
    }
    if (numFlashed === 100)  {
        console.log("part 2", i);
        break;
    }
}

