const fs = require('fs');
const readline = require('readline');

function processCommandsLineByLine(fileName) {
  const commands = []
  return new Promise(resolve => {
    const fileStream = fs.createReadStream(`${fileName}.txt`);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
      });
      function readData (input) {
        commands.push(input)
      }
    
      rl.on('line', readData)
      setTimeout(() => resolve(commands), 100)
  })
}

// processCommandsLineByLine();

module.exports = processCommandsLineByLine
