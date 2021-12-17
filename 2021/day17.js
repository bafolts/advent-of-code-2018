
const x1 = 81;
const x2 = 129;
const y1 = -150;
const y2 = -108;

function isWithinArea(x, y) {
    return x >= x1 && x <= x2 && y >= y1 && y <= y2;
}

function missedArea(x, y) {
    return x > x2 || y < y1;
}

let ans = undefined;
let total = 0;

for (let gY = 1000; gY >= -1000; gY--) {
    for (let gX = 129; gX > 0; gX--) {
        let pX = 0;
        let vX = gX;
        let vY = gY;
        let pY = 0;
        let highest = 0;
        while (missedArea(pX, pY) === false) {
            pX += vX;
            if (vX > 0) {
                vX--;
            }
            pY += vY;
            highest = Math.max(pY, highest);
            vY--;
            if (isWithinArea(pX, pY) === true) {
                if (ans === undefined) {
                    ans = highest;
                }
                total ++;
                break;
            }
        }

    }
}

console.log("part 1", ans);
console.log("part 2", total);
