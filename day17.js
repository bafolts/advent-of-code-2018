
var lines = require("fs").readFileSync("input.day17.txt").slice(0, -1).toString().split("\n");

var grid = [];

var minX = Number.MAX_VALUE;
var maxX = 0;
var minY = Number.MAX_VALUE;
var maxY = 0;

lines.forEach(function (line) {
	var match = line.match(/^x=([0-9]+), y=([0-9]+)..([0-9]+)$/);
	if (match) {
		var x = match[1];
		if (!grid[x]) {
			grid[x] = [];
		}
		var y1 = match[2];
		var y2 = match[3];
		for (var y = y1; y <= y2; y++) {
			grid[x][y] = 1;
		}
		minX = Math.min(minX, x);
		maxX = Math.max(maxX, x);
		minY = Math.min(minY, y1);
		maxY = Math.max(maxY, y2);
		return;
	}
	match = line.match(/^y=([0-9]+), x=([0-9]+)..([0-9]+)$/);
	if (match) {
		var y = match[1];
		var x1 = match[2];
		var x2 = match[3];
		for (var x = x1; x <= x2; x++) {
			if (!grid[x]) {
				grid[x] = [];
			}
			grid[x][y] = 1;
		}
		minX = Math.min(minX, x1);
		maxX = Math.max(maxX, x2);
		minY = Math.min(minY, y);
		maxY = Math.max(maxY, y);
		return;
	}
	throw "EEE";
});

minX--;
maxX++;

var water = [];
water[500] = [1];

function sandAtPoint(x, y) {
	return grid[x] === undefined || grid[x][y] === undefined;
}

function wallAtPoint(x, y) {
	return grid[x] && grid[x][y] === 1;
}

function waterAtPoint(x, y) {
	return water[x] !== undefined && water[x][y] === 1;
}

function putWaterAt(x, y) {
	if (water[x] === undefined) {
		water[x] = [];
	}
	water[x][y] = 1;
}

function printIt() {
var s = "";
for (var y = 0; y <= maxY; y++) {
	var line = "";
	for (var x = minX; x <= maxX; x++) {
		if (wallAtPoint(x, y)) {
			line += "#";
		} else {
			if (water[x] && water[x][y]) {
				if (water[x][y] === 1) {
					if (y >= minY && y <= maxY) {
						line += "~";
						waterCount++;
					} else {
						line += "|";

					}
				} else {
					line += "~";
				}
			} else if (sandAtPoint(x, y)) {
				line += ".";
			}
		}
	}
	s += line + "\n";
}
return s;
}

function waterWallAt(x, y) {
	var dx = x - 1;
	var hitWallLeft;
	var hitWallRight;
	while (waterAtPoint(dx, y)) {
		dx--;
	}
	hitWallLeft = wallAtPoint(dx, y);
	dx = x + 1;
	while (waterAtPoint(dx, y)) {
		dx++;
	}
	hitWallRight = wallAtPoint(dx, y);
	return hitWallLeft && hitWallRight;
}

function Drop(x, y) {
	this.x = x;
	this.y = y;
}

var drops = [];
drops.push(new Drop(500, 0));

var placedDrops = {};

while (drops.length) {
	var drop = drops.shift();
	putWaterAt(drop.x, drop.y);
	if (waterAtPoint(drop.x, drop.y + 1)) {
		if (blockedRow(drop.x, drop.y + 1)) {
			fillFrom(drop.x, drop.y);
		}
	} else if (wallAtPoint(drop.x, drop.y + 1)) {
		fillFrom(drop.x, drop.y);
	} else if (drop.y <= maxY && (sandAtPoint(drop.x, drop.y + 1) && !waterAtPoint(drop.x, drop.y + 1))) {
		drops.push(new Drop(drop.x, drop.y + 1));
	}
}

function blockedRow(x, y) {
	var dx = x;
	while (waterAtPoint(dx, y)) {
		dx--;
	}
	if (!wallAtPoint(dx, y)) {
		return false;
	}
	dx = x;
	while (waterAtPoint(dx, y)) {
		dx++;
	}
	if (!wallAtPoint(dx, y)) {
		return false;
	}
	return true;
}

function fillFrom(x, y) {
	var canFill = true;
	var dy = y;
	while (canFill) {
		let dx = x - 1;
		putWaterAt(drop.x, dy);
		var hitLeftWall = false;
		var hitRightWall = false;
		while (!wallAtPoint(dx, dy) && (waterAtPoint(dx, dy + 1) || wallAtPoint(dx, dy + 1))) {
			putWaterAt(dx, dy);
			dx--;
		}
		if (wallAtPoint(dx, dy)) {
			hitLeftWall = true;
		}
		if ((sandAtPoint(dx, dy) && !waterAtPoint(dx, dy)) && waterAtPoint(dx + 1, dy) && wallAtPoint(dx + 1, dy + 1)) {
			if (!placedDrops[dx + ":" + dy]) {
				drops.push(new Drop(dx, dy));
			}
			placedDrops[dx + ":" + dy] = 1;
			canFill = false;
		}
		dx = drop.x + 1;
		while (!wallAtPoint(dx, dy) && (waterAtPoint(dx, dy + 1) || wallAtPoint(dx, dy + 1))) {
			putWaterAt(dx, dy);
			dx++;
		}
		if (wallAtPoint(dx, dy)) {
			hitRightWall = true;
		}
		if ((sandAtPoint(dx, dy) && !waterAtPoint(dx, dy)) && waterAtPoint(dx - 1, dy) && wallAtPoint(dx - 1, dy + 1)) {
			if (!placedDrops[dx + ":" + dy]) {
				drops.push(new Drop(dx, dy));
			}
			placedDrops[dx + ":" + dy] = 1;
			canFill = false;
		}
		dy--;
		if (!hitLeftWall || !hitRightWall) {
			break;
		}
	}
}

function fallOffLeft(x, y) {
	var dx = x - 1;
	while (wallAtPoint(dx, y + 1) || waterAtPoint(dx, y + 1)) {
		if (wallAtPoint(dx, y)) {
			return;
		}
		dx--;
	}
	if (wallAtPoint(dx + 1, y + 1)) {
		return new Drop(dx, y);
	}
}

function fallOffRight(x, y) {
	var dx = x + 1;
	while (wallAtPoint(dx, y + 1) || waterAtPoint(dx, y + 1)) {
		if (wallAtPoint(dx, y)) {
			return;
		}
		dx++;
	}
	if (wallAtPoint(dx - 1, y + 1)) {
		return new Drop(dx, y);
	}
}

function fillBelow(x, y) {
	var dx = x - 1;
	var filled = false;
	while (sandAtPoint(dx, y) && (wallAtPoint(dx, y + 1) || waterAtPoint(dx, y + 1))) {
		putWaterAt(dx, y);
		dx--;
		filled = true;
	}
	dx = x + 1;
	while (sandAtPoint(dx, y) && (wallAtPoint(dx, y + 1) || waterAtPoint(dx, y + 1))) {
		putWaterAt(dx, y);
		dx++;
		filled = true;
	}
	return filled;
}

var waterCount = 0;
require("fs").writeFileSync("out.txt", printIt());

/*
for (var x = 0; x < water.length; x++) {
	if (water[x])
	for (var y = minY; y <= maxY; y++) {
		if (water[x][y]) {
			waterCount++;
		}
	}
}*/

console.log("Water count", waterCount);
