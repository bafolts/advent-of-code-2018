var lines = require("fs").readFileSync("input.day13.txt").slice(0, -1).toString().split("\n");

var carts = [];
var y = 0;
var tracks = {};
var moves = {};

lines.forEach(function (line) {
	for (var i = 0; i < line.length; i++) {
		if (line[i] === "/" || line[i] === "\\" || line[i] === "-" || line[i] === "+" || line[i] === "|") {
			tracks[i + ":" + y] = line[i];
		} else if (line[i] === "<" || line[i] === ">" || line[i] === "^" || line[i] === "v") {
			carts.push({
				x: i,
				y: y,
				d: line[i],
				m: "R",
				r: false
			});
			if (line[i] === "<" || line[i] === ">") {
				tracks[i + ":" + y] = "-";
			} else {
				tracks[i + ":" + y] = "|";
			}
		}
	}
	y++;
});

function nextMove(cart) {
	if (cart.m === "R") {
		cart.m = "L";
	} else if (cart.m === "L") {
		cart.m = "S";
	} else if (cart.m === "S") {
		cart.m = "R";
	} else {
		throw new Error("Unknown next move");
	}
}

while (true) {
	carts.sort(function (a, b) {
		if (a.y === b.y) {
			return a.x - b.x;
		} else {
			return a.y - b.y;
		}
	});
	for (var c = 0; c < carts.length; c++) {
		if (carts[c].r) {
			continue;
		}
		var cart = carts[c];
		var u = tracks[cart.x + ":" + cart.y];
		var t = tracks[cart.x + ":" + (cart.y - 1)];
		var b = tracks[cart.x + ":" + (cart.y + 1)];
		var l = tracks[(cart.x - 1) + ":" + cart.y];
		var r = tracks[(cart.x + 1) + ":" + cart.y];
		if (cart.d === ">") {
			if (r === "-") {
				cart.x++;
			} else if (r === "/") {
				cart.x++;
				cart.d = "^";
			} else if (r === "\\") {
				cart.x++;
				cart.d = "v";
			} else if (r === "+") {
				cart.x++;
				nextMove(cart);
				if (cart.m === "L") {
					cart.d = "^";
				} else if (cart.m === "R") {
					cart.d = "v";
				}
			} else {
				throw new Error("Unknown right move for cart");
			}
		} else if (cart.d === "<") {
			if (l === "-") {
				cart.x--;
			} else if (l === "/") {
				cart.x--;
				cart.d = "v";
			} else if (l === "\\") {
				cart.x--;
				cart.d = "^";
			} else if (l === "+") {
				cart.x--;
				nextMove(cart);
				if (cart.m === "L") {
					cart.d = "v";
				} else if (cart.m === "R") {
					cart.d = "^";
				}
			} else {
				throw new Error("Unknown left move for cart");
			}
		} else if (cart.d === "v") {
			if (b === "|") {
				cart.y++;
			} else if (b === "/") {
				cart.y++;
				cart.d = "<";
			} else if (b === "\\") {
				cart.y++;
				cart.d = ">";
			} else if (b === "+") {
				cart.y++;
				nextMove(cart);
				if (cart.m === "L") {
					cart.d = ">";
				} else if (cart.m === "R") {
					cart.d = "<";
				}
			} else {
				throw new Error("Unkonown down move for cart");
			}
		} else if (cart.d === "^") {
			if (t === "|") {
				cart.y--;
			} else if (t === "/") {
				cart.y--;
				cart.d = ">";
			} else if (t === "\\") {
				cart.y--;
				cart.d = "<";
			} else if (t === "+") {
				cart.y--;
				nextMove(cart);
				if (cart.m === "L") {
					cart.d = "<";
				} else if (cart.m === "R") {
					cart.d = ">";
				}
			} else {
				throw new Error("Unknown up move for cart" + t + "," + u, + "," + cart.d);
			}
		} else {
			throw new Error("Unknown cart" + cart.d);
		}

		// Look for intersection
		for (var cc = 0; cc < carts.length; cc++) {
			if (carts[cc].r === false && carts[cc] !== cart && carts[cc].x === cart.x && carts[cc].y === cart.y) {
				console.log("Carts hit at", carts[cc].x, carts[cc].y);
				carts[cc].r = true;
				cart.r = true;
				break;
			}
		}

	}

	var cartsLeft = 0;
	for (var c = 0; c < carts.length; c++) {
		if (carts[c].r === false) {
			cartsLeft++;
		}
	}

	if (cartsLeft === 1) {
		console.log("Only 1 cart left!");
		for (var c = 0; c < carts.length; c++) {
			if (carts[c].r === false) {
				console.log("Located at", carts[c].x, carts[c].y);
				break;
			}
		}
		break;
	}

}


