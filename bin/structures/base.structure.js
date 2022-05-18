const fse = require('fs-extra');
const chalk = require('chalk');
const {ADMIN, CATALOGOS} = require('../constants/opciones.constants');
const {tiene} = require('../services/menu');

const creaCarpetasBase = (opciones) => new Promise(async (resolve, reject) => {
    console.log(chalk.cyan(`Inicia la creación de carpetas base`));
    try {
        await fse.ensureDir('src/api');
        await fse.ensureDir('src/assets/img');
        await fse.ensureDir('src/components');
        if (tiene(ADMIN, opciones))
            await fse.ensureDir('src/components/Admin');
        if (tiene(CATALOGOS, opciones))
            await fse.ensureDir('src/components/Catalogos');
        await fse.ensureDir('src/constants');
        await fse.ensureDir('src/models');
        await fse.ensureDir('src/services');
        console.log(chalk.cyan(`./Termina la creación de carpetas base`));
        resolve();
    } catch (e) {
        console.log("Error al crear carpetas base: \n" + e);
        reject();
    }
});



module.exports = {creaCarpetasBase};
