const fs = require("fs");

let input = fs.readFileSync("./input15.txt").toString().split("\n");

input.pop();

input = input.map((line) => line.split("").map(Number));

function getAnswer(grid) {
    const width = grid[0].length;
    const height = grid.length;

    let visit = [[0, 0, 0]];

    const mins = [];

    let someCap = 0;
    for (let y = 1; y < height; y++) {
        someCap += grid[y][0];
    }
    for (let x = 0; x < width; x++) {
        someCap += grid[height - 1][x];
    }

    let minimum = someCap;

    while (visit.length > 0) {
        const next = [];
        for (let i = 0; i < visit.length; i++) {
            const x = visit[i][0];
            const y = visit[i][1];
            if (visit[i][2] >= minimum) {
                continue;
            }
            if (mins[y] === undefined || mins[y][x] === undefined || visit[i][2] < mins[y][x]) {
                if (mins[y] === undefined) {
                    mins[y] = [];
                }
                mins[y][x] = visit[i][2];
            } else if (visit[i][2] >= mins[y][x]) {
                continue;
            }

            if (x === width - 1 && y === height - 1) {
                if (visit[i][2] < minimum) {
                    minimum = visit[i][2];
                }
                continue;
            }

            const points = [
                [x - 1, y],
                [x + 1, y],
                [x, y + 1],
                [x, y - 1]
            ];
            for (let p = 0; p < points.length; p++) {
                const point = points[p];
                if (point[0] < 0 || point[1] < 0 || point[0] >= width || point[1] >= height) {
                    continue;
                }
                next.push([point[0], point[1], visit[i][2] + grid[point[1]][point[0]]]);
            }
        }
        visit = next;
    }

    return minimum;
}

function buildFullMap() {
    const output = [];

    for (let t = 0; t < 5; t++) {
        for (let s = 0; s < 5; s++) {
            for (let y = 0; y < input.length; y++) {
                output[t * input.length + y] = (output[t * input.length + y] || []);
                for (let x = 0; x < input[0].length; x++) {
                    output[t * input.length + y][s * input[0].length + x] = (input[y][x] + s + t - 1) % 9 + 1;
                }
            }
        }
    }
    return output;
}

console.log(getAnswer(input));
console.log(getAnswer(buildFullMap()));
