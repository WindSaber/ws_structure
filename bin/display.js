const boxen = require("boxen");
const chalk = require("chalk");
const inquirer = require('inquirer');

const showBanner = () => console.log(boxen(`${chalk.green.bold(' '.repeat(30) + 'WS Structure' + ' '.repeat(30))}
Este paquete fue desarrollado por ${chalk.green.bold('@windsaber')} para ayudarme con la tarea
repetitiva de copiar archivos cada vez que inicio un nuevo proyecto`, {
    borderColor: "green",
    padding: 0,
    margin: 1,
    borderStyle: 'classic'
}));

const getOpciones = () => {
    const choices = [
        new inquirer.Separator(' = Opciones Generales = '),
        {value: 'i18next', name: 'i18next', checked: true},
        {value: 'zustand', name: 'Zustand', checked: true},
        {value: 'axios', name: 'axios', checked: true},
        {value: 'api_ex', name: 'Ejemplo de API'},
    ];

    inquirer.prompt({
        type: 'checkbox',
        'message': 'Seleccione las estrucuturas que voy a crear',
        name: 'estructuras', choices,
        validate(answer) {
            if (answer.length == 0)
                return 'Carnaaal, tienes que elegir al menos una opción...dame trabajo y déjame ayudarte con el tuyo-';
            return true;
        }
    }).then(r => {
        console.log(JSON.stringify(r.estructuras, null, '  '));
        return r?.estructuras || [];
    })
};

const reiniciaMenu = () => {
    showBanner();
    getOpciones();
};

module.exports = {reiniciaMenu};
