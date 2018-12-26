var lines = require("fs").readFileSync("input.day18.txt").slice(0, -1).toString().split("\n");

var grid = [];

var TREE = "|";
var OPEN = ".";
var LUMBER = "#";

for (var y = 0; y < lines.length; y++) {
	grid[y] = [];
	for (var x = 0; x < lines[y].length; x++) {
		grid[y][x] = lines[y][x];
	}
}

function getCount(g, t) {
	var c = 0;
	for (var y = 0; y < g.length; y++) {
		for (var x = 0; x < g[y].length; x++) {
			if (g[y] && g[y][x] === t) {
				c++;
			}
		}
	}
	return c;

}

function adjacentTreeCount(g, x, y, t) {
	var c = 0;
	for (var x1 = x - 1; x1 <= x + 1; x1++) {
		for (var y1 = y - 1; y1 <= y + 1; y1++) {
			if (y1 === y && x1 === x) {
				continue;
			}
			if (g[y1] && g[y1][x1] === t) {
				c++;
			}
		}
	}
	return c;
}

/*
 * An open acre will become filled with trees if three or more adjacent acres contained trees. Otherwise, nothing happens.
 * An acre filled with trees will become a lumberyard if three or more adjacent acres were lumberyards. Otherwise, nothing happens.
 * An acre containing a lumberyard will remain a lumberyard if it was adjacent to at least one other lumberyard and at least one acre containing trees. Otherwise, it becomes open.
*/
function getNextGrid(g) {
	var nextGrid = [];
	for (var y = 0; y < g.length; y++) {
		nextGrid[y] = [];
		for (var x = 0; x < g[y].length; x++) {
			if (g[y][x] === OPEN && adjacentTreeCount(g, x, y, TREE) >= 3) {
				nextGrid[y][x] = TREE;
			} else if (g[y][x] === TREE && adjacentTreeCount(g, x, y, LUMBER) >= 3) {
				nextGrid[y][x] = LUMBER;
			} else if (g[y][x] === LUMBER && (adjacentTreeCount(g, x, y, LUMBER) === 0 || adjacentTreeCount(g, x, y, TREE) === 0)) {
				nextGrid[y][x] = OPEN;
			} else {
				nextGrid[y][x] = grid[y][x];
			}
		}
	}
	return nextGrid;
}

for (var i = 0; i < 500; i++) {
	grid = getNextGrid(grid);
	console.log("MINUTE", i + 1, getCount(grid, TREE) * getCount(grid, LUMBER));
}

for (var y = 0; y < grid.length; y++) {
	var line = "";
	for (var x = 0; x < grid[y].length; x++) {
		line += grid[y][x];
	}
	console.log(line);
}


