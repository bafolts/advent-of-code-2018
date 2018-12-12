
var fs = require("fs");
var lines = fs.readFileSync("input.day6.txt").slice(0, -1).toString().split("\n");

var coords = [];
var count = {};
var maxX = 0;
var maxY = 0;

for (var i = 0; i < lines.length; i++) {
	var parts = lines[i].split(", ");
	var x = parts[0] * 1;
	var y = parts[1] * 1;
	coords.push({ x: x, y: y });
	if (y > maxY) {
		maxY =  y;
	}
	if (x > maxX) {
		maxX = x;
	}
}

var ans = 0;

for (var x = 0; x < maxX; x++) {
	for (var y = 0; y < maxY; y++) {
		var point = undefined;
		var minDistance = undefined;
		var distances = [];
		for (var c = 0; c < coords.length; c++) { 
			var distance = Math.abs(coords[c].x - x) + Math.abs(coords[c].y - y);
			distances.push(distance);
			if (minDistance === undefined || distance < minDistance) {
				minDistance = distance;
				point = c;
			}
		}
		distances.sort(function (a, b) { return a - b; });
		if (distances[0] !== distances[1]) {
			if (count[point] === undefined) {
				count[point] = 0;
			}
			count[point]++;

			if (count[point] > ans) {
				ans = count[point];
			}
		}
	}
}

console.log(count);
console.log("Result:", ans);
