const { processCommands } = require('./robot')
const processCommandsLineByLine = require('./exportCommands')

let commandsFromFile
async function getCommands() {
    const commands = await processCommandsLineByLine(process.argv[2])
    commandsFromFile = commands
}

getCommands()

setTimeout(() => {
    processCommands(commandsFromFile)
}, 100)
