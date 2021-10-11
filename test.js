const assert = require('assert');
const robotsOnTable = require('./robotsDB')

const { 
    findFirstPlacement,
    placementCommand,
    rotateLeft,
    rotateRight,
    report,
    changeActiveRobot,
    move,
    processCommands
 } = require('./robot')

describe('Inputs', () => {
    describe('PLACE ...', () => {
        it('logs an error if no "PLACE " is given', () => {
            const testInput = ["NOTPLACE"]
            assert.throws(() => {
                findFirstPlacement(testInput)
            }, 
            {
                name: "Error",
                message: "There was no Placement initialisation"
            })
        })
        it('expects an input to be "PLACE "', () => {
            const testInput = ["PLACE "]
            assert.deepEqual(findFirstPlacement(testInput), ["PLACE "])
        })
        it('disregards inputs until the first PLACE command', () => {
            const testInput = ["NOTPLACE", "ALSONOT", "PLACE "]
            findFirstPlacement(testInput)
            assert.equal(testInput[0], "PLACE ")
        })
        it('throws a new error if PLACE is not in command list', () => {
            const testInput = ["NOTPLACE", "ALSONOT"]
            assert.throws(
                () => {
                    findFirstPlacement(testInput)
                }, 
                {
                name: 'Error',
                message: 'There was no Placement initialisation'
            })
        })
        describe('PLACE X,Y,F', () => {
            it("throws an error if the format doesn't have a space", () => {
                const testInput = "PLACEXY";
                assert.throws(() => {
                    placementCommand(testInput);
                }, {
                    name: "Error",
                    message: "Incorrect format. Expected 'PLACE X,Y,F'"
                })
            })
            it('returns an object with the keys x,y,f', () => {
                const testInput = "PLACE 1,2,SOUTH";
                const result = placementCommand(testInput);
                assert.deepEqual(result, {
                    x: 1,
                    y: 2,
                    f: "SOUTH"
                })
            })
            it('throws an error if x or y are not integers', () => {
                const testInput = "PLACE x,y,LEFT";
                assert.throws(() => {
                    placementCommand(testInput);
                }, {
                    name: "TypeError",
                    message: "X and Y coordinates must be integers"
                })
            })
            it('throws an error if F is not a valid direction', () => {
                const testInput = "PLACE 0,0,LEFT";
                assert.throws(() => {
                    placementCommand(testInput);
                }, {
                    name: "Error",
                    message: "F must be a valid direction. Expected NORTH SOUTH EAST or WEST"
                })
            })
        })
        
    })
    describe("LEFT/RIGHT rotations", () => {
        it('LEFT for NORTH returns the direction WEST', () => {
            const testInput = "LEFT";
            const testRobot = {
                x: 2,
                y: 2,
                f: "NORTH"
            }
            const result = rotateLeft(testRobot)
            assert.deepEqual(result.f, "WEST")
        })
        it('LEFT for WEST returns the direction SOUTH', () => {
            const testInput = "LEFT";
            const testRobot = {
                x: 2,
                y: 2,
                f: "WEST"
            }
            const result = rotateLeft(testRobot)
            assert.deepEqual(result.f, "SOUTH")
        })
        it('LEFT for SOUTH returns the direction EAST', () => {
            const testInput = "LEFT";
            const testRobot = {
                x: 2,
                y: 2,
                f: "SOUTH"
            }
            const result = rotateLeft(testRobot)
            assert.deepEqual(result.f, "EAST")
        })
        it('LEFT for EAST returns the direction NORTH', () => {
            const testInput = "LEFT";
            const testRobot = {
                x: 2,
                y: 2,
                f: "EAST"
            }
            const result = rotateLeft(testRobot)
            assert.deepEqual(result.f, "NORTH")
        })

        it('RIGHT for NORTH returns the direction EAST', () => {
            const testInput = "RIGHT";
            const testRobot = {
                x: 2,
                y: 2,
                f: "NORTH"
            }
            const result = rotateRight(testRobot)
            assert.deepEqual(result.f, "EAST")
        })
        it('RIGHT for WEST returns the direction NORTH', () => {
            const testInput = "RIGHT";
            const testRobot = {
                x: 2,
                y: 2,
                f: "WEST"
            }
            const result = rotateRight(testRobot)
            assert.deepEqual(result.f, "NORTH")
        })
        it('RIGHT for SOUTH returns the direction WEST', () => {
            const testInput = "RIGHT";
            const testRobot = {
                x: 2,
                y: 2,
                f: "SOUTH"
            }
            const result = rotateRight(testRobot)
            assert.deepEqual(result.f, "WEST")
        })
        it('RIGHT for EAST returns the direction SOUTH', () => {
            const testInput = "RIGHT";
            const testRobot = {
                x: 2,
                y: 2,
                f: "EAST"
            }
            const result = rotateRight(testRobot)
            assert.deepEqual(result.f, "SOUTH")
        })
    })
    describe("REPORT", () => {
        it("Prints to the console the x,y,f when there is one robot", () => {
            const testRobot = {
                x: 2,
                y: 2,
                f: "EAST"
            }
            const testRobots = [
                {
                    x: 2,
                    y: 2,
                    f: "EAST"
                }
            ]
            
            assert.deepEqual(report(testRobots, testRobot), `2,2,EAST`)
        })
        it("reports no bots", () => {
            const testRobots = []
            assert.deepEqual(report(testRobots), "There are no robots on the table.")
        })
        it("Prints to the console the x,y,f when there is more than one robot", () => {
            const testRobot = {
                x: 0,
                y: 0,
                f: "NORTH"
            }
            const testRobots = [
                {
                    x: 2,
                    y: 2,
                    f: "EAST"
                },
                {
                    x: 0,
                    y: 0,
                    f: "NORTH"
                }
            ]
            assert.deepEqual(report(testRobots, testRobot), `There are 2 robots on the table.\n 
            The active robot is number 2 and is located at 0,0, and facing NORTH`)
        })
    })
    describe('ROBOT #', ()=> {
        it('throws an error when the given numbered robot does not exist', ()=> {
            const testRobots = [
                {
                    x: 2,
                    y: 2,
                    f: "EAST"
                }
            ]
            assert.throws(() => {
                changeActiveRobot(testRobots, 2)
            },
            {
                name: "Error",
                message: "Robot number is not active"
            }
            )
        })
        it('returns the new active robot', () => {
            const testRobots = [
                {
                    x: 2,
                    y: 2,
                    f: "EAST"
                }
            ]
            assert.deepEqual(changeActiveRobot(testRobots, 1), 
            {
                x: 2,
                y: 2,
                f: "EAST"
            })
        })
    })
    describe("MOVE", () => {
        describe("Validate moves functions", () => {
            it("will ignore commands to make robot fall off NORTH of the board", () => {
                const testRobot =
                   {    
                        x: 0,
                        y: 4,
                        f: "NORTH"
                    }
                const result = move(testRobot)
                assert.equal(result.y, 4)
            })
            it("will ignore commands to make robot fall off SOUTH of the board", () => {
                const testRobot =
                   {    
                        x: 0,
                        y: 0,
                        f: "SOUTH"
                    }
                const result = move(testRobot)
                assert.equal(result.y, 0)
            })
            it("will ignore commands to make robot fall off EAST of the board", () => {
                const testRobot =
                   {    
                        x: 4,
                        y: 0,
                        f: "EAST"
                    }
                const result = move(testRobot)
                assert.equal(result.x, 4)            
            })
            it("will ignore commands to make robot fall off WEST of the board", () => {
                const testRobot =
                   {    
                        x: 0,
                        y: 0,
                        f: "WEST"
                    }
                const result = move(testRobot)
                assert.equal(result.x, 0)            
            })
        })
    })
})

