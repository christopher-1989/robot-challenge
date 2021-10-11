const robotsOnTable = require('./robotsDB');
const processCommandsLineByLine = require('./exportCommands')

let commandsFromFile
async function getCommands() {
    const commands = await processCommandsLineByLine('example2')
    commandsFromFile = commands
}

getCommands()

const validDirections = ['NORTH', 'EAST', 'SOUTH', 'WEST']

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

function placementCommand (placeCommand, robots = []) {
    const coordDirection = placeCommand.split(' ')[1]
    if (!coordDirection) {
        throw new Error("Incorrect format. Expected 'PLACE X,Y,F'")
    }
    const [X, Y, F] = coordDirection.split(',');
    intX = parseInt(X);
    intY = parseInt(Y);
    if(isNaN(intX) || isNaN(intY)) {
        throw new TypeError("X and Y coordinates must be integers")
    }
    if(validDirections.indexOf(F) === -1) {
        throw new Error("F must be a valid direction. Expected NORTH SOUTH EAST or WEST")
    }
    robots.push({
        x: intX,
        y: intY,
        f: F
    })
    return robots[robots.length -1]
}

function rotateLeft (robot) {
    const currentDirection = robot.f
    switch (currentDirection) {
        case "NORTH": {
            robot.f = "WEST"
            return robot
        }
        case "WEST": {
            robot.f = "SOUTH"
            return robot
        }
        case "SOUTH": {
            robot.f = "EAST"
            return robot
        }
        case "EAST": {
            robot.f = "NORTH"
            return robot
        }
        default: console.error("Something went wrong")
    }
}

function rotateRight (robot) {
    const currentDirection = robot.f
    switch (currentDirection) {
        case "NORTH": {
            robot.f = "EAST"
            return robot
        }
        case "WEST": {
            robot.f = "NORTH"
            return robot
        }
        case "SOUTH": {
            robot.f = "WEST"
            return robot
        }
        case "EAST": {
            robot.f = "SOUTH"
            return robot
        }
        default: console.error("Something went wrong")
    }
}

function move (robot) {
    const currentDirection = robot.f;
    switch (currentDirection) {
        case "NORTH": {
            if(canMoveNorth(robot)) {
                robot.y ++
                return robot
            } else {
                return robot
            }
        }
        case "WEST": {
            if(canMoveWest(robot)) {
                robot.x --
                return robot
            } else {
                return robot
            }            
        }
        case "SOUTH": {
            if (canMoveSouth(robot)) {
                robot.y --
                return robot
            } else {
                return robot
            }
            
        }
        case "EAST": {
            if (canMoveEast(robot)) {
                robot.x ++
                return robot
            } else {
                return robot
            }
          
        }
        default: console.error("Something went wrong when moving")
    }
}

function canMoveNorth (robot) {
    if (robot.y === 4) {
        // console.log("Move ignored. Cannot move NORTH off table")
        return false
    } else {
        return true
    }
}
function canMoveSouth (robot) {
    if (robot.y === 0) {
        // console.log("Move ignored. Cannot move SOUTH off table")
        return false
    } else {
        return true
    }
}
function canMoveEast (robot) {
    if (robot.x === 4) {
        // console.log("Move ignored. Cannot move EAST off table")
        return false
    } else {
        return true
    }
}
function canMoveWest (robot) {
    if (robot.x === 0) {
        // console.log("Move ignored. Cannot move WEST off table")
        return false
    } else {
        return true
    }
}

function report (robots, robot = {}) {
    const numberOfBots = robots.length;
    if (numberOfBots === 0) {
        return "There are no robots on the table."
    } else if (numberOfBots === 1) {
        return  `${robot.x},${robot.y},${robot.f}`
    } else {
        let activeBotIndex 
        robots.forEach((bot, index) => {
            if (JSON.stringify(robot) === JSON.stringify(bot)) {
                activeBotIndex = index
            }
        })
    return  `There are ${numberOfBots} robots on the table.\n 
            The active robot is number ${activeBotIndex + 1} and is located at ${robot.x},${robot.y}, and facing ${robot.f}`
    }
}

function changeActiveRobot(robots, active) {
    if (active > robots.length) {
        throw new Error("Robot number is not active")
    }
    return robots[active-1]
}



function processCommands (arrayOfCommands) {
    const validatedArrayOfCommands = findFirstPlacement(arrayOfCommands)
    let activeRobot;
    validatedArrayOfCommands.forEach(command => {
        if (command.includes("PLACE ")) {
            activeRobot = placementCommand(command, robotsOnTable)
        } else {
            switch (command) {
                case "RIGHT": {
                    activeRobot = rotateRight(activeRobot)
                    break
                }
                case "LEFT": {
                    activeRobot = rotateLeft(activeRobot)
                    break
                }
                case "MOVE": {
                    activeRobot = move(activeRobot) 
                    break  
                }
                case "REPORT": {
                    console.log(report(robotsOnTable, activeRobot))
                    break
                }
                default: "Something went wrong processing the commands"
                    
            }
        }
        
    })
}
setTimeout(() => {
    processCommands(commandsFromFile)
}, 100)


module.exports = {
    findFirstPlacement,
    placementCommand,
    rotateLeft,
    rotateRight,
    report,
    changeActiveRobot,
    move,
    processCommands
}