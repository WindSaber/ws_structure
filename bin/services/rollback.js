const {PAQUETES_DESINSTALAR} = require('../constants/rollback.constants');
const chalk = require("chalk");
const inquirer = require("inquirer");
const fs = require('fs-extra');
const {ENVS} = require('../constants/opciones.constants');

const rollback = (opciones) => {
    const promise = new Promise((resolve, reject) => {
        inquirer.prompt({
            type: 'confirm',
            name: 'continuar',
            message: 'Deseas hacer rollback (esta opción existe para pruebas, normalmente no querrás deshacer el trabajo que ya hice)',
            default: false
        }).then(async r => {
            if (r.continuar) {
                try{
                    await fs.remove('src');
                    if (opciones.indexOf(ENVS) >= 0) {
                        await fs.remove('.env.development');
                        await fs.remove('.env.example');
                        await fs.remove('.env.production');
                        await fs.remove('.env.qa');
                    }
                    console.log("Rollback terminado");
                    resolve();
                }catch (err){
                    console.log(err);
                }
                //Todo desinstalar
                // const exec = require('child_process').exec;
                // exec(`npm r ${PAQUETES_DESINSTALAR}`, (error, stdout, stderr) => {
                //     if (error) {
                //         console.error(`error: ${error.message}`);
                //         reject();
                //     }
                //
                //     if (stderr) {
                //         console.error(`stderr: ${stderr}`);
                //         reject();
                //     }
                //     console.log(`stdout:\n${stdout}`);
                //     console.log(chalk.green('Rollback completado'));
                //     resolve();
                // });
            } else
                resolve();
        })
    });
    return promise;
}

module.exports = {rollback};
