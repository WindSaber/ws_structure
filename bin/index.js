#!/usr/bin/env node

const {reiniciaMenu} = require('./services/menu');
const {creaEstructuraEnvs} = require('./structures/envs.structure');
const {creaEstructuraIndex} = require('./structures/index.structure');
const {creaEstructuraPackageJson} = require('./structures/packagejson.structure');
const {instalador} = require('./services/instalador');
const {rollback} = require('./services/rollback');
const {ENVS} = require('./constants/opciones.constants');
const chalk = require("chalk");

reiniciaMenu().then(async ({opciones, nombre_app}) => {
    try {
        await instalador(opciones);
        await creaEstructuraIndex(opciones);
        if (opciones.indexOf(ENVS) >= 0)
            await creaEstructuraEnvs(opciones, nombre_app);
        await creaEstructuraPackageJson(opciones, nombre_app);
        await rollback(opciones);
    } catch (err) {
        console.log(chalk.red("Hubo errores....¿Si me estás ejecutando dentro de un proyecto create-react-app verdad? --- mira esto salió en el error\n" + err));
    }
});

//
// instalador().then(() => {
//     reiniciaMenu().then(async r => {
//         await creaEstructuraIndex(r);
//         console.log("termine");
//     });
// });
