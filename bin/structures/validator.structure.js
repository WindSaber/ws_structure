const fse = require('fs-extra');
const chalk = require('chalk');

const crearValidadorStructure = (opciones) => new Promise(async (resolve, reject) => {
    try {
        console.log(chalk.cyan('Inicia la creación de la estructura para el Validator'));
        let text = getValidador(opciones)
        await fse.outputFile('src/validators.js', text);
        console.log(chalk.cyan('./Termina la creación de la estructura para el Validator'));
        resolve();
    } catch (err) {
        reject("Error al crear estructura Validator:\n" + err);
    }
});

const getValidador = (opciones) => `//|-----Plantilla generada con ws_structure @windsaber 2022-------|//
import * as yup from 'yup';
import es from 'yup-es';

yup.setLocale(es);

export const sch_ejemplo = yup.object().shape({
    categoria: yup.mixed().label('##articulo:categoria##').required(),
    subcategoria: yup.mixed().label('##articulo:subcategoria##').required(),
    descripcion: yup.string().label('##articulo:descripcion##').required().max(500),
    info_adicional: yup.string().label('##articulo:infoAdicional##').required().max(500),
});

export const sch_configuracion = yup.object().shape({
    nombre: yup.string().label('##catalogos:nombre##').required().max(50),
    descripcion: yup.string().label('##catalogos:descripcion##').required().max(250),
    tipo_configuracion: yup.mixed().label('##articulo:seccionPermiso##').required(),
});
export const sch_permiso = yup.object().shape({
    nombre: yup.string().label('##catalogos:nombre##').required().max(80),
    descripcion: yup.string().label('##catalogos:descripcion##').required().max(100),
    seccion_permiso: yup.mixed().label('##articulo:seccionPermiso##').required()
});

export const sch_subcategoria = yup.object().shape({
    nombre: yup.string().label('##catalogos:nombre##').required().max(250),
    categoria: yup.mixed().label('##catalogos:categoria##').required(),
});

export const sch_seccion_permiso = yup.object().shape({
    nombre: yup.string().label('##catalogos:nombre##').required().max(50),
});`;

module.exports = {crearValidadorStructure};
