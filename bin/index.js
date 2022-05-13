#!/usr/bin/env node

const chalk = require("chalk");
const boxen = require("boxen");
const fse = require('fs-extra');
const inquirer = require('inquirer');
const {instalador} = require('./npmHelper');
const {reiniciaMenu, getOpciones} = require('./display')


instala = async () => {
   try{
       await instalador();
       reiniciaMenu();
   }catch (e) {
       console.log(e);
   }
}

instala();



// const greeting = chalk.white.bold("Archivo Creado!");
//
// const boxenOptions = {
//     padding: 0,
//     margin: 0,
//     borderStyle: "round",
//     borderColor: "green",
//     //backgroundColor: "#EFEFEF"
// };
// const msgBox = boxen(greeting, boxenOptions);

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
