const fs = require('fs');

const writeToFile = (text: string, file='./errors.log') => {
  fs.appendFileSync(
    file,
    `${text} \r\n`,
    { encoding: 'utf8', flag: 'a' }
  );
};

module.exports = writeToFile ;
