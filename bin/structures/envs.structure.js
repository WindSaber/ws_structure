const chalk = require("chalk");
const fse = require('fs-extra');

const creaEstructuraEnvs = (opciones, nombre_app) => new Promise((resolve, reject) => {
    //TOdo modificar el .gitignore
    console.log(chalk.cyan(`Inicia la creación de la estructura de los .env's`));
    let envs_done = 1;
    let envs = ['prod', 'qa', 'dev', 'example'];
    envs.map((env) => {
        let text = "";
        text += getEnvStructure(env, opciones, nombre_app);
        fse.outputFile(getEnvName(env), text).then(() => {
            envs_done++;
            if (envs_done === envs.length) {
                console.log(chalk.cyan(`./Termina creación de estructura de los env's`));
                console.log(chalk.green(`No olvides actualizar tus envs con las rutas y parámetros correctos`));
                resolve();
            }
        }).catch(err => {
            console.error(err);
            reject();
        });
    })
});

const getEnvName = env => {
    switch (env) {
        case 'prod':
            return '.env.production';
        case 'qa':
            return '.env.qa';
        case 'dev':
            return '.env.development';
    }
    return `.env.${env}`;
}

const getEnvStructure = (env, opciones, nombre_app) => `#Plantilla generada con ws_structure @windsaber 2022
REACT_APP_VERSION=v1.0.0
REACT_APP_APP_NAME=${nombre_app}
REACT_APP_BASE_NAME=/
REACT_APP_ENV=${env}
REACT_APP_URL_BASE=${env === 'dev' ? 'http://localhost/${nombre_app}/public' : 'http://el_dominio/api/public'}
REACT_APP_URL_API=${env === 'dev' ? 'http://localhost/${nombre_app}/public/api' : 'http://el_dominio/api/public/api'}
REACT_APP_URL_WEB=${env === 'dev' ? 'http://localhost:3000' : 'http://el_dominio'}
`;


module.exports = {creaEstructuraEnvs};
