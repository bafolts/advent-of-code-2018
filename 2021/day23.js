
function isAtEnd(input) {
    for (let i = input.room1.length - 1; i >= 0; i--) {
        if (input.room1[i] !== "A" ||
            input.room2[i] !== "B" ||
            input.room3[i] !== "C" ||
            input.room4[i] !== "D") {
            return false;
        }
    }
    return true;
}

function whoCanMove(hallwayIndex, letter, input) {
    let ans = [];
    for (let i = hallwayIndex - 1; i >= 0; i--) {
        if (input.hallway[i] === ' ') {
            continue;
        }
        if (input.hallway[i] === letter) {
            ans.push(i);
        }
        break;
    }
    for (let i = hallwayIndex + 1; i < 11; i++) {
        if (input.hallway[i] === ' ') {
            continue;
        }
        if (input.hallway[i] === letter) {
            ans.push(i);
        }
        break;
    }
    return ans;
}

function replaceAt(str, index, replacement) {
    return str.substr(0, index) + replacement + str.substr(index + replacement.length);
}

function getKey(input) {
    return `${input.hallway}${input.room1}${input.room2}${input.room3}${input.room4}`;
}

const roomLetter = " ABCD";

function getLetterFor(roomIndex) {
    return roomLetter[roomIndex];
}

function canMoveIntoRoom(room, letter) {
    for (let i = room.length - 1; i >= 0; i--) {
        if (room[i] !== ' ' && room[i] !== letter) {
            return false;
        }
    }
    return true;
}

function getTopLetter(room) {
    for (let i = 0; i < room.length; i++) {
        if (room[i] !== ' ') {
            return room[i];
        }
    }
}

function getNextMovesForRoom(roomIndex, input) {
    const vroom = "room" + roomIndex;
    const room = input[vroom];
    const letter = getLetterFor(roomIndex);
    if (canMoveIntoRoom(room, letter)) {
        const energy = getEnergyFor(letter);
        const topIndex = getTopIndex(room);
        const roomer = roomIndex * 2;
        const topper = topIndex * energy;
        const lastTop = topIndex - 1;
        return whoCanMove(roomer, letter, input).map((hallwayIndex) => {
            const result = {
                hallway: replaceAt(input.hallway, hallwayIndex, ' '),
                room1: input.room1,
                room2: input.room2,
                room3: input.room3,
                room4: input.room4,
                energy: input.energy + (energy * Math.abs(hallwayIndex - roomer)) + topper
            }
            result[vroom] = replaceAt(input[vroom], lastTop, letter);
            return result;
        });
    }
    return [];
}

function getOpenHallway(roomIndex, input) {
    let open = [];
    for (let i = roomIndex - 1; i >= 0; i--) {
        if (i === 2 || i === 4 || i === 6 || i === 8) {
            continue;
        }
        if (input.hallway[i] === ' ') {
            open.push(i);
        } else {
            break;
        }
    }
    for (let i = roomIndex + 1; i < 11; i++) {
        if (i === 2 || i === 4 || i === 6 || i === 8) {
            continue;
        }
        if (input.hallway[i] === ' ') {
            open.push(i);
        } else {
            break;
        }
    }
    return open;
}

const value = {
    A: 1,
    B: 10,
    C: 100,
    D: 1000
};

function getEnergyFor(letter) {
    return value[letter];
}

function canMoveFromRoom(room, letter) {
    for (let i = 0; i < room.length; i++) {
        if (room[i] !== ' ' && room[i] !== letter) {
            return true;
        }
    }
    return false;
}

function getTopIndex(room) {
    for (let i = 0; i < room.length; i++) {
        if (room[i] !== ' ') {
            return i;
        }
    }
    return room.length;
}

function getNextMovesFromRoom(roomIndex, input) {
    const room = input["room" + roomIndex];
    const letter = getLetterFor(roomIndex);
    if (canMoveFromRoom(room, letter)) {
        const topIndex = getTopIndex(room);
        const letterEnergy = getEnergyFor(room[topIndex]);
        return getOpenHallway(roomIndex * 2, input).map((hallwayIndex) => {
            const result = {
                hallway: replaceAt(input.hallway, hallwayIndex, room[topIndex]),
                room1: input.room1,
                room2: input.room2,
                room3: input.room3,
                room4: input.room4,
                energy: input.energy + letterEnergy + (Math.abs(hallwayIndex - (roomIndex * 2)) * letterEnergy) + (letterEnergy * topIndex)
            };
            result["room" + roomIndex] = replaceAt(input["room" + roomIndex], topIndex, ' ');
            return result;
        });
    }
    return [];
}

function nextMovescanMove(input) {
    return [].concat(
        getNextMovesForRoom(1, input),
        getNextMovesForRoom(2, input),
        getNextMovesForRoom(3, input),
        getNextMovesForRoom(4, input),
        getNextMovesFromRoom(1, input),
        getNextMovesFromRoom(2, input),
        getNextMovesFromRoom(3, input),
        getNextMovesFromRoom(4, input)
    );
}

function calculateFor(state) {
    let states = [state];
    while (states.length > 0) {
        let seen = {};
        for (let i = states.length - 1; i >= 0; i--) {
            const st = states[i];
            if (isAtEnd(st) === true) {
                return st.energy;
            }
            nextMovescanMove(st).forEach((input) => {
                const key = getKey(input);
                if (seen[key] === undefined ||
                    input.energy < seen[key].energy) {
                    seen[key] = input;
                }
            });
        }
        states = Object.values(seen);
    }
    return -1;
}

console.log("part 1", calculateFor({
    energy: 0,
    hallway: "           ",
    room1: "AC",
    room2: "DC",
    room3: "AD",
    room4: "BB"
}));

console.log("part 2", calculateFor({
    energy: 0,
    hallway: "           ",
    room1: "ADDC",
    room2: "DCBC",
    room3: "ABAD",
    room4: "BACB"
}));

