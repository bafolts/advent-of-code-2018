var lines = require("fs").readFileSync("input.day12.txt").slice(0, -1).toString().split("\n");
var generations = 50000000000;

var firstLine = lines[0];

var initialState = firstLine.substring("initial state: ".length);

lines.shift();
lines.shift();

var rules = {};

lines.forEach(function (line) {
	rules[line.substring(0, 5)] = line[line.length - 1];
});

var pots = {};

var minPot = 100;
var maxPot = -1;
var lastSum = 0;
console.log(rules);
for (var i = 0; i < initialState.length; i++) {
	if (initialState[i] === "#") {
		minPot = Math.min(i, minPot);
		maxPot = Math.max(i, maxPot);
		pots[i] = "#";
	}
}

var numRules = rules.length;
console.log("POTS READY", minPot, maxPot);

// Attempt to see when it repeats and determine a formula
// to calculate answer, too slow to get to 50 billion
// want to finish while I am still alive
for (var generate = 1; generate <= 300; generate++) {
	var nextState = {};
	var nextMinPot = Number.MAX_VALUE;
	var nextMaxPot = -1 * Number.MAX_VALUE;
	for (var i = minPot - 5; i <= maxPot + 5; i++) {
		var nextPot = pots[i];
		var rule = rules[
				(pots[i - 2] || ".") +
			    	(pots[i - 1] || ".") +
			    	(pots[i] || ".") +
			    	(pots[i + 1] || ".") +
			    	(pots[i + 2] || ".")];
		if (rule) {
			nextPot = rule;
		}

		if (nextPot === "#") {
			nextMinPot = Math.min(i, nextMinPot);
			nextMaxPot = Math.max(i, nextMaxPot);
			nextState[i] = "#";
		}
	}
	pots = nextState;
	minPot = nextMinPot;
	maxPot = nextMaxPot;
	//if (generate % 1000000 === 0) {
	//	console.log(generate);
	//}

	var sum = 0;
	Object.keys(pots).forEach(function (pot) {
		sum += parseInt(pot);
	});

	console.log("GENERATION:", generate, "SUM:", sum, "DIFF:", sum - lastSum, "GUESS", (8780 + 63 * (generate - 125)));
	lastSum = sum;
}

console.log("FINAL GUESS", (8780 + 63 * (generations - 125)));
