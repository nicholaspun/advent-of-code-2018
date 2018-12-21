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

function aggregateDataByField(field) { 
    return (acc, data) => { 
        if (!acc[data[field]]) acc[data[field]] = 0;
        acc[data[field]] += 1;
        return acc;
    }
}

function findKeyWithMaxValue(data) { 
    let keyWithMaxValue;
    let maxSoFar = 0;
    for (let key in data) { 
        if (data[key] > maxSoFar) { 
            maxSoFar = data[key];
            keyWithMaxValue = key;
        }
    }

    return keyWithMaxValue
}

const aggregateDataByGuard = recordsIndividualData.reduce(aggregateDataByField('guard'), {})
const sleepyGuard = findKeyWithMaxValue(aggregateDataByGuard);

const minutesDataOfSleepyGuard = 
    recordsIndividualData
        .filter((data) => data['guard'] === sleepyGuard)
        .reduce(aggregateDataByField('minute'), {});
const sleepyMinute = findKeyWithMaxValue(minutesDataOfSleepyGuard); 

console.log(parseInt(sleepyGuard) * parseInt(sleepyMinute));
