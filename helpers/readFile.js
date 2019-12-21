let fs = require('fs');

function readFile(filePath, noTrim) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    if (noTrim) {
      return data;
    }

    return data.trim();
  } catch (e) {
    console.error('Could not read file');
    console.error(e);
    throw e;
  }
}

module.exports = readFile;
