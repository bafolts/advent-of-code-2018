const fs = require("fs");

let input = fs.readFileSync("./input16.txt").toString().split("\n");

input.pop();

let binaryString = "";
let line = input[0];

for (let i = 0; i < line.length; i++) {
    binaryString += parseInt(line[i], 16).toString(2).padStart(4, '0');
}

let sum = 0;

function parsePacket(place) {
    const version = parseInt(binaryString.substr(place, 3), 2);
    sum += version;
    const typeId = parseInt(binaryString.substr(place + 3, 3), 2);
    const subpackets = [];
    let value = "";
    if (typeId !== 4) {
        const lengthTypeID = binaryString[place + 6];
        if (lengthTypeID === "0") {
            let totalLength = parseInt(binaryString.substr(place + 7, 15), 2);
            place += 7 + 15;
            totalLength += place;
            while (place < totalLength) {
                const p = parsePacket(place);
                place = p.end;
                subpackets.push(p);
            }
        } else {
            let numberOfSubPackets = parseInt(binaryString.substr(place + 7, 11), 2);
            place += 7 + 11;
            while (numberOfSubPackets > 0) {
                const p = parsePacket(place);
                place = p.end;
                subpackets.push(p);
                numberOfSubPackets--;
            }
        }
    } else if (typeId === 4) {
        place += 6;
        while (binaryString[place++] === "1") {
            value += binaryString.substr(place, 4);
            place += 4;
        }
        value += binaryString.substr(place, 4);
        value = parseInt(value, 2);
        place += 4;
    }
    return {
        version: version,
        typeId: typeId,
        subpackets: subpackets,
        value: value,
        end: place
    };
}

function process(packet) {
    if (packet.typeId === 0) {
        let sum = 0;
        for (let i = 0; i < packet.subpackets.length; i++) {
            sum += process(packet.subpackets[i]);
        }
        return sum;
    } else if (packet.typeId === 1) {
        let prod = 1;
        for (let i = 0; i < packet.subpackets.length; i++) {
            prod *= process(packet.subpackets[i]);
        }
        return prod;
    } else if (packet.typeId === 2) {
        let min = process(packet.subpackets[0]);
        for (let i = 1; i < packet.subpackets.length; i++) {
            min = Math.min(min, process(packet.subpackets[i]) );
        }
        return min;
    } else if (packet.typeId === 3) {
        let max = process(packet.subpackets[0]);
        for (let i = 1; i < packet.subpackets.length; i++) {
            max = Math.max(max, process(packet.subpackets[i]) );
        }
        return max;
    } else if (packet.typeId === 5) {
        if (packet.subpackets.length !== 2) {
            throw new Error("not valid greater than");
        }
        return process(packet.subpackets[0]) > process(packet.subpackets[1]) ? 1 : 0;
    } else if (packet.typeId === 6) {
        if (packet.subpackets.length !== 2) {
            throw new Error("not valid less than");
        }
        return process(packet.subpackets[0]) < process(packet.subpackets[1]) ? 1 : 0;
    } else if (packet.typeId === 7) {
        if (packet.subpackets.length !== 2) {
            throw new Error("not valid equal");
        }
        return process(packet.subpackets[0]) === process(packet.subpackets[1]) ? 1 : 0;
    } else if (packet.typeId === 4) {
        return packet.value;
    } else {
        throw new Error("unexepected type " + packet.typeId);
    }
}

const packet = parsePacket(0);
console.log("part 1", sum);
console.log("part 2", process(packet));
