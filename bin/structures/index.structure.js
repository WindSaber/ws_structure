const chalk = require("chalk");
const fse = require('fs-extra');
const {BOOTSTRAP, I18NEXT, HELMET, DATEPICKER, ZUSTAND, SMACSS, TIPPY, ANIMATE} = require('../constants/opciones.constants');

const creaEstructuraIndex = opciones => new Promise((resolve, reject) => {
    console.log(chalk.cyan('Inicia la creación de la estructura para el index'));
    let text = "";
    text += getImports(opciones);
    fse.outputFile('src/index.js', text).then(() => {
        console.log(chalk.cyan('./Termina creación de estructura para el index'));
        resolve();
    }).catch(err => {
        console.error(err);
        reject();
    });
});

const getImports = (opciones) => `//|-----Plantilla generada con ws_structure @windsaber 2022-------|//
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

//|-----LibreriasImport-------|//
${tiene(HELMET, opciones) ? `import {HelmetProvider} from 'react-helmet-async';` : ''}
${tiene(I18NEXT, opciones) ? `import {iniciaLang} from './lang/i18n';` : ''}
${tiene(ZUSTAND, opciones) ? `import {myStore} from './store/store';` : ''}

${tiene(BOOTSTRAP, opciones) ? `
//|------Bootstrap------|//
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';` : ''}


//|------CSS------|//
${tiene(SMACSS, opciones) ? `import './styles/mdb.css';
import './styles/base.css';
import './styles/theme.css';
import './styles/layout.css';
import './styles/modules.css';` : ''}
${tiene(TIPPY, opciones) ? `import 'react-tippy/dist/tippy.css';";` : ''}
${tiene(ANIMATE, opciones) ? `import "import "animate.css"";` : ''}
${tiene(DATEPICKER, opciones) ? `import "react-datepicker/dist/react-datepicker.css";` : ''}

${tiene(DATEPICKER, opciones) ? `
//|------Datepicker------|//
import { registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es';
registerLocale('es', es);` : ''}


//|------InitDeAplicacion------|//
${tiene(ZUSTAND, opciones) ? `export const useStore = myStore;
useStore.getState().cargaPermisos();
//useStore.getState().cargaConfiguracion();
//useStore.getState().cargaUsuario();` : ''}
${tiene(I18NEXT, opciones) ? `iniciaLang();` : ''}


ReactDOM.render(
    <React.StrictMode>
        ${tiene(HELMET, opciones) ? `<HelmetProvider>` : ''}
            <App/>
        ${tiene(HELMET, opciones) ? `</HelmetProvider>` : ''}
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
`;

const tiene = (seed, opciones) => opciones.indexOf(seed) >= 0;

module.exports = {creaEstructuraIndex};
