const fs = require("fs");

let input = fs.readFileSync("./input18.txt").toString().split("\n");

input.pop();

function Node(leftVal, rightVal) {
    this.leftVal = leftVal;
    this.rightVal = rightVal;
}

function getExploder(line) {
    let stack = [];
    for (let i = 0; i < line.length; i++) {
        if (line[i] === '[') {
            stack.push(i);
        }
        if (line[i] === ']') {
            if (stack.length > 4) {
                let opener = stack[stack.length - 1] - 1;
                let toAddLeft = "";
                let toAddRight = "";
                while (opener >= 0 && isNaN(parseInt(line[opener]))) {
                    toAddLeft = line[opener] + toAddLeft;
                    opener--;
                }
                let closer = i + 1;
                while (closer < line.length && isNaN(parseInt(line[closer]))) {
                    toAddRight += line[closer];
                    closer++;
                }
                let leftVal;
                let rightVal;
                let result = "";
                let values = line.substring(stack[stack.length - 1] + 1, i).split(",").map(Number);
                if (opener > 0) {
                    leftVal = line[opener--];
                    while (isNaN(parseInt(line[opener])) === false) {
                        leftVal = line[opener] + leftVal;
                        opener--;
                    }
                    leftVal = parseInt(leftVal);
                    result += line.substring(0, opener + 1);
                    result += leftVal + values[0] + toAddLeft;
                } else {
                    result = toAddLeft;
                }
                result += '0';
                if (closer < line.length) {
                    rightVal = line[closer++];
                    while (isNaN(parseInt(line[closer])) === false) {
                        rightVal += line[closer];
                        closer++;
                    }
                    rightVal = parseInt(rightVal);
                    result += toAddRight;
                    result += rightVal + values[1];
                    result += line.substring(closer);
                } else {
                    result += toAddRight;
                }
                return result;
            } else {
                stack.pop();
            }
        }
    }
    return line;
}

function getSplitter(line) {
    for (let i = 0; i < line.length; i++) {
        if (isNaN(parseInt(line[i])) === false) {
            if (isNaN(parseInt(line[i + 1])) === false) {
                let large = line[i] + line[i + 1];
                let j = i + 2;
                for (; j < line.length; j++) {
                    if (isNaN(parseInt(line[j]))) {
                        break;
                    }
                    large += line[j];
                }
                large = parseInt(large);
                return line.substring(0, i) + '[' + Math.floor(large / 2) + ',' + Math.ceil(large / 2) + ']' + line.substring(j); 
            }
        }
    }
    return line;
}

console.assert(getExploder('[[[[[9,8],1],2],3],4]') === '[[[[0,9],2],3],4]', 'first fail');
console.assert(getExploder('[7,[6,[5,[4,[3,2]]]]]') === '[7,[6,[5,[7,0]]]]', 'second fail');
console.assert(getExploder('[[6,[5,[4,[3,2]]]],1]') === '[[6,[5,[7,0]]],3]', 'third fail');
console.assert(getExploder('[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]') === '[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]', 'fourth fail');
console.assert(getExploder('[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]') === '[[3,[2,[8,0]]],[9,[5,[7,0]]]]', 'fifth fail');
console.assert(getSplitter('[10,2]') === '[[5,5],2]', '1 fail');
console.assert(getSplitter('[2,11]') === '[2,[5,6]]', '2 fail');

function reduce(line) {
    const exploder = getExploder(line);
    if (exploder !== line) {
        return reduce(exploder);
    }
    const splitter = getSplitter(line);
    if (splitter !== line) {
        return reduce(splitter);
    }
    return line;
}

console.assert(reduce('[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]') === '[[[[0,7],4],[[7,8],[6,0]]],[8,1]]', 'uno fail');

function finalSum(list) {
    if (list.length === 1) {
        return list[0];
    }
    list = list.slice();
    list.unshift(reduce('[' + list.shift() + ',' + list.shift() + ']'));
    return finalSum(list);
}

console.assert(finalSum(['[1,1]','[2,2]','[3,3]','[4,4]']) === '[[[[1,1],[2,2]],[3,3]],[4,4]]', 'another fail');
console.assert(finalSum(['[1,1]','[2,2]','[3,3]','[4,4]','[5,5]']) === '[[[[3,0],[5,3]],[4,4]],[5,5]]', 'failll');
console.assert(finalSum(['[1,1]','[2,2]','[3,3]','[4,4]','[5,5]','[6,6]']) === '[[[[5,0],[7,4]],[5,5]],[6,6]]', 'donnnn');
console.assert(finalSum([
    '[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]',
    '[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]',
    '[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]',
    '[[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]',
    '[7,[5,[[3,8],[1,4]]]]',
    '[[2,[2,2]],[8,[8,1]]]',
    '[2,9]',
    '[1,[[[9,3],9],[[9,0],[0,7]]]]',
    '[[[5,[7,4]],7],1]',
    '[[[[4,2],2],6],[8,7]]'
]) === '[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]', 'major fail');

function getMagnitude(list) {
    let left;
    let right;
    if (Array.isArray(list[0])) {
        left = 3 * getMagnitude(list[0]);
    } else {
        left = 3 * list[0];
    }
    if (Array.isArray(list[1])) {
        right = 2 * getMagnitude(list[1]);
    } else {
        right = 2 * list[1];
    }
    return left + right;
}

console.assert(getMagnitude(JSON.parse('[[9,1],[1,9]]')) === 129);
console.assert(getMagnitude(JSON.parse('[[1,2],[[3,4],5]]')) === 143);
console.assert(getMagnitude(JSON.parse('[[[[0,7],4],[[7,8],[6,0]]],[8,1]]')) === 1384);
console.assert(getMagnitude(JSON.parse('[[[[1,1],[2,2]],[3,3]],[4,4]]')) === 445);
console.assert(getMagnitude(JSON.parse('[[[[3,0],[5,3]],[4,4]],[5,5]]')) === 791);
console.assert(getMagnitude(JSON.parse('[[[[5,0],[7,4]],[5,5]],[6,6]]')) === 1137);
console.assert(getMagnitude(JSON.parse('[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]')) === 3488);

console.log("part 1", getMagnitude(JSON.parse(finalSum(input))));

let max = 0;
for (let i = 0; i < input.length - 1; i++) {
    for (let j = i + 1; j < input.length; j++) {
        const sum1 = getMagnitude(JSON.parse(finalSum([input[i], input[j]])));
        const sum2 = getMagnitude(JSON.parse(finalSum([input[j], input[i]])));
        max = Math.max(max, sum1, sum2);
    }
}

console.log("part 2", max);
