const chalk = require("chalk");
const inquirer = require("inquirer");
const fs = require('fs-extra');
const {ENVS} = require('../constants/opciones.constants');
const exec = require('child_process').exec;
const {getLibreriasInstalar} = require('./instalador');

const rollback = (opciones) => {
    const promise = new Promise((resolve, reject) => {
        inquirer.prompt({
            type: 'confirm',
            name: 'continuar',
            message: 'Deseas hacer rollback (esta opción existe para pruebas, normalmente no querrás deshacer el trabajo que ya hice)',
            default: false
        }).then(async r => {
            if (!r.continuar)
                resolve();
            try {
                await fs.remove('src');
                if (opciones.indexOf(ENVS) >= 0) {
                    await fs.remove('.env.development');
                    await fs.remove('.env.example');
                    await fs.remove('.env.production');
                    await fs.remove('.env.qa');
                }
                await desinstalar(opciones);
                console.log(chalk.green('Rollback completado'));
                resolve();
            } catch (err) {
                console.log(err);
            }


        })
    });
    return promise;
}

const desinstalar = async (opciones) => new Promise((resolve, reject) => {
    exec(`npm r ${getLibreriasInstalar(opciones)}`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            reject();
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            reject();
        }
        console.log(`stdout:\n${stdout}`);
        resolve();
    });
})


module.exports = {rollback};
