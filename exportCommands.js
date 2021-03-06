const fs = require('fs');
const readline = require('readline');

async function processCommandsLineByLine(fileName) {
  const commands = []
  return new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream(fileName)
    .on('error', (err) => {
      reject(err)
    })
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

module.exports = processCommandsLineByLine
