#!/usr/bin/env node

const {reiniciaMenu} = require('./services/menu');
const {creaEstructuraIndex} = require('./structures/index.structure');
const {instalador} = require('./services/instalador');
const {rollback} = require('./services/rollback');

reiniciaMenu().then(async opciones => {
    await creaEstructuraIndex(opciones);

    await rollback(opciones);
});

//
// instalador().then(() => {
//     reiniciaMenu().then(async r => {
//         await creaEstructuraIndex(r);
//         console.log("termine");
//     });
// });
