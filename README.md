# zana-kaya-bot

---

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18.x%2B-green?logo=node.js" />
  <img src="https://img.shields.io/badge/Custom_Times-%E2%9C%94%EF%B8%8F-blue" />
  <img src="https://img.shields.io/badge/Safe_Limit-10K/day-orange" />
</p>

# Git Timeline Architect ⏳  
**Precision GitHub Contribution Automation**  

Create authentic commit histories with granular control over dates/times. Ideal for testing contribution graphs or simulating project activity patterns.

---

## Table of Contents  
- [Key Features](#key-features)  
- [Quick Setup](#quick-setup)  
- [Customization](#customization)  
- [Execution Modes](#execution-modes)  
- [Ethical Use](#ethical-use)  
- [Troubleshooting](#troubleshooting)  

---

## Key Features ✨  
- **Date Range Control**: Any start/end dates  
- **Time Precision**: Millisecond-accurate commits  
- **Pattern Customization**: Cluster commits by time/day  
- **Multi-Environment Support**: Local or CI/CD execution  

---

## Quick Setup 💻  

### 1. Initialize Project  
```bash
mkdir commit-architect && cd commit-architect
npm init -y
npm install moment jsonfile simple-git
```

### 2. Create Configuration File  
`index.js`:
```javascript
const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');
const FILE_PATH = './.timestamps';

// USER CONFIG START
const COMMIT_COUNT = 500;            // Total commits to generate
const START_DATE = moment('2024-01-01');  // Start date (YYYY-MM-DD)
const END_DATE = moment('2024-12-31');    // End date (YYYY-MM-DD)
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

### 3. Initialize Git Repository  
```bash
git init && git remote add origin YOUR_REPO_URL
```

### 4. Generate & Push Commits  
```bash
node index.js && git push -u origin main
```

---

## Customization ⚙️  

### Temporal Patterns  
```javascript
// Example: Business hours only (9AM-5PM UTC)
const workHours = momentDate => {
  const hour = momentDate.utc().hour();
  return hour >= 9 && hour < 17;
};

// Example: Weekday clustering
const weekdaysOnly = momentDate => {
  return momentDate.isoWeekday() < 6;
};
```

### Execution Modes  

| Mode | Command | Use Case |
|------|---------|----------|
| **Standard** | `node index.js` | Default configuration |
| **Burst** | `COMMIT_COUNT=2500 node index.js` | Large-scale testing |
| **Focus** | `START="2024-07-01" END="2024-07-07" node index.js` | Specific week simulation |

---

## Ethical Use ⚖️  

### Mandatory Practices  
- 🚫 Never use on production repositories  
- 🔍 Regular audit of generated commits  
- 📢 Clear automation disclosure in README  

### Recommended Limits  
| Scenario | Max Commits | Frequency |
|----------|-------------|-----------|
| Testing | 1,000/day | Weekly |
| CI/CD | 500/day | Per deployment |
| Education | 100/day | As needed |

---

## Troubleshooting 🔧  

### Commit Validation  
```bash
# Verify commit chronology
git log --reverse --pretty=format:"%h %ad"

# Check signature authenticity
git show -s --format=%ci HEAD
```

### Common Solutions  
1. **Clock Sync Issues**  
   ```bash
   timedatectl set-ntp true  # Linux
   w32tm /resync             # Windows
   ```
   
2. **GitHub Timestamp Filtering**  
   - Allow ±4 hour local clock drift  
   - Avoid future-dated commits

---

<p align="center">
  ⚠️ Artificial patterns may trigger GitHub's fraud detection systems  
  ✅ Use responsibly and transparently
</p>

---




