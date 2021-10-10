const { stringify } = require("querystring")

const inputCommands = [
    "PLACE 0,0,NORTH",
    "MOVE",
    "REPORT"
]

const validDirections = ['NORTH', 'EAST', 'SOUTH', 'WEST']

// const robots = [
//     {
//         x: 2,
//         y: 2,
//         f: "EAST"
//     }, 
//     {
//         x: 2,
//         y: 2,
//         f: "NORTH"
//     }, 
//     {
//         x: 2,
//         y: 2,
//         f: "SOUTH"
//     }, 
//     {
//         x: 0,
//         y: 0,
//         f: "SOUTH"
//     }]


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
    return {
        x: intX,
        y: intY,
        f: F
    }
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

function report (robots, robot = []) {
    const numberOfBots = robots.length;
    if (numberOfBots === 0) {
        return "There are no robots on the table."
    } else if (numberOfBots === 1) {
        return  `There is 1 robot on the table. It is located at ${robot.x},${robot.y}, and facing ${robot.f}`
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

inputCommands.forEach(command => {
    switch (command) {
        case "PLACE": 
            'test'
    }
})

module.exports = {
    findFirstPlacement,
    formatPlacementCommand,
    rotateLeft,
    rotateRight,
    report,
    changeActiveRobot
}