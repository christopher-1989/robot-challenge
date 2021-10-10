const assert = require('assert');

// require('./main')
const { 
    findFirstPlacement,
    formatPlacementCommand
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
                const testInput = "PLACEXY"
                assert.throws(() => {
                    formatPlacementCommand(testInput)
                }, {
                    name: "Error",
                    message: "Incorrect format"
                })
            })
            it('returns an object with the keys x,y,f', () => {
                const testInput = "PLACE 1,2,LEFT"
                const result = formatPlacementCommand(testInput)
                assert.deepEqual(result, {
                    x: 1,
                    y: 2,
                    f: "LEFT"
                })
            })
        })
        
    })
})