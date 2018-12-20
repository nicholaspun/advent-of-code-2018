const fs = require('fs');

const options = {
    encoding:'utf-8', 
    flag:'r'
};
const fileContents = fs.readFileSync('input.txt', options).split('\n');

let numIdTwoOfAnyLetter = 0;
let numIdThreeOfAnyLetter = 0;

const countNumCharInId = (id, char) => id.split('').filter(c => c === char).length

const existsNumOfChar = (id, num) => id.split('').reduce((acc, char) => {   
    return acc || countNumCharInId(id, char) === num;
}, false);

fileContents.map((line) => { 
    numIdTwoOfAnyLetter = existsNumOfChar(line, 2) ? numIdTwoOfAnyLetter + 1 : numIdTwoOfAnyLetter;
    numIdThreeOfAnyLetter = existsNumOfChar(line, 3) ? numIdThreeOfAnyLetter + 1 : numIdThreeOfAnyLetter;
});

console.log(numIdTwoOfAnyLetter * numIdThreeOfAnyLetter);
