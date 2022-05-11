#!/usr/bin/env node

const chalk = require("chalk");
const boxen = require("boxen");

const greeting = chalk.white.bold("Archivo Creado!");

const boxenOptions = {
    padding: 1,
    margin: 1,
    borderStyle: "round",
    borderColor: "green",
    backgroundColor: "#555555"
};
const msgBox = boxen(greeting, boxenOptions);


const fse = require('fs-extra');

fse.outputFile('tmp/test.txt', 'Hey there!')
    .then(() => {
        console.log(msgBox);
    })
    .catch(err => {
        console.error(err)
    });
