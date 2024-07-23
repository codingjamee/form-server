const fs = require('fs');
const path = require('path');

const writeDataToFile = (filename, content) => {
    fs.writeFileSync(path.join(__dirname, '..', 'data', filename), JSON.stringify(content, null, 2), 'utf8');
};

const readDataFromFile = (filename) => {
    const filepath = path.join(__dirname, '..', 'data', filename);
    if (fs.existsSync(filepath)) {
        const data = fs.readFileSync(filepath, 'utf8');
        return JSON.parse(data);
    }
    return null;
};

module.exports = {
    writeDataToFile,
    readDataFromFile
};
