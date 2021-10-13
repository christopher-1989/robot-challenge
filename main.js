const { processCommands } = require('./robot')
const processCommandsLineByLine = require('./exportCommands')

// Instantiate a new variable to store the commands to run
let commandsFromFile
// An asynchronous function that will fetch the array of commands

async function getCommands() {
    // When running the program, if no file is specified the 'example1.txt' file will run as an example
    const commands = await processCommandsLineByLine(process.argv[2] || 'example1.txt')
    commandsFromFile = commands
}

// Run the function to get the commands
getCommands()

// After the commands have been fetched from a file, execute the commands
setTimeout(() => {
    processCommands(commandsFromFile)
}, 100)
