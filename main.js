
const inputCommands = [
    "PLACE 0,0,NORTH",
    "MOVE",
    "REPORT"
]

function findFirstPlacement (listOfCommands) {
    for ( let i = 0; i < listOfCommands.length; i++) {
        if (!listOfCommands[i].startsWith("PLACE ")){
            continue
        } else if (listOfCommands[i].startsWith("PLACE ")) {
            listOfCommands.splice(0,i)
            return listOfCommands
        } 
    }
    throw new Error("There was no Placement initialisation")
}

function formatPlacementCommand (placeCommand) {
    const coordDirection = placeCommand.split(' ')[1]
    if (!coordDirection) {
        throw new Error("Incorrect format")
    }
    const [X, Y, F] = coordDirection.split(',')
    return {
        x: parseInt(X),
        y: parseInt(Y),
        f: F
    }
}

inputCommands.forEach(command => {
    switch (command) {
        case "PLACE": 
            'test'
    }
})

module.exports = {
    findFirstPlacement,
    formatPlacementCommand
}