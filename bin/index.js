#!/usr/bin/env node

const {reiniciaMenu} = require('./menu');
const {creaEstructuraIndex} = require('../lib/structures/index.structure');
const {instalador} = require('./npm.helper');


instalador().then(() => {
    reiniciaMenu().then(r => {
        console.log(r);
        creaEstructuraIndex(r);
    });
});
