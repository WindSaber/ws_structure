const chalk = require("chalk");
const fs = require('fs');
const fse = require('fs-extra');
const {ENVS} = require('../constants/opciones.constants');

const creaEstructuraPackageJson = (opciones, nombre_app) => new Promise(async (resolve, reject) => {
    console.log(chalk.cyan(`Inicia la modificación del package.json`, 'utf8'));
    try {
        let pkg_obj = JSON.parse(await fse.readFile('package.json', 'utf-8'));
        let overwrite = false;
        if (opciones.indexOf(ENVS) >= 1) {
            overwrite = true;
            if (typeof pkg_obj.scripts["build:prod"] === 'undefined')
                pkg_obj.scripts["build:prod"] = `PUBLIC_URL=/${nombre_app} env-cmd -f .env.production react-scripts build`;
            if (typeof pkg_obj.scripts["build:qa"] === 'undefined')
                pkg_obj.scripts["build:qa"] = `PUBLIC_URL=/${nombre_app} env-cmd -f .env.qa react-scripts build`;
        }
        if (overwrite)
            await fse.outputFile('package.json', JSON.stringify(pkg_obj, null, "\t"));
        console.log(chalk.cyan(`./Termina la modificación del package.json`));
        resolve();
    } catch (e) {
        console.log(e);
        reject();
    }

});

module.exports = {creaEstructuraPackageJson};