describe('Outputs', () => {
    describe('process each command in an Array', () => {
        it('processes a PLACE command correctly', () => {
            const inputCommands = [
                "PLACE 0,0,NORTH"
            ]
            processCommands(inputCommands)
            const result = robotsOnTable.pop()
            assert.deepEqual(result, 
                {
                    x: 0,
                    y: 0,
                    f: "NORTH"
                })
        })
        it('processes a PLACE command correctly as second command to MOVE', () => {
            const inputCommands = [
                "MOVE",
                "PLACE 1,1,NORTH"
            ]
            processCommands(inputCommands)
            const result = robotsOnTable.pop()
            assert.deepEqual(result, 
                {
                    x: 1,
                    y: 1,
                    f: "NORTH"
                })
        })
        it('processes a REPORT command correctly as second command to PLACE ', () => {
            const inputCommands = [
                "PLACE 1,1,NORTH",
                "REPORT"
            ]
            processCommands(inputCommands)
            const result = robotsOnTable.pop()
            assert.deepEqual(result, 
                {
                    x: 1,
                    y: 1,
                    f: "NORTH"
                })
        })
        it('turns RIGHT for NORTH returns the direction EAST', () => {
            const inputCommands = [
                "PLACE 3,3,NORTH",
                "RIGHT",
                "REPORT"
            ]
            processCommands(inputCommands)
            const result = robotsOnTable.pop()
            assert.deepEqual(result, 
                {
                    x: 3,
                    y: 3,
                    f: "EAST"
                })
        })
        it('LEFT for NORTH returns the direction WEST', () => {
            const inputCommands = [
                "PLACE 2,2,NORTH",
                "LEFT",
                "REPORT"
            ]
            processCommands(inputCommands)
            const result = robotsOnTable.pop()
            assert.deepEqual(result, 
                {
                    x: 2,
                    y: 2,
                    f: "WEST"
                })
        })
        it('Moves forward when allowed', () => {
            const inputCommands = [
                "PLACE 0,0,NORTH",
                "MOVE",
                "REPORT"
            ]
            processCommands(inputCommands)
            const result = robotsOnTable.pop()
            assert.deepEqual(result, 
                {
                    x: 0,
                    y: 1,
                    f: "NORTH"
                })
        })
        it('Does not move forward when not allowed', () => {
            const inputCommands = [
                "PLACE 0,0,SOUTH",
                "MOVE",
                "REPORT"
            ]
            processCommands(inputCommands)
            const result = robotsOnTable.pop()
            assert.deepEqual(result, 
                {
                    x: 0,
                    y: 0,
                    f: "SOUTH"
                })
        })
        it('Example input and output a)', () => {
            const inputCommands = [
                "PLACE 0,0,NORTH",
                "MOVE",
                "REPORT"
            ]
            processCommands(inputCommands)
            const result = robotsOnTable.pop()
            assert.deepEqual(result, 
                {
                    x: 0,
                    y: 1,
                    f: "NORTH"
                })
        })
        it('Example input and output b)', () => {
            const inputCommands = [
                "PLACE 0,0,NORTH",
                "LEFT",
                "REPORT"
            ]
            processCommands(inputCommands)
            const result = robotsOnTable.pop()
            assert.deepEqual(result, 
                {
                    x: 0,
                    y: 0,
                    f: "WEST"
                })
        })
        it('Example input and output c)', () => {
            const inputCommands = [
                "PLACE 1,2,EAST",
                "MOVE",
                "MOVE",
                "LEFT",
                "MOVE",
                "REPORT"
            ]
            processCommands(inputCommands)
            const result = robotsOnTable.pop()
            assert.deepEqual(result, 
                {
                    x: 3,
                    y: 3,
                    f: "NORTH"
                })
        })
    })
})

