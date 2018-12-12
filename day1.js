
var fs = require("fs");

var file = fs.readFileSync("input.day1.txt").toString();
var lines = file.split("\n");

var start = 0;
var seen = { "0": 1 };
var foundFirst = false;

while (!foundFirst) {
for (var i = 0; i < lines.length; i++) {
	if (lines[i]) {
		if (lines[i][0] === "+") {
			start += parseInt(lines[i].substring(1));		
		} else {
			start -= parseInt(lines[i].substring(1));
		}
		if (foundFirst === false && seen[start] === 1) {
			console.log("First Seen Is", start);
			foundFirst = true;
		}
		seen[start] = 1;
	}
}
}

console.log("Total Changes", start);
