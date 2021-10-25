const { processCommands } = require('./robot')
const processCommandsLineByLine = require('./exportCommands')

async function getCommands() {
    // When running the program, if no file is specified the 'example1.txt' file will run as an example
    const commands = await processCommandsLineByLine(process.argv[2] || 'example1.txt')
    return commands
}

getCommands().then(value => processCommands(value))
