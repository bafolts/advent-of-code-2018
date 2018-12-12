
var fs = require("fs");

var lines = fs.readFileSync("input.day2.txt").toString().split("\n");

var exactlyTwoCount = 0;
var exactlyThreeCount = 0;

for (var i = 0; i < lines.length; i++) {
	var seen = {};
	var seenTwo = false;
	var seenThree = false;
	for (var j = 0; j < lines[i].length; j++) {
		seen[lines[i][j]] = (seen[lines[i][j]] || 0) + 1;
	}
	Object.keys(seen).forEach(function (letter) {
		if (seenTwo === false && seen[letter] === 2) {
			exactlyTwoCount++;
			seenTwo = true;
		}
		if (seenThree === false && seen[letter] === 3) {
			exactlyThreeCount++;
			seenThree = true;
		}
	});
}

console.log("Words with 2", exactlyTwoCount);
console.log("Words with 3", exactlyThreeCount);
console.log("Checksum", exactlyTwoCount * exactlyThreeCount);

for (var i = 0; i < lines.length - 1; i++) {
	for (var j = i + 1; j < lines.length - 1; j++) {
		var diffCount = 0;
		var diffIndex = 0;
		for (var c = 0; c < lines[i].length; c++) {
			if (lines[i][c] !== lines[j][c]) {
				diffCount++;
				diffIndex = c;
			}
		}
		console.warn("DIFF COUNT IS", diffCount);

		if (diffCount === 1) {
			console.log("ANS", lines[i].substring(0, diffIndex) + lines[i].substring(diffIndex + 1));
			return;
		}
	}
}

