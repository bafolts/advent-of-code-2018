const fs = require("fs");

let input = fs.readFileSync("./input20.txt").toString().split("\n");

input.pop();

const algorithm = input[0];

const original = [];
for (let i = 2; i < input.length; i++) {
    original.push(input[i]);
}

function runPass(image, gen) {
    const border = (gen % 2) === 0 ? '#' : '.';
    image = image.slice();
    image = image.map((img) => border + img + border);
    let top = '';
    for (let x = 0; x < image[0].length; x++) {
         top += border;
    }
    image.unshift(top);
    image.push(top);
    let output = [];
    for (let y = 0; y < image.length; y++) {
        let line = "";
        for (let x = 0; x < image[0].length; x++) {
            const grid = [
                y > 0 && x > 0 ? image[y - 1][x - 1] : border,
                y > 0 ? image[y - 1][x] : border,
                y > 0 && x < image[0].length - 1 ? image[y - 1][x + 1] : border,
                x > 0 ? image[y][x - 1] : border,
                image[y][x],
                x < image[0].length - 1 ? image[y][x + 1] : border,
                y < image.length - 1 && x > 0 ? image[y + 1][x - 1] : border,
                y < image.length - 1 ? image[y + 1][x] : border,
                y < image.length - 1 && x < image[0].length - 1 ? image[y + 1][x + 1] : border
            ];
            line += algorithm[parseInt(grid.join("").replace(/\#/g, '1').replace(/\./g, '0'), 2)];
        }
        output.push(line);
    }
    return output;
}

let part = original;
for (let i = 1; i <= 50; i++) {
    part = runPass(part, i);
    if (i === 2 || i === 50) {
        let ans = 0;
        for (let y = 0; y < part.length; y++) {
            for (let x = 0; x < part[0].length; x++) {
                if (part[y][x] === '#') {
                    ans++;
                }
            }
        }
        console.log("part", ans);
    }
}

