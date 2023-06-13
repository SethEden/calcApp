/**
 * @file index.js
 * @module index
 * @description A small command line calculator application.
 * @requires module:myMath
 * @requires module:prompt
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Seth Hollingsead
 * @date 2023/06/09
 * @copyright Copyright © 2023-… by Seth Hollingsead. All rights reserved
 */

// Internal imports
let myMath = require('./myMath');
let prompt = require('./prompt');
// External imports
let path = require('path');
global.appRoot = path.resolve(process.cwd());
let rootPath = '';
let baseFileName = path.basename(module.filename, path.extname(module.filename));
let namespacePrefix = `application.${baseFileName}.`;

/**
 * @function application
 * @description This is the main program loop, the init for the entire application.
 * @returns {void}
 * @author Seth Hollingsead
 * @date 2023/06/09
 */
function application() {
    let functionName = application.name;
    let argumentDriveInterface = false;
    let commandInput, commandResult;
    let inputDataValue1 = 0;
    let inputDataValue2 = 0;
    console.log(`BEGIN ${namespacePrefix}${functionName} function`);
    console.log('BEGIN main program loop');
    console.log('BEGIN command parser');
    if (argumentDriveInterface === false) {
        while (programRunning) {
            commandInput = prompt.prompt('Enter a math operation: ');

            if (commandInput !== undefined) {
                if (commandInput.toUpperCase().trim() === 'EXIT' ||
                commandInput.toUpperCase().trim() === 'QUIT' ||
                commandInput.toUpperCase().trim() === 'Q' ||
                commandInput.toUpperCase().trim() === 'X') {
                    console.log('END command Parser');
                    programRunning = false;
                    console.log('END main program loop');
                    console.log('Exiting, Good bye, Have a nice day & stay safe!');
                } else if (commandInput.toUpperCase().trim() === 'ADD') {
                    inputDataValue1 = 0;
                    inputDataValue2 = 0;
                    inputDataValue1 = getUserInput('Enter the first number to add: ');
                    inputDataValue2 = getUserInput('Enter the second number to add: ');
                    let addResult = myMath.add(inputDataValue1, inputDataValue2);
                    console.log('sum is: ' + addResult);
                }
            }
        }
    }
    console.log(`END ${namespacePrefix}${functionName} function`);
}

/**
 * @function getUserInput
 * @description Gets an input number from teh user and validates that it is an integer.
 * @param {string} message The string message to query the user for input.
 * @returns {integer} An integer value converted from the user input.
 * @author Seth Hollingsead
 * @date 2023/06/13
 */
function getUserInput(message) {
    let functionName = getUserInput.name;
    console.log(`BEGIN ${namespacePrefix}${functionName} function`);
    console.log(`message is: ${message}`);
    let returnData = 0;
    let inputData;
    let validInputString = false;
    while (!validInputString) {
        inputData = prompt.prompt(message);
        if (!isNaN(parseInt(inputData))) {
            validInputString = true;
            returnData = parseInt(inputData);
        }
    }
    console.log(`returnData is: ${returnData}`);
    console.log(`END ${namespacePrefix}${functionName} function`);
    return returnData;
}

let programRunning = false;
// bootStrapApplication
programRunning = true;
application();