
var lines = require("fs")
		.readFileSync("input.day16.txt")
		.slice(0, -1)
		.toString()
		.split("\n");

var reg = [0, 0, 0, 0];

function addr(A, B, C) {
	reg[C] = reg[A] + reg[B];
}

function addi(A, B, C) {
	reg[C] = reg[A] + B;
}

function mulr(A, B, C) {
	reg[C] = reg[A] * reg[B];
}

function muli(A, B, C) {
	reg[C] = reg[A] * B;
}

function banr(A, B, C) {
	reg[C] = reg[A] & reg[B];
}

function bani(A, B, C) {
	reg[C] = reg[A] & B;
}

function borr(A, B, C) {
	reg[C] = reg[A] | reg[B];
}

function bori(A, B, C) {
	reg[C] = reg[A] | B;
}

function setr(A, B, C) {
	reg[C] = reg[A];
}

function seti(A, B, C) {
	reg[C] = A;
}

function gtir(A, B, C) {
	if (A > reg[B]) {
		reg[C] = 1;
	} else {
		reg[C] = 0;
	}
}

function gtri(A, B, C) {
	if (reg[A] > B) {
		reg[C] = 1;
	} else {
		reg[C] = 0;
	}
}

function gtrr(A, B, C) {
	if (reg[A] > reg[B]) {
		reg[C] = 1;
	} else {
		reg[C] = 0;
	}
}

function eqir(A, B, C) {
	if (A === reg[B]) {
		reg[C] = 1;
	} else {
		reg[C] = 0;
	}
}

function eqri(A, B, C) {
	if (reg[A] === B) {
		reg[C] = 1;
	} else {
		reg[C] = 0;
	}
}

function eqrr(A, B, C) {
	if (reg[A] === reg[B]) {
		reg[C] = 1;
	} else {
		reg[C] = 0;
	}
}

var samples = [];
var operations = [
	addr,
	addi,
	mulr,
	muli,
	banr,
	bani,
	borr,
	bori,
	setr,
	eqir,
	gtir,
	gtri,
	gtrr,
	seti,
	eqri,
	eqrr,
];

var ans = 0;
for (var i = 0; i < 3124; i+=4) {
	var before = lines[i].substring("Before: ".length + 1);
	before = before.substring(0, before.length - 1)
			.split(", ")
			.map(function (m) { return parseInt(m); });
	var inputs = lines[i + 1].split(" ").map(function (m) { return parseInt(m); });
	var after = lines[i + 2].substring("After:  ".length + 1);
	after = after.substring(0, after.length - 1)
			.split(", ")
			.map(function (m) { return parseInt(m); });
	samples.push({
		before: before,
		after: after,
		inputs: inputs
	});
}

samples.forEach(function (sample) {
	var potential = 0;
	var before = sample.before;
	var after = sample.after;
	var inputs = sample.inputs;
	for (var o = 0; o < operations.length; o++) {
		reg = before.slice();
		operations[o](inputs[1], inputs[2], inputs[3]);
		if (reg[0] === after[0] && reg[1] === after[1] && reg[2] === after[2] && reg[3] === after[3]) {
			potential++;
		}
	}
	if (potential >= 3) {
		ans++;
	}
});

console.log("PART1", ans);

function isRight(operation, index) {
	for (var i = 0; i < samples.length; i++) {
		var sample = samples[i];
		reg = sample.before.slice();
		if (sample.inputs[0] === operation) {
			operations[index](sample.inputs[1], sample.inputs[2], sample.inputs[3]);
			if (reg[0] !== sample.after[0] || reg[1] !== sample.after[1] || reg[2] !== sample.after[2] || reg[3] !== sample.after[3]) {
				return false;
			}
		}
	}
	return true;
}

var couldBe = [];;

function combo(used) {
	if (used.length === 16) {
		couldBe.push(used);
		return;
	}
	var tryDepth = used.length;
	for (var c = 0; c < 16; c++) {
		if (isRight(tryDepth, c)) {
			if (used.indexOf(c) === -1) {
				var t = used.slice();
				t.push(c);
				combo(t);
			}
		}
	}
}

combo([]);

if (couldBe.length > 1) {
	throw "Didnt find answer";
}

reg = [0, 0, 0, 0];

for (var i = 3126; i < lines.length - 1; i++) {
	var inputs = lines[i].split(" ").map(Number);
	if (inputs.length !== 4) {
		throw "bad input line";
	}
	operations[couldBe[0][inputs[0]]](inputs[1], inputs[2], inputs[3]);
}

console.log("PART 2", reg[0]);
