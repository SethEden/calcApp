/**
 * @file prompt.js
 * @module prompt
 * @description A simple prompt module to get input from the user using process.stdin.
 * @requires {@link https://www.npmjs.com/package/fs|fs}
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Seth Hollingsead
 * @date 2023/06/09
 * @copyright Copyright © 2023-… by Seth Hollingsead. All rights reserved
 */

let fs = require('fs');
let path = require('path');
let baseFileName = path.basename(module.filename, path.extname(module.filename));
let namespacePrefix = `prompt.${baseFileName}.`;
let term = 13; // carriage return

/**
 * @function prompt
 * @description Prompts the user for some input and returns the input.
 * @param {string} ask What the prompt should display when asking the user for input.
 * @return {string} A string of whatever input the user gave.
 * @author Seth Hollingsead
 * @date 2023/06/09
 */
function prompt(ask) {
    let functionName = prompt.name;
    console.log(`BEGIN ${namespacePrefix}${functionName} function`);
    console.log(`ask is: ${JSON.stringify(ask)}`);
    let input = '';
    if (ask) {
        process.stdout.write(ask);
    }
    let
        buffer = Buffer.alloc(1024),
        fd = process.platform === 'win32' ? process.stdin.fd : fs.openSync('dev/tty', 'rs'),
        readSize = fs.readSync(0, buffer, 0, 1024);
    
    input = buffer.toString('UTF8', 0, readSize);
    if (input.includes(String.fromCharCode(term))) {
        input = input.slice(0, input.indexOf(String.fromCharCode(term)));
    } else if (input.includes('/r/n')) {
        input = input.slice(0, input.indexOf('/r/n'));
    }
    console.log(`input is: ${JSON.stringify(input)}`);
    console.log(`END ${namespacePrefix}${functionName} function`);
    return input;
}

module.exports = {
    ['prompt']: (ask) => prompt(ask)
}