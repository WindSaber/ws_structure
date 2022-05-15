const boxen = require("boxen");
const chalk = require("chalk");
const inquirer = require('inquirer');
const {I18NEXT} = require('../lib/constants/opciones.constants');

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
            // new inquirer.Separator(' = Opciones Generales = '),
            {value: I18NEXT, name: 'i18next', checked: true},
            {value: 'zustand', name: 'Zustand', checked: true},
            {value: 'axios', name: 'axios', checked: true},
            {value: 'api_ex', name: 'Ejemplo de API'},
            {value: 'b_styles', name: 'Styles básicos basados en SMACSS'},
            {value: 'datepicker', name: 'Datepicker'},
            {value: 'helmet', name: 'React Helmet'},
        ];

        inquirer.prompt({
            type: 'checkbox',
            'message': 'Seleccione las estrucuturas que voy a crear',
            name: 'estructuras', choices,
            validate(answer) {
                if (answer.length == 0)
                    console.log(chalk.red('Carnaaal, tienes que elegir al menos una opción...dame trabajo y déjame ayudarte con el tuyo.'));
                return true;
            }
        }).then(r => {
            //console.log(JSON.stringify(r.estructuras, null, '  '));
            resolve(r.estructuras);
        })
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
