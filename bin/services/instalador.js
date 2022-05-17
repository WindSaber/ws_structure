const {PKG_DISPONIBLES} = require('../constants/paquetes.constants');

const instalador = opciones => {
    return new Promise((resolve, reject) => {
        const exec = require('child_process').exec;
        let paquetes = getLibreriasInstalar(opciones);
        console.log("Los paquetes a instalar son " + paquetes);
        if (paquetes !== "")
            exec(`npm i ${paquetes}`, (error, stdout, stderr) => {
            //exec(`npm i @windsaber/ws_utils`, (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    reject(error);
                }

                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    resolve(); //Todo quitar al momento de Liberar
                    reject(stderr);
                }
                console.log(`stdout:\n${stdout}`);
                resolve();
            });
    });
}

const getLibreriasInstalar = opciones => {
    let paquetes = "";
    opciones.forEach(o => paquetes += PKG_DISPONIBLES[o] != "" ? ` ${PKG_DISPONIBLES[o]}` : '');
    return paquetes;
}
module.exports = {instalador, getLibreriasInstalar};
