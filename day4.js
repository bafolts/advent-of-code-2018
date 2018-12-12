
var fs = require("fs");
var lines = fs.readFileSync("input.day4.txt").toString().slice(0, -1).split("\n");

lines.sort(function (a, b) {
	var dA = new Date(a.substring(1, 17));
	var dB = new Date(b.substring(1, 17));
	return dA.getTime() - dB.getTime();
});

var currentGuard;

var guardMap = {};
var startedSleep;

for (var i = 0; i < lines.length; i++) {
	var line = lines[i];
	var guard = line.match(/^\[([0-9]+)-([0-9]+)-([0-9]+) ([0-9]+):([0-9]+)\] Guard #([0-9]+) begins shift$/);
	var wakesUp = line.match(/^\[([0-9]+)-([0-9]+)-([0-9]+) ([0-9]+):([0-9]+)\] wakes up$/);
	var fallsAsleep = line.match(/^\[([0-9]+)-([0-9]+)-([0-9]+) ([0-9]+):([0-9]+)\] falls asleep$/);
	console.log(line);
	if (wakesUp) {
		if (startedSleep === undefined) {
			console.error("Never was asleep but woke up");
		}
		if (currentGuard === undefined) {
			console.error("Missing guard for wakes up", line);
			process.exit(1);
		}
		if (guardMap[currentGuard] === undefined) {
			guardMap[currentGuard] = [];
		}
		for (var j = parseInt(startedSleep); j < parseInt(wakesUp[5]); j++) {
			guardMap[currentGuard][j] = (guardMap[currentGuard][j] || 0) + 1;
		}
	} else if (fallsAsleep) {
		startedSleep = fallsAsleep[5];
		if (currentGuard === undefined) {
			console.error("Missing guard for falls asleep", line);
			process.exit(1);
		}
	} else if (guard) {
		currentGuard = guard[6];
	} else {
		console.error("Unknown line", line);
		process.exit(1);
	}
}

var maxGuard;
var max = 0;

console.log(guardMap);

Object.keys(guardMap).forEach(function (guard) {
	var sum = 0;
	guardMap[guard].forEach(function (minute) {
		if (minute !== undefined) {
			sum += minute;
		}
	});
	if (sum > max) {
		max = sum;
		maxGuard = guard;
	}
});

max = 0;
var ans = -1;
for (var i = 0; i < 60; i++) {
	var minute = guardMap[maxGuard][i];
	if (minute !== undefined && minute > max) {
		max = minute;
		ans = i;
	}
}

console.log("Guard " + maxGuard + " spent the most time asleep on minute ", ans, " answer should be ", ans * maxGuard);
max = 0;
maxGuard = undefined;
ans = 0;
Object.keys(guardMap).forEach(function (guard) {
	guardMap[guard].forEach(function (minute, index) {
		if (minute !== undefined && minute > max) {
			max = minute;
			maxGuard = guard;
			ans = index;
		}
	});
});

console.log(ans * maxGuard);

