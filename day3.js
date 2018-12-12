
var fs = require("fs");
var lines = fs.readFileSync("input.day3.txt").toString().split("\n");

var taken = {};

for (var i = 0; i < lines.length - 1; i++) {
	var line = lines[i];
	var parts = line.match(/#[0-9]+ @ ([0-9]+),([0-9]+): ([0-9]+)x([0-9]+)$/);
	var x = parseInt(parts[1]);
	var y = parseInt(parts[2]);
	var width = parseInt(parts[3]);
	var height = parseInt(parts[4]);
	
	for (var x1 = x; x1 < x + width; x1++) {
		for (var y1 = y; y1 < y + height; y1++) {
			taken[x1 + ":" + y1] = (taken[x1 + ":" + y1] || 0) + 1;
		}
	}
}

for (var i = 0; i < lines.length - 1; i++) {
	var line = lines[i];
	var parts = line.match(/#[0-9]+ @ ([0-9]+),([0-9]+): ([0-9]+)x([0-9]+)$/);
	var x = parseInt(parts[1]);
	var y = parseInt(parts[2]);
	var width = parseInt(parts[3]);
	var height = parseInt(parts[4]);
	var notGood = false;

	for (var x1 = x; x1 < x + width; x1++) {
		for (var y1 = y; y1 < y + height; y1++) {
			if (taken[x1 + ":" + y1] !== 1) {
				notGood = true;
			}
		}
	}

	if (notGood === false) {
		console.log(line);
		break;
	}
}


var f = 0;

Object.keys(taken).forEach(function (t) {
	if (taken[t] >= 2) {
		f++;
	}
});

console.log(f);


