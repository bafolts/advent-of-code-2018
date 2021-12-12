const fs = require("fs");

let input = fs.readFileSync("./input12.txt").toString().split("\n");

input.pop();

input = input.map((inp) => inp.split("-"));

const map = new Map();

input.forEach((inp) => {
    let m = map.get(inp[0]);
    if (m === undefined) {
        map.set(inp[0], [inp[1]]);
    } else {
        m.push(inp[1]);
    }
    m = map.get(inp[1]);
    if (m === undefined) {
        map.set(inp[1], [inp[0]]);
    } else {
        m.push(inp[0]);
    }
});

const starts = map.get("start");
const lowerA = 'a'.charCodeAt(0);
const lowerZ = 'z'.charCodeAt(0);

function isLowerCase(str) {
    const charCode = str.charCodeAt(0);
    if (charCode >= lowerA &&
        charCode <= lowerZ) {
        return true;
    }
    return false;
}

function getCount(str, ch) {
    const first = str.indexOf("-" + ch);
    if (first !== -1) {
        if (str.indexOf("-" + ch, first + 2) !== -1) {
            return 2;
        }
        return 1;
    }
    return 0;
}

function anyDouble(str) {
    const m = {};
    const p = str.split("-");
    for (let i = 0; i < p.length; i++) {
        if (isLowerCase(p[i]) === false) {
            continue;
        }
        if (m[p[i]] !== undefined) {
            return true;
        }
        m[p[i]] = 1;
    }
    return false;
}

function totalPaths(travel) {
    let answer = 0;
    let routes = starts.map((start) => ({
        soFar: "start-" + start,
        next: map.get(start),
    }));

    while (routes.length) {
        const paths = new Set();
        let next = [];
        routes.forEach((route) => {
            route.next.forEach((r) => {
                if (r === 'start') {
                    return;
                }
                if (r === 'end') {
                    answer++;
                    return;
                }
                const count = getCount(route.soFar, r);
                const isLower = isLowerCase(r[0]);
                if (
                    isLower === false ||
                    count === 0 ||
                    (travel === 2 && anyDouble(route.soFar) === false)) {
                    const key = route.soFar + "-" + r;
                    if (paths.has(key) === false) {
                        paths.add(key);
                        next.push({
                            soFar: key,
                            next: map.get(r),
                        });
                    }
                }
            });
        });
        routes = next;
    }
    return answer;
}

console.log("part 1", totalPaths(1));
console.log("part 2", totalPaths(2));
