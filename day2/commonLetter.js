const fs = require('fs');

const options = {
    encoding:'utf-8', 
    flag:'r'
};
const fileContents = fs.readFileSync('input.txt', options).split('\n');

const hasOneCharDifference = (id1, id2) => {
    const idLength = id1.length;

    let diffCount = 0; 
    for (let j = 0; j < idLength; j++) { 
        diffCount = id1[j] === id2[j] ? diffCount : diffCount + 1;
    }

    return diffCount === 1;
};

const findLikeIds = () => {
    const fileContentsLen = fileContents.length; 
    for (let i = 0; i < fileContentsLen; i++) { 
        for (let j = i + 1; j < fileContentsLen; j++) { 
            if (hasOneCharDifference(fileContents[i], fileContents[j])) {
                return [fileContents[i], fileContents[j]];
            }
        }
    }
}

const likeIds = findLikeIds();
const likeChars = []
const idLength = likeIds[0].length;
for (let i = 0; i < idLength; i++) { 
    if (likeIds[0][i] === likeIds[1][i]) likeChars.push(likeIds[0][i]);
}

console.log(likeChars.join(''));
