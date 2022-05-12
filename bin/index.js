#!/usr/bin/env node

const chalk = require("chalk");
const boxen = require("boxen");
const fse = require('fs-extra');
var inquirer = require('inquirer');
const {reiniciaMenu} = require('./displays')

reiniciaMenu();

inquirer
    .prompt([
        'adsadasdsadas sad sad sada sd'
    ])
    .then((answers) => {
        // Use user feedback for... whatever!!
    })
    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        } else {
            // Something else went wrong
        }
    });

const greeting = chalk.white.bold("Archivo Creado!");

const boxenOptions = {
    padding: 0,
    margin: 0,
    borderStyle: "round",
    borderColor: "green",
    //backgroundColor: "#EFEFEF"
};
const msgBox = boxen(greeting, boxenOptions);

// console.log(chalk.blue('queonda raza'));


// const fse = require('fs-extra');
//
// fse.outputFile('tmp/test.txt', 'Hey there!')
//     .then(() => {
// console.log(msgBox);
//     })
//     .catch(err => {
//         console.error(err)
//     });
