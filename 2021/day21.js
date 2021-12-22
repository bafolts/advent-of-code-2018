const fs = require("fs");

let input = fs.readFileSync("./input21.txt").toString().split("\n");

input.pop();

let player1Position = 2;
let player2Position = 7;

let player1Score = 0;
let player2Score = 0;

let theDie = 1;

function getRoll() {
    let sum = (theDie++); // 3 copies
    if (theDie === 101) {
        theDie = 1;
    }
    sum += (theDie++);
    if (theDie === 101) {
        theDie = 1;
    }
    sum += (theDie++);
    if (theDie === 101) {
        theDie = 1;
    }
    return sum;
}

function doRoll(position, r) {
    while (r-- > 0) {
        position++;
        if (position === 11) {
            position = 1;
        }
    }
    return position;
}

let turn = 0;
while (player1Score < 1000 && player2Score < 1000) {
    const roll = getRoll();
    if (turn % 2 === 0) {
        player1Position = doRoll(player1Position, roll);
        player1Score += player1Position;
    } else {
        player2Position = doRoll(player2Position, roll);
        player2Score += player2Position;
    }
    turn++;
}

console.log(player1Score * (turn * 3));
const dice = [0, 0, 0, 1, 3, 6, 7, 6, 3, 1];


// taken from co-worker's wonderful solution
// https://github.com/elliot-nelson/advent-of-code/blob/main/src/2021/21/DiracDice.ts
function stepDiracDice(states) {

    const results = [];
    const hash = {};

    for (let state of states) {
        for (let move = 3; move < dice.length; move++) {
            const universes = dice[move];
            const newState = {
                positions: state.positions.slice(),
                scores: state.scores.slice(),
                turn: state.turn,
                universes: state.universes
            };
            newState.positions[newState.turn] = (newState.positions[newState.turn] + move - 1) % 10 + 1;
            newState.scores[newState.turn] += newState.positions[newState.turn];
            newState.turn = 1 - newState.turn;
            newState.universes *= universes;

            const key = `${newState.positions},${newState.scores},${newState.turn}`;

            if (hash[key]) {
                results[hash[key]].universes += newState.universes;
            } else {
                hash[key] = results.length;
                results.push(newState);
            }
        }
    }

    return results;
}

function simulateDiracDice(players) {
    let states = [
        { positions: [...players], scores: [0, 0], turn: 0, universes: 1 }
    ];

    const winning = [0, 0];

    while (states.length > 0) {
        states = stepDiracDice(states);

        states = states.filter(state => {
            if (state.scores[0] >= 21) {
                winning[0] += state.universes;
                return false;
            }
            if (state.scores[1] >= 21) {
                winning[1] += state.universes;
                return false;
            }
            return true;
        });
    }

    return Math.max(...winning);
}

console.log(simulateDiracDice([2, 7]));
