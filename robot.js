// Import the 'database'
const robotsOnTable = require('./robotsDB');

// Instantiate valid directions. This could future proof to enable directions other than N,S,E,W
const validDirections = ['NORTH', 'EAST', 'SOUTH', 'WEST']

// A function for removiing commands from the list that preceed a PLACE command
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

// Function for PLACE command. The second parameter defaults to an empty array for testing
function placementCommand (placeCommand, robots = []) {
    const coordDirection = placeCommand.split(' ')[1]  // Get the coordinates and the direction out of the entire placeCommand argument passed into the function
    if (!coordDirection) { 
        throw new Error("Incorrect format. Expected 'PLACE X,Y,F'")
    }
    const [X, Y, F] = coordDirection.split(','); // Define the x and y coordinates and the direction facing from the coordDirection variable
    const intX = parseInt(X); // Convert x and y to integers
    const intY = parseInt(Y); 
    if(isNaN(intX) || isNaN(intY)) {
        throw new TypeError("X and Y coordinates must be integers")
    }
    if(validDirections.indexOf(F) === -1) {
        throw new Error("F must be a valid direction. Expected NORTH SOUTH EAST or WEST")
    }
    // Create a new robot as an Object with keys 'x', 'y', 'f', for the coordinates and the direction respectively.
    // Add the robot to the 'database' of robots on the table 
    robots.push({
        x: intX,
        y: intY,
        f: F
    })
    return robots[robots.length -1]
}

// Function for rotating a robot to the left (counter-clockwise)
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
        default: console.error("Something went wrong rotating to the left")
    }
}

// Function for rotating a robot to the right (clockwise)
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
        default: console.error("Something went wrong rotating to the right")
    }
}

// A function for moving one robot
function move (robot) {
    const currentDirection = robot.f;
    switch (currentDirection) {
        case "NORTH": {
            // Before each appropriate coordinate is changed to show a movement, a check is performed that the robot will not move off the edge of the table
            if(canMoveNorth(robot)) {
                robot.y ++
                return robot
            } else {
                // If the robot will move off the table, the move is ignored
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

// The following four functions are for checking if a move is valid
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

// A function for reporting on the state of the robots on the table
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
    return  `There are ${numberOfBots} robots on the table.\nThe active robot is number ${activeBotIndex + 1} and is located at ${robot.x},${robot.y}, and facing ${robot.f}`
    }
}

// A function for changing the active robot number
function changeActiveRobot(robots, active) {
    if (active > robots.length) {
        throw new Error("Robot number is not active")
    }
    return robots[active-1]
}

// The function for running the commands.
function processCommands (arrayOfCommands) {
    if (arrayOfCommands.length === 0) {
        throw new Error("There are no input commands")
    }
    const validatedArrayOfCommands = findFirstPlacement(arrayOfCommands) // Find first placement from the list of commands
    let activeRobot; // Instantiate a new activeRobot
    validatedArrayOfCommands.forEach(command => {
        // The logic below determines which function to run.
        if (command.includes("PLACE ")) { 
            activeRobot = placementCommand(command, robotsOnTable)
        } else if (command.includes("ROBOT ")){
           activeRobot = changeActiveRobot(robotsOnTable, command.split(' ')[1])
        } else {
            switch (command) { // Switch is used here as the remaining commands are single words requiring no processing
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