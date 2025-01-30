# zana-kaya-bot
---

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18.x%2B-green?logo=node.js" />
  <img src="https://img.shields.io/badge/Custom%20Dates-%E2%9C%94%EF%B8%8F-blue" />
  <img src="https://img.shields.io/badge/Commits%20Limit-10K/day-orange" />
</p>

# Git Timeline Architect ⏳  
**Complete Control Over GitHub Contribution History**  

Create perfectly customized GitHub commit patterns with millisecond precision. Design contribution graphs for any date range while maintaining authentic commit signatures.

---

## Table of Contents  
- [Full Customization](#full-customization)  
- [Quick Setup](#quick-setup)  
- [Advanced Configuration](#advanced-configuration)  
- [Execution Modes](#execution-modes)  
- [Ethical Guidelines](#ethical-guidelines)  

---

## Full Customization 🎛️  

### 1. Date Range Freedom  
```javascript
// Set ANY start/end dates (format: YYYY-MM-DD)
const START_DATE = moment('2024-01-01');  // Edit this
const END_DATE = moment('2025-12-31');    // Edit this
```

### 2. Commit Volume Control  
```javascript
// Set exact number of commits
makeCommit(365) // Change 365 to desired total
```

### 3. Time Precision  
```javascript
// Add random hours/minutes/seconds
const DATE = START_DATE.clone()
  .add(randomDays, 'days')
  .add(Math.random() * 24, 'hours')  // Random time
  .format();
```

---

## Quick Setup 💻  

### 1. Initialize Project  
```bash
mkdir git-architect && cd git-architect
npm init -y
npm install moment jsonfile simple-git
```

### 2. Create Configurable Script  
`index.js`:
```javascript
const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');
const FILE_PATH = './.timestamps';

// USER CONFIG START
const COMMIT_COUNT = 500; // Set total commits
const START_DATE = moment('2024-04-01'); // Start date
const END_DATE = moment('2024-12-31'); // End date
// USER CONFIG END

const TOTAL_DAYS = END_DATE.diff(START_DATE, 'days');

const makeCommit = n => {
  if(n === 0) return simpleGit().push();
  
  const randomDays = Math.floor(Math.random() * (TOTAL_DAYS + 1));
  const commitDate = START_DATE.clone()
    .add(randomDays, 'days')
    .add(Math.floor(Math.random() * 24), 'hours')
    .add(Math.floor(Math.random() * 60), 'minutes')
    .format();

  console.log(`[${COMMIT_COUNT - n + 1}/${COMMIT_COUNT}] ${commitDate}`);

  jsonfile.writeFile(FILE_PATH, { date: commitDate }, () => {
    simpleGit().add([FILE_PATH]).commit(commitDate, 
      { '--date': commitDate }, 
      makeCommit.bind(this, --n)
    );
  });
};

makeCommit(COMMIT_COUNT);
```

---

## Advanced Configuration ⚙️  

### Execution Modes  

| Mode | Command | Description |
|------|---------|-------------|
| Basic | `node index.js` | Uses config values from file |
| Bulk | `COMMIT_COUNT=1000 node index.js` | Override commit count |
| Range | `START="2024-06-01" END="2024-06-30" node index.js` | Temporary date range |

### Time Distribution Options  
```javascript
// For clustered commits (e.g., weekdays only)
const workDaysOnly = momentDate => {
  const day = momentDate.day();
  return day !== 0 && day !== 6; // Skip weekends
};

// For time-sensitive patterns
const offHoursOnly = momentDate => {
  const hour = momentDate.hour();
  return hour >= 18 || hour <= 9; // Evening/morning commits
};
```

---

## Ethical Guidelines ⚖️  

1. **Transparency Principle**  
   - Always disclose automated commits in repo description  
   - Use `[Bot]` prefix in commit messages when public  

2. **Fair Use Limits**  
   - Max 1,000 commits/day for repository integrity  
   - Avoid consecutive identical timestamps  

3. **Validation Checklist**  
   ```bash
   # Verify commit authenticity
   git log --pretty=format:"%h %ad %s" --date=iso
   ```

4. **Recommended Use Cases**  
   - CI/CD pipeline testing  
   - Contribution graph visualization experiments  
   - Git client compatibility testing  

---

<p align="center">
  🔍 GitHub detects artificial patterns - Use responsibly!
</p>

---



