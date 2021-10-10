const assert = require('assert');

const { 
    findFirstPlacement,
    formatPlacementCommand,
    rotateLeft,
    rotateRight,
    report,
    changeActiveRobot
 } = require('./main')

describe('Inputs', () => {
    describe('PLACE ...', () => {
        it('logs an error if no "PLACE " is given', () => {
            const testInput = ["NOTPLACE"]
            assert.notEqual(testInput[0], "PLACE ")
        })
        it('expects an input to be "PLACE "', () => {
            const testInput = ["PLACE "]
            assert.equal(testInput[0], "PLACE ")
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
                    formatPlacementCommand(testInput);
                }, {
                    name: "Error",
                    message: "Incorrect format. Expected 'PLACE X,Y,F'"
                })
            })
            it('returns an object with the keys x,y,f', () => {
                const testInput = "PLACE 1,2,SOUTH";
                const result = formatPlacementCommand(testInput);
                assert.deepEqual(result, {
                    x: 1,
                    y: 2,
                    f: "SOUTH"
                })
            })
            it('throws an error if x or y are not integers', () => {
                const testInput = "PLACE x,y,LEFT";
                assert.throws(() => {
                    formatPlacementCommand(testInput);
                }, {
                    name: "TypeError",
                    message: "X and Y coordinates must be integers"
                })
            })
            it('throws an error if F is not a valid direction', () => {
                const testInput = "PLACE 0,0,LEFT";
                assert.throws(() => {
                    formatPlacementCommand(testInput);
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
    describe("Report command", () => {
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
            
            assert.deepEqual(report(testRobots, testRobot), `There is 1 robot on the table. It is located at 2,2, and facing EAST`)
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
})