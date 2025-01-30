const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');
const FILE_PATH = './data.json';

// Define the start and end dates for the commit range
const START_DATE = moment('2024-04-07');
const END_DATE = moment('2024-12-29');
const TOTAL_DAYS = END_DATE.diff(START_DATE, 'days');

const makeCommit = n => {
    if (n === 0) return simpleGit().push();

    // Generate a random day within the date range
    const randomDays = Math.floor(Math.random() * (TOTAL_DAYS + 1));
    const DATE = START_DATE.clone().add(randomDays, 'days').format();

    console.log(DATE);

    // Write to the JSON file and commit
    jsonfile.writeFile(FILE_PATH, { date: DATE }, () => {
        simpleGit().add([FILE_PATH]).commit(DATE, { '--date': DATE }, makeCommit.bind(this, --n));
    });
};

// Start generating 100 commits
makeCommit(100);