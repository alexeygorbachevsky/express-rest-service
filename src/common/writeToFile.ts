const fs = require('fs');

const writeToFile = (
  text: string,
  file = './logs/errors.log',
  folder = './logs'
) => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }
  fs.appendFileSync(file, `${text} \r\n`, { encoding: 'utf8', flag: 'a' });
};

module.exports = writeToFile;
