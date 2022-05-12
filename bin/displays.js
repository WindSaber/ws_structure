const chalk = require("chalk");
const boxen = require("boxen");

const showBanner = () => console.log(boxen(`${chalk.green.bold(' '.repeat(30) + 'WS Structure' + ' '.repeat(30))}
Este paquete fue desarrollado por ${chalk.green.bold('@windsaber')} para ayudarme con la tarea
repetitiva de copiar archivos cada vez que inicio un nuevo proyecto`, {
   borderColor: "green",
   padding: 0,
   borderStyle: 'classic'
}));

const showOpciones = ()=> console.log(`${chalk.blue('Estas son las estructuras que puedo crear. Selecciona la que desees')}
1. BasicIndex
2. Api
3. Otro`);

const reiniciaMenu = ()=>{
    showBanner();
    showOpciones();
};

module.exports = {reiniciaMenu};
