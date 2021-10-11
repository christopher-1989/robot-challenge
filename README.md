# Robot-Challenge project

## Project overview

### Information

The robot-challenge is contained within four files.

`main.js` contains the code for running the game.

`exportCommands.js` contains the code for extracting the commands from an external text file.

`robot.js` contains all of the logic for the game.

`robotsDB.js` contains a basic Array that is used for storing information about each robot.

A testing suite and test files have also been included to demonstrate the functionality of the game.

---

## Getting started

Running `node main.js <examplefilename.txt>` in the root directory will start the game. All valid commands in the txt file will be run according to the rules of the game listed below.

---

## Testing

A testing suite has been provided. First run `npm install` to install the test runner Mocha and its dependencies.
Then in the root directory run `npm test` to see all tests.

---

### Description

The application is a simulation of a toy robot moving on a square tabletop, of dimensions 5 units x 5 units.

There are no other obstructions on the table surface.

The robot is free to roam around the surface of the table, but must be prevented from falling to destruction. Any movement that would result in the robot falling from the table must be prevented, however further valid movement commands must still be allowed.

### Robot Commands

Where PLACE will put the toy robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST. The origin (0,0) can be considered to be the SOUTH WEST most corner.

It is required that the first command to the robot is a PLACE command, after that, any sequence of commands may be issued, in any order, including another PLACE command. The application should discard all commands in the sequence until a valid PLACE command has been executed.

Where MOVE will move the toy robot one unit forward in the direction it is currently facing.

Where LEFT and RIGHT will rotate the robot 90 degrees in the specified direction without changing the position of the robot.

Where REPORT will announce the X,Y and facing of the robot. This can be in any form, but standard output is sufficient.

A robot that is not on the table can choose the ignore the MOVE, LEFT, RIGHT and REPORT commands.

Input can be from a file, or from standard input, as the developer chooses.

### Extension

Multiple robots will operate on the table

The existing system above should continue to work as-is. REPORT will also now report on how many robots are present and which robot is active (see the ROBOT command later).

PLACE will add a new robot to the table with incrementing number identifier, i.e. the first placed robot will be 'Robot 1', then the next placed robot will be 'Robot 2', then 'Robot 3', etc.

A ROBOT <number> command will make the robot identified by active i.e. subsequent commands will affect that robot's position/direction. Any command that affects position/direction (e.g. MOVE, LEFT, RIGHT...) will affect only the active robot.

By default the first robot placed will become the active robot.

---

## Further Steps

Next steps will include making inline comments to elaborate on the function of each block of code and how the code links together.

`robot.js` could be refactored to be a new class.

Although a basic "Database" was used in the form of an Array, if the challenge was to be scaled up, Redux could be used as state management.
