
const input = [
    "#############",
    "#...........#",
    "###A#D#A#B###",
    "  #C#C#D#B#  ",
    "  #########  "
];

// A = 1
// B = 10
// C = 100
// D = 1000

function isAtEnd(input) {
    for (let i = 0; i < input.room1.length; i++) {
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
    for (let i = hallwayIndex; i >= 0; i--) {
        if (input.hallway[i] === undefined) {
            continue;
        }
        if (input.hallway[i] === letter) {
            ans.push(i);
        }
        break;
    }
    for (let i = hallwayIndex; i < input.hallway.length; i++) {
        if (input.hallway[i] === undefined) {
            continue;
        }
        if (input.hallway[i] === letter) {
            ans.push(i);
        }
        break;
    }
    return ans;
}

function copyState(input) {
    return {
        energy: input.energy,
        hallway: input.hallway.slice(),
        room1: input.room1.slice(),
        room2: input.room2.slice(),
        room3: input.room3.slice(),
        room4: input.room4.slice()
    };
}

function equal(state1, state2) {
    for (let i = 0; i < state1.hallway.length; i++) {
        if (state1.hallway[i] !== state2.hallway[i]) {
            return false;
        }
    }
    if (state1.room1.length !== state2.room1.length ||
        state1.room2.length !== state2.room2.length ||
        state1.room3.length !== state2.room3.length ||
        state1.room4.length !== state2.room4.length) {
        throw new "FFFFFF";
    }
    for (let i = 0; i < state1.room1.length; i++) {
        if (state1.room1[i] !== state2.room1[i] ||
            state1.room2[i] !== state2.room2[i] ||
            state1.room3[i] !== state2.room3[i] ||
            state1.room4[i] !== state2.room4[i]) {
            return false;
        }
    }
    return true;
}

function getLetterFor(roomIndex) {
    return [undefined, "A", "B", "C", "D"][roomIndex];
}

function canMoveIntoRoom(room, letter) {
    for (let i = 0; i < room.length; i++) {
        if (room[i] !== undefined && room[i] !== letter) {
            return false;
        }
    }
    return true;
}

function getTopLetter(room) {
    for (let i = 0; i < room.length; i++) {
        if (room[i] !== undefined) {
            return room[i];
        }
    }
    return undefined;
}

function getNextMovesForRoom(roomIndex, input) {
    const room = input["room" + roomIndex];
    const letter = [undefined, "A", "B", "C", "D"][roomIndex];
    const energy = getEnergyFor(letter);
    const nextMoves = [];
    const topIndex = getTopIndex(room);
    if (canMoveIntoRoom(room, letter)) {
        // can come from hallway
        whoCanMove(roomIndex * 2, letter, input).forEach((hallwayIndex) => {
            const newState = copyState(input);
            newState.hallway[hallwayIndex] = undefined;
            const newEnergy = (energy * Math.abs(hallwayIndex - (roomIndex * 2))) + (topIndex * energy);
            newState["room" + roomIndex][topIndex - 1] = letter;
            newState.energy += newEnergy;
            nextMoves.push(newState);
        });
    }
    return nextMoves;
}

function getOpenHallway(roomIndex, input) {
    let open = [];
    for (let i = roomIndex - 1; i >= 0; i--) {
        if (i === 2 || i === 4 || i === 6 || i === 8) {
            continue;
        }
        if (input.hallway[i] === undefined) {
            open.push(i);
        } else {
            break;
        }
    }
    for (let i = roomIndex + 1; i < input.hallway.length; i++) {
        if (i === 2 || i === 4 || i === 6 || i === 8) {
            continue;
        }
        if (input.hallway[i] === undefined) {
            open.push(i);
        } else {
            break;
        }
    }
    return open;
}

function getEnergyFor(letter) {
    if (letter === "A") {
        return 1;
    }
    if (letter === "B") {
        return 10;
    }
    if (letter === "C") {
        return 100;
    }
    if (letter === "D") {
        return 1000;
    }
    return 0;
}

function canMoveFromRoom(room, letter) {
    for (let i = 0; i < room.length; i++) {
        if (room[i] !== undefined && room[i] !== letter) {
            return true;
        }
    }
    return false;
}

function getTopIndex(room) {
    for (let i = 0; i < room.length; i++) {
        if (room[i] !== undefined) {
            return i;
        }
    }
    return room.length;
}

function getNextMovesFromRoom(roomIndex, input) {
    const room = input["room" + roomIndex];
    const letter = [undefined, "A", "B", "C", "D"][roomIndex];
    const nextMoves = [];
    const topIndex = getTopIndex(room);
    const letterEnergy = getEnergyFor(room[topIndex]);
    if (canMoveFromRoom(room, letter)) {
        getOpenHallway(roomIndex * 2, input).forEach((hallwayIndex) => {
            const newState = copyState(input);
            const newEnergy = letterEnergy + (Math.abs(hallwayIndex - (roomIndex * 2)) * letterEnergy) + (letterEnergy * topIndex);
            newState.hallway[hallwayIndex] = room[topIndex];
            newState["room" + roomIndex][topIndex] = undefined;
            newState.energy += newEnergy;
            nextMoves.push(newState);
        });
    }
    return nextMoves;
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
        let next = [];
        for (let i = 0; i < states.length; i++) {
            if (isAtEnd(states[i])) {
                return states[i].energy;
            } else {
                nextMovescanMove(states[i]).forEach((input) => {
                    const match = next.findIndex((n) => equal(n, input));
                    if (match !== -1) {
                        if (input.energy < next[match].energy) {
                            next[match] = input;
                        }
                    } else {
                        next.push(input);
                    }
                });
            }
        }
        states = next;
    }
    return ends;
}

console.log("part 1", calculateFor({
    energy: 0,
    hallway: new Array(11).fill(undefined),
    room1: ["A", "C"],
    room2: ["D", "C"],
    room3: ["A", "D"],
    room4: ["B", "B"]
}));

console.log("part 2", calculateFor({
    energy: 0,
    hallway: new Array(11).fill(undefined),
    room1: ["A", "D", "D", "C"],
    room2: ["D", "C", "B", "C"],
    room3: ["A", "B", "A", "D"],
    room4: ["B", "A", "C", "B"]
}));

