var fs = require("fs");
var numbers = fs.readFileSync("input.day8.txt").slice(0, -1).toString().split(" ").map(Number);

var sum = 0;
function Node(s, i) {
	this.childIndex = i;
	var childrenCount = s[i];
	var metadataCount = s[i + 1];
	this.children = [];
	this.metadata = [];
	this.childIndex += 2;
	if (childrenCount > 0) {
		for (var j = 0; j < childrenCount; j++) {
			var child = new Node(s, this.childIndex);
			this.childIndex = child.childIndex;
			this.children.push(child);
		}
	}
	if (metadataCount > 0) {
		for (var j = 0; j < metadataCount; j++) {
			sum += s[this.childIndex];
			this.metadata.push(s[this.childIndex++]);
		}
	}
}

Node.prototype.getValue = function() {
	var sum = 0;
	for (var i = 0; i < this.metadata.length; i++) {
		if (this.children[this.metadata[i] - 1] !== undefined) {
			sum += this.children[this.metadata[i] - 1].getValue();
		} else if (this.children.length === 0) {
			sum += this.metadata[i];
		}
	}
	return sum;
}

var root = new Node(numbers, 0);

console.log(root.getValue());

