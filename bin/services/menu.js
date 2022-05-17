const boxen = require("boxen");
const chalk = require("chalk");
const inquirer = require('inquirer');
const {I18NEXT, BASE, ZUSTAND, SMACSS, DATEPICKER, HELMET, AXIOS, ANIMATE, TIPPY, ENVS} = require('../constants/opciones.constants');

const showBanner = () => console.log(boxen(`${chalk.green.bold(' '.repeat(30) + 'WS Structure' + ' '.repeat(30))}
Este paquete fue desarrollado por ${chalk.green.bold('@windsaber')} para ayudarme con la tarea
repetitiva de copiar archivos cada vez que inicio un nuevo proyecto`, {
    borderColor: "green",
    padding: 0,
    margin: 1,
    borderStyle: 'classic'
}));

const getOpciones = async () => {
    return new Promise(resolve => {
        const choices = [
            new inquirer.Separator(' === Opciones Generales === '),
            {value: I18NEXT, name: 'i18next', checked: true},
            {value: BASE, name: 'Paquetería básica necesaria (moment, routerdom, immer, yup, etc)', checked: true},
            {value: ZUSTAND, name: 'Zustand', checked: true},
            {value: AXIOS, name: 'axios', checked: true},
            {value: ENVS, name: `Archivos env's`, checked: true},
            {value: SMACSS, name: 'Styles básicos basados en SMACSS'},
            {value: DATEPICKER, name: 'Datepicker'},
            {value: HELMET, name: 'React Helmet'},
            new inquirer.Separator(' === Librerías secundarias === '),
            {value: TIPPY, name: 'Tippy (para los tooltips)', checked: true},
            {value: ANIMATE, name: 'Animate.css', checked: true},
        ];

        inquirer.prompt([
            {
                type: 'checkbox',
                'message': 'Seleccione las estrucuturas que voy a crear',
                name: 'estructuras', choices,
                validate(answer) {
                    if (answer.length == 0)
                        console.log(chalk.red('Carnaaal, tienes que elegir al menos una opción...dame trabajo y déjame ayudarte con el tuyo.'));
                    return true;
                }
            },
            {
                type: 'text',
                message: 'Cual es el nombre de la app ejemplo nombre_app',
                name: 'nombre_app'
            }
        ]).then(r => resolve({opciones: r.estructuras, nombre_app: r.nombre_app}))
    })
};

const reiniciaMenu = () => {
    return new Promise(async (resolve) => {
        showBanner();
        let opciones = await getOpciones();
        resolve(opciones);
    })
};

module.exports = {reiniciaMenu};
