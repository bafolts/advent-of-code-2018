const fs = require("fs");

let input = fs.readFileSync("./input19.1.txt").toString().split("\n");

input.pop();

console.log(input[input.length - 1]);

let scanner = [];

const scanners = [];

for (let i = 0; i < input.length; i++) {
    if (input[i].startsWith("---")) {
        if (scanner.length > 0) {
            scanners.push(scanner);
            scanner = [];
        }
    } else if (input[i].length !== 0) {
        const parts = input[i].split(",").map(Number);
        scanner.push(parts);
    }
}

scanners.push(scanner);

let missing = 0;

const result = {};
let doneA = [0];

for (let i = 0; i < scanners[0].length; i++) {
    const scan = scanners[0][i];
    result[scan.toString()] = 1;
}

function addNewMapped(arr1, item) {
    result[item.toString()] = 1;
}

while (doneA.length < scanners.length) {
    console.log(scanners.length - doneA.length);
    let start = doneA.length;
    for (let s0 = 0; s0 < doneA.length; s0++) {
    const scanner1 = scanners[doneA[s0]];
    let s = 0;
    for (; s < scanners.length; s++) {
        if (doneA.indexOf(s) !== -1 || s === doneA[s0]) {
            continue;
        }
        const scanner2 = scanners[s];
        const foundIt = [
            (a) => [a[0], a[1], a[2]],
            (a) => [a[0], -a[1], a[2]],
            (a) => [-a[0], a[1], a[2]],
            (a) => [a[0], a[1], -a[2]],
            (a) => [-a[0], -a[1], a[2]],
            (a) => [-a[0], a[1], -a[2]],
            (a) => [a[0], -a[1], -a[2]],
            (a) => [a[1], a[0], a[2]],
            (a) => [-a[1], a[0], a[2]],
            (a) => [a[1], -a[0], a[2]],
            (a) => [a[1], a[0], -a[2]],
            (a) => [-a[1], -a[0], a[2]],
            (a) => [-a[1], a[0], -a[2]],
            (a) => [a[1], -a[0], -a[2]],
            (a) => [-a[1], -a[0], a[2]],
            (a) => [a[2], a[0], a[1]],
            (a) => [-a[2], a[0], a[1]],
            (a) => [a[2], -a[0], a[1]],
            (a) => [a[2], a[0], -a[1]],
            (a) => [-a[2], -a[0], a[1]],
            (a) => [-a[2], a[0], -a[1]],
            (a) => [a[2], -a[0], -a[1]],
            (a) => [-a[2], -a[0], a[1]],
            (a) => [a[1], a[2], a[0]],
            (a) => [-a[1], a[2], a[0]],
            (a) => [a[1], -a[2], a[0]],
            (a) => [a[1], a[2], -a[0]],
            (a) => [-a[1], -a[2], a[0]],
            (a) => [-a[1], a[2], -a[0]],
            (a) => [a[0], -a[2], -a[1]],
            (a) => [-a[0], -a[2], a[1]],
            (a) => [a[0], a[2], a[1]],
            (a) => [-a[0], a[2], a[1]],
            (a) => [a[0], -a[2], a[1]],
            (a) => [a[0], a[2], -a[1]],
            (a) => [-a[0], -a[2], a[1]],
            (a) => [-a[0], a[2], -a[1]],
            (a) => [a[0], -a[2], -a[1]],
            (a) => [-a[0], -a[2], a[1]],
            (a) => [a[2], -a[1], -a[0]],
            (a) => [-a[2], -a[1], a[0]],
            (a) => [a[2], a[1], a[0]],
            (a) => [-a[2], a[1], a[0]],
            (a) => [a[2], -a[1], a[0]],
            (a) => [a[2], a[1], -a[0]],
            (a) => [-a[2], -a[1], a[0]],
            (a) => [-a[2], a[1], -a[0]],
            (a) => [a[2], -a[1], -a[0]],
            (a) => [-a[2], -a[1], a[0]],
        ].some((map) => {
            const same = [];
            const sL2= scanner2.length;
            const sL = scanner1.length;
            for (let i = 0; i < sL - 1; i++) {
                const scan1 = scanner1[i];
                for (let j = i + 1; j < sL; j++) {
                    const scan2 = scanner1[j];
                    const dX1 = scan1[0] - scan2[0];
                    const dY1 = scan1[1] - scan2[1];
                    const dZ1 = scan1[2] - scan2[2];
                    const eX1 = scan2[0] - scan1[0];
                    const eY1 = scan2[1] - scan1[1];
                    const eZ1 = scan2[2] - scan1[2];
                    for (let k = 0; k < sL2 - 1; k++) {
                        const mapped1 = map(scanner2[k]);
                        for (let l = k + 1; l < sL2; l++) {
                            const mapped2 = map(scanner2[l]);
                            let dX2 = mapped2[0] - mapped1[0];
                            let dY2 = mapped2[1] - mapped1[1];
                            let dZ2 = mapped2[2] - mapped1[2];
                            if (dX1 === dX2 && dY1 === dY2 && dZ1 === dZ2) {
                                same.push([scan1, mapped2]);
                                continue;
                            }
                            if (eX1 === dX2 && eY1 === dY2 && eZ1 === dZ2) {
                                same.push([scan2, mapped2]);
                                continue;
                            }
                            dX2 = mapped1[0] - mapped2[0];
                            dY2 = mapped1[1] - mapped2[1];
                            dZ2 = mapped1[2] - mapped2[2];
                            if (dX1 === dX2 && dY1 === dY2 && dZ1 === dZ2) {
                                same.push([scan1, mapped1]);
                                continue;
                            }
                            if (eX1 === dX2 && eY1 === dY2 && eZ1 === dZ2) {
                                same.push([scan2, mapped1]);
                                continue;
                            }
                        }
                        if (same.length >= 12) {
                            break;
                        }
                    }
                    if (same.length >= 12) {
                        break;
                    }
                }
                if (same.length >= 12) {
                    break;
                }
            }
            let scanner2Pos;
            if (same.length >= 12) {
                console.log("scans have match");
                const scanner2Pos = [
                    same[0][0][0] - same[0][1][0],
                    same[0][0][1] - same[0][1][1],
                    same[0][0][2] - same[0][1][2]
                ];
                console.log(scanner2Pos);
                let numHit = 0;
                for (let i = 0; i < scanner2.length; i++) {
                    const mapped1 = map(scanner2[i]);
                    const mapped = [
                        scanner2Pos[0] + mapped1[0],
                        scanner2Pos[1] + mapped1[1],
                        scanner2Pos[2] + mapped1[2]
                    ];
                    if (result[mapped.toString()] === 1) {
                        numHit++;
                    }
                }
                if (numHit > 11) {
                for (let i = 0; i < scanner2.length; i++) {
                    const mapped1 = map(scanner2[i]);
                    const mapped = [
                        scanner2Pos[0] + mapped1[0],
                        scanner2Pos[1] + mapped1[1],
                        scanner2Pos[2] + mapped1[2]
                    ];
                    addNewMapped(scanner1, mapped);
                    scanner2[i] = mapped;
                }
                doneA.push(s);
                console.log("leaving with " + numHit);
                return true;
                }
            }
        });
        if (foundIt === true) {
            break;
        }
    }}
    if (start === doneA.length) {
        console.log("no hit!");
        for (let i = 0; i < scanners.length; i++) {
            if (doneA.indexOf(i) === -1) {
                missing += scanners[i].length;
                console.log("was missing " + i);
            }
        }
       break;
    }
}

console.log(Object.keys(result).length + missing);
