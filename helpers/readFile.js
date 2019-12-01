let fs = require('fs');

function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    console.error('Could not read file');
    console.error(e);
    throw e;
  }
}

module.exports = readFile;
