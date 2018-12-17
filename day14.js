
var scores = [3, 7];
var scoreSize = 2;
var elf1Index = 0;
var elf2Index = 1;
var puzzleInput = 580741;

function foundMatch() {
	return scores[scoreSize - 1] === 1 && scores[scoreSize - 2] === 4 && scores[scoreSize - 3] === 7 && scores[scoreSize - 4] === 0 && scores[scoreSize - 5] === 8 && scores[scoreSize - 6] === 5;
}

while (true) {
	var combined = scores[elf1Index] + scores[elf2Index];
	if (combined >= 10) {
		scores.push(1);
		scoreSize++;
		if (foundMatch()) {
			console.log("PART2", scoreSize - 6);
			break;
		}
		combined -= 10;
	}
	scores.push(combined);
	scoreSize++;
	if (foundMatch()) {
		console.log("PART2", scoreSize - 6);
		break;
	}
	var moves = 1 + scores[elf1Index];
	for (var j = 0; j < moves; j++) {
		elf1Index++;
		if (elf1Index >= scoreSize) {
			elf1Index = 0;
		}
	}
	moves = 1 + scores[elf2Index];
	for (j = 0; j < moves; j++) {
		elf2Index++;
		if (elf2Index >= scoreSize) {
			elf2Index = 0;
		}
	}
}

var ans = [];
for (var i = puzzleInput; i < puzzleInput + 10; i++) {
	ans.push(scores[i]);
}
console.log("PART1", ans);
