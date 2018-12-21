const fs = require('fs');

const options = {
    encoding:'utf-8', 
    flag:'r'
};
const records = fs.readFileSync('input.txt', options).split('\n');
records.pop(); // input has a blank line and I'm too lazy to fix it

function sortRecords(recordA, recordB) {
    const matchTimeStamp = /^\[(.*)\] .*/;
    const timeStampA = recordA.match(matchTimeStamp)[1];
    const timeStampB = recordB.match(matchTimeStamp)[1];
    
    if (timeStampA < timeStampB) return -1;
    if (timeStampA > timeStampB) return 1;
    return 0;
};

records.sort(sortRecords);

const recordsLen = records.length;
let recordsIndividualData = [];
let currGuard, fallAsleepTime;
for (let i = 0; i < recordsLen; i++) { 
    const record = records[i];
    
    if (record.includes('Guard')) {  
        currGuard = record.match(/.* Guard #(\d*) .*/)[1];
    } else if (record.includes('falls asleep')) { 
        fallAsleepTime = parseInt(record.match(/\[.* 00:(\d\d)\].*/)[1]);
    } else if (record.includes('wakes up')) { 
        const wakeUpTime = parseInt(record.match(/\[.* 00:(\d\d)\].*/)[1]);
        for (let i = fallAsleepTime; i < wakeUpTime; i++) { 
            recordsIndividualData.push({
                'guard': currGuard, 
                'minute': i
            });
        }
    }
}

const aggregateData = recordsIndividualData.reduce((acc, data) => {
    if (!acc[data['guard']]) acc[data['guard']] = {};
    if (!acc[data['guard']][data['minute']]) acc[data['guard']][data['minute']] = 0;
    acc[data['guard']][data['minute']] += 1;
    return acc;
}, {})

let guardWithMaxMinute, maxMinute;
let maxSoFar = 0;
for (let guard in aggregateData) { 
    for (let minute in guard) { 
        if (aggregateData[guard][minute] > maxSoFar) { 
            maxSoFar = aggregateData[guard][minute];
            guardWithMaxMinute = guard;
            maxMinute = minute;
        }
    }
}

console.log(parseInt(guardWithMaxMinute) * maxMinute);
