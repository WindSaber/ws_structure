const chalk = require("chalk");
const fse = require('fs-extra');
const {I18NEXT} = require('../constants/opciones.constants');

const creaEstructuraIndex = opciones => {
    console.log(chalk.cyan('Inicia la creación de la estructura para el index'));
    let text = "";
    text += getImports(opciones);
    fse.outputFile('src/index.js', text).then(() => {
        console.log(chalk.cyan('./Termina creación de estructura para el index'));
    }).catch(err => {
        console.error(err)
    });
    //console.log(JSON.stringify(opciones, null, '  '));
}

const getImports = (opciones) => `import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

//|-----LibreriasImport-------|//
import {HelmetProvider} from 'react-helmet-async';${opciones.indexOf(I18NEXT) >= 0 ? "\nimport {iniciaLang} from './lang/i18n';" : ''}
import {myStore} from "./store/store";

//|------Bootstrap------|//
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';

//|------CSS------|//
import './styles/animate.css'
import './styles/mdb.css';
import './styles/base.css';
import './styles/theme.css';
import './styles/layout.css';
import './styles/modules.css';
import './styles/imagehover.css';
import 'react-tippy/dist/tippy.css';
import "animate.css"
import 'react-image-lightbox/style.css';
import "react-datepicker/dist/react-datepicker.css";
//|------Datepicker------|//
import { registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es';
`;

module.exports = {creaEstructuraIndex};
