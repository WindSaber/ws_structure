const {PAQUETES_DESINSTALAR} = require('../constants/rollback.constants');
const chalk = require("chalk");
const inquirer = require("inquirer");

const rollback = (opciones) => {
    const promise = new Promise((resolve, reject) => {
        inquirer.prompt({
            type: 'confirm',
            name: 'continuar',
            message: 'Deseas hacer rollback (esta opción existe para pruebas, normalmente no querrás deshacer el trabajo que ya hice)',
            default: false
        }).then(r => {
            if (r.continuar) {
                const exec = require('child_process').exec;
                exec(`npm r ${PAQUETES_DESINSTALAR}`, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`error: ${error.message}`);
                        reject();
                    }

                    if (stderr) {
                        console.error(`stderr: ${stderr}`);
                        reject();
                    }
                    console.log(`stdout:\n${stdout}`);
                    console.log(chalk.green('Rollback completado'));
                    resolve();
                });
            } else
                resolve();
        })
    });
    return promise;
}

module.exports = {rollback};
