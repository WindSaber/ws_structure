const chalk = require("chalk");
const fse = require('fs-extra');

const creaEstructuraApi = (opciones, nombre_app, ambiente) => new Promise(async (resolve, reject) => {
    try {
        console.log(chalk.cyan('Inicia la creación de la estructura para el API'));
        let text = ambiente === 'g' ? getAxiosG(opciones) : getAxiosI(opciones);
        await fse.outputFile('src/api/axios.js', text);
        text = getResponses(opciones);
        await fse.outputFile('src/api/responses.js', text);
        text = getAdjuntos(opciones);
        await fse.outputFile('src/api/adjuntosApi.js', text);
        text = getAdmin(opciones);
        await fse.outputFile('src/api/adminApi.js', text);
        text = getCatalogos(opciones);
        await fse.outputFile('src/api/catalogosApi.js', text);
        if (ambiente === 'g') {
            text = getTrabajadoresG(opciones);
            await fse.outputFile('src/api/trabajadoresApi.js', text);
        } else {
            text = getUsuariosI(opciones);
            await fse.outputFile('src/api/usuariosApi.js', text);
        }
        console.log(chalk.cyan('./Termina la creación de la estructura para el API'));
        resolve();
    } catch (err) {
        reject("Error al crear estructura Api:\n" + err);
    }
});

const getAxiosG = (opciones) => `//|-----Plantilla generada con ws_structure @windsaber 2022-------|//
import axios from 'axios';
import {getLS} from '../services/localstorage';

export default axios.create(
    {
        baseURL: \`\${process.env.REACT_APP_URL_API}/\`,
        headers: {
            common: {
                Authorization: \`Bearer \${getLS('ngStorage-token') || getLS('g_access_token')}\`
            }
        }
    }
);`;

const getAxiosI = (opciones) => `//|-----Plantilla generada con ws_structure @windsaber 2022-------|//
import axios from 'axios';
import {getAccessToken, setAccessToken} from "../services/seguridad.service";
import Cookies from 'universal-cookie';
import {isLogged, logout} from "../services/authService";

let instance = axios.create(
    {
        baseURL: \`\${process.env.REACT_APP_URL_API}/\`
    }
);

instance.interceptors.request.use(config => {
    config.headers.Authorization = \`Bearer \${getAccessToken()}\`;
    return config;
});


instance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (!isLogged())
        return new Promise((resolve, reject) => void (reject(error)));
    else {
        const originalReq = error.config;
        if (error.response.status !== 401 && error.response.status !== 403)
            return new Promise((resolve, reject) => void (reject(error)));
        if (error.config.url === '/renuevaAccessToken' || error.config.url === '/login/attempt') {
            //logout();
            return new Promise((resolve, reject) => void (reject(error)));
        }
        const cookies = new Cookies();
        const refresh_token = cookies.get('refresh_token');
        originalReq._retry = true;
        return axios.post(\`\${process.env.REACT_APP_URL_API}/renuevaAccessToken\`, {refresh_token})
            .then(res => {
                setAccessToken(res.data.access_token)
                originalReq.headers['Authorization'] = \`Bearer \${res.data.access_token}\`;
                return axios(originalReq);
            }).catch(error => {
                logout();
                Promise.reject(error);
            });
    }
});
export const API = instance;
`;

const getResponses = opciones => `//|-----Plantilla generada con ws_structure @windsaber 2022-------|//
import {cargadoCorrecto, guardadoCorrecto, ocultableDanger} from "../services/swalService";
import i18next from "i18next";

export const mostrarErrorCargar = (error) => {
    let error_str = (((error || {}).response || {}).data || {}).mensaje || i18next.t('general:errorAlCargar');
    ocultableDanger(error_str, i18next.t('general:error'));
    throw (error);
};
export const mostrarErrorGuardar = (error) => {
    let error_str = (((error || {}).response || {}).data || {}).mensaje || i18next.t('general:errorAlGuardar');
    ocultableDanger(error_str, i18next.t('general:error'));
    throw (error);
};
export const returnGuardadoCorrecto = (data) => {
    guardadoCorrecto();
    return data;
};
export const returnCargadoCorrecto = (data) => {
    cargadoCorrecto();
    return data;
};`;

const getAdjuntos = opciones => `//|-----Plantilla generada con ws_structure @windsaber 2022-------|//
import {mostrarErrorCargar, mostrarErrorGuardar, returnCargadoCorrecto, returnGuardadoCorrecto} from "./responses";
import {cargando} from "../services/swalService";
import {API} from "./axios";

const ruta_base = \`\${process.env.REACT_APP_URL_API}/adjuntos\`;

export const descargarAdjunto = (adjunto_id, data = {}, mostrar_cargando = false, mostrar_cargado = false, mostrar_error = true) => {
    if (mostrar_cargando)
        cargando();
    return API.post(\`\${ruta_base}/descargar/\${adjunto_id}\`, data)
        .then(res => mostrar_cargado ? returnCargadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorCargar(err));
};

export const guardarAdjuntoDeAlgo = (algun_id, archivos,mostrar_cargando = true, mostrar_cargado = true, mostrar_error = true) => {
    mostrar_cargando && cargando();
    let formData = new FormData();
    archivos.forEach((file, idx) => {
        formData.append(\`adjuntos[\${idx}]\`, file);
    });
    formData.append('algun_id', propiedad_id);
    return API.post(\`\${ruta_base}/guardarAdjuntoDeAlgo\`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(res => mostrar_cargado && returnGuardadoCorrecto(res.data))
        .catch((err) => mostrar_error && mostrarErrorGuardar(err));
};`;

const getAdmin = opciones => `//|-----Plantilla generada con ws_structure @windsaber 2022-------|//
import {API} from './axios';
import { returnCargadoCorrecto, mostrarErrorCargar} from "./responses";
import {cargando} from "../services/swalService";

const ruta_base = "admin/";
export const guardarRolUsuarios = (rol,mostrar_cargando = true, mostrar_cargado = false, mostrar_error = true) => {
    if (mostrar_cargando)
        cargando();
    return API.post(\`\${ruta_base}guardarRolUsuarios\`, {rol: rol})
        .then(res => mostrar_cargado ? returnCargadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorCargar(err));
};
export const guardarRolPermisos = (rol,mostrar_cargando = true, mostrar_cargado = false, mostrar_error = true) => {
    if (mostrar_cargando)
        cargando();
    return API.post(\`\${ruta_base}guardarRolPermisos\`, {rol: rol})
        .then(res => mostrar_cargado ? returnCargadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorCargar(err));
};
`;

const getCatalogos = opciones => `//|-----Plantilla generada con ws_structure @windsaber 2022-------|//
import API from './axios';
import {cargando} from "../services/swalService";
import {returnGuardadoCorrecto, mostrarErrorCargar, mostrarErrorGuardar, returnCargadoCorrecto} from "./responses";

const ruta_base = "catalogos/";

export const getAllGenerico = (key, relaciones, mostrar_cargando = true, mostrar_cargado = false, mostrar_error = true) => {
    cargando();
    return API.post(\`\${ruta_base}getAllGenerico/\${key}\`, {relaciones})
        .then(res => mostrar_cargado ? returnCargadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorCargar(err));
};
export const getActivosGenerico = (key, relaciones, mostrar_cargando = true, mostrar_cargado = false, mostrar_error = true) => {
    cargando();
    return API.post(\`\${ruta_base}getActivosGenerico/\${key}\`, {relaciones})
        .then(res => mostrar_cargado ? returnCargadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorCargar(err));
};
export const getCatalogos = (solicitados, mostrar_cargando = true, mostrar_cargado = false, mostrar_error = true) => {
    if (mostrar_cargando)
        cargando();
    return API.post(\`\${ruta_base}getMultiAllGenerico\`, { 'peticiones': solicitados })
        .then(res => mostrar_cargado ? returnCargadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorCargar(err));
};
export const getGenerico = (key,id, relaciones, mostrar_cargando = true, mostrar_cargado = false, mostrar_error = true) => {
    cargando();
    return API.post(\`\${ruta_base}getGenerico/\${key}\`, {id, relaciones})
        .then(res => mostrar_cargado ? returnCargadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorCargar(err));
};
export const getMultiActivosGenerico = (peticiones, mostrar_cargando = true, mostrar_cargado = false, mostrar_error = true) => {
    cargando();
    return API.post(\`\${ruta_base}getMultiActivosGenerico\`, {peticiones})
        .then(res => mostrar_cargado ? returnCargadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorCargar(err));
};
export const guardaGenerico = (key, info, relaciones, mostrar_cargando = true, mostrar_cargado = true, mostrar_error = true) => {
    cargando();
    return API.post(\`\${ruta_base}guardarGenerico/\${key}\`, info)
        .then(res => mostrar_cargado && returnGuardadoCorrecto(res.data))
        .catch((err) => mostrar_error && mostrarErrorGuardar(err));
};
export const eliminaGenerico = (key, registro_id, mostrar_cargando = true, mostrar_cargado = true, mostrar_error = true) => {
    cargando();
    return API.post(\`\${ruta_base}eliminarGenerico/\${key}\`, {registro_id})
        .then(res => mostrar_cargado ? returnGuardadoCorrecto(res.data) : res.data)
        .catch(err => mostrar_error ? mostrarErrorGuardar(err) : err);
};
`;

const getTrabajadoresG = opciones => `//|-----Plantilla generada con ws_structure @windsaber 2022-------|//
import API from './axios';
import {cargando} from "../services/swalService";
import {returnGuardadoCorrecto, mostrarErrorCargar, mostrarErrorGuardar, returnCargadoCorrecto} from "./responses";

const ruta_base = "trabajadores/";

export const getTrabajadoresActivos = (relaciones, mostrar_cargando = true, mostrar_cargado = false, mostrar_error = true) => {
    cargando();
    return API.post(\`\${ruta_base}getActivos\`, {relaciones})
        .then(res => mostrar_cargado ? returnCargadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorCargar(err));
};
export const getConRelsPorPeriodo = (periodo_id, mostrar_cargando = true, mostrar_cargado = false, mostrar_error = true) => {
    cargando();
    return API.post(\`\${ruta_base}getConRelsPorPeriodo\`, {periodo_id})
        .then(res => mostrar_cargado ? returnCargadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorCargar(err));
};
export const getTrabajadoresPorJefePeriodo = (jefe_id, periodo_id, mostrar_cargando = true, mostrar_cargado = false, mostrar_error = true) => {
    cargando();
    return API.post(\`\${ruta_base}getTrabadoresPorJefePeriodo\`, {jefe_id, periodo_id})
        .then(res => mostrar_cargado ? returnCargadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorCargar(err));
};
export const guardaTrabajadoresDeJefe = (jefe_id, periodo_id, trabajadores, mostrar_cargando = true, mostrar_cargado = false, mostrar_error = true) => {
    cargando();
    return API.post(\`\${ruta_base}guardarTrabajadoresDeJefe\`, {jefe_id, periodo_id, trabajadores})
        .then(res => mostrar_cargado ? returnGuardadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorGuardar(err));
};
export const getJefesPorPeriodo=(periodo_id, mostrar_cargando = true, mostrar_cargado = false, mostrar_error = true)=>{
    cargando();
    return API.post(\`\${ruta_base}getJefesPorPeriodo\`, {periodo_id})
        .then(res => mostrar_cargado ? returnCargadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorCargar(err));
}
`;

const getUsuariosI = opciones => `//|-----Plantilla generada con ws_structure @windsaber 2022-------|//
import {API} from './axios';
import {cargando} from "../services/swalService";
import {returnGuardadoCorrecto, mostrarErrorGuardar} from "./responses";

const ruta_base = "usuarios/";

export const activaCuenta = (hash, mostrar_cargando = true, mostrar_cargado = true, mostrar_error = true) => {
    cargando();
    return API.post(\`\${ruta_base}activarCuenta\`, {hash})
        .then(res => mostrar_cargado ? returnGuardadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorGuardar(err));
};
export const activarUsuario = (usuario_id, mostrar_cargando = true, mostrar_cargado = true, mostrar_error = true) => {
    cargando();
    return API.post(\`\${ruta_base}actualizar\`, {usuario_id, info_actualizar: {estatus: 'ACT'}})
        .then(res => mostrar_cargado ? returnGuardadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorGuardar(err));
};

export const actualiza = (usuario_id, info_actualizar, info_personal, mostrar_cargando = true, mostrar_cargado = true, mostrar_error = true) => {
    cargando();
    return API.post(\`\${ruta_base}actualizar\`, {usuario_id, info_actualizar, info_personal})
        .then(res => mostrar_cargado ? returnGuardadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorGuardar(err));
};
export const cambiarPassword = (usuario_id, password, mostrar_cargando = true, mostrar_cargado = true, mostrar_error = true) => {
    cargando();
    return API.post(\`\${ruta_base}cambiarPassword\`, {usuario_id, password})
        .then(res => mostrar_cargado ? returnGuardadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorGuardar(err));
};

export const consultaUsuarios = (order = {id: 'asc'}, filtros = [], pagina = 1, rows = 20, relaciones = [], mostrar_cargando = true, mostrar_cargado = true, mostrar_error = true) => {
    cargando();
    return API.post(\`\${ruta_base}consultar\`, {order, filtros, pagina, rows, relaciones})
        .then(res => mostrar_cargado ? returnGuardadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorGuardar(err));
};

export const eliminaUsuario = (usuario_id, mostrar_cargando = true, mostrar_cargado = true, mostrar_error = true) => {
    cargando();
    return API.post(\`\${ruta_base}eliminarUsuario\`, {usuario_id})
        .then(res => mostrar_cargado ? returnGuardadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorGuardar(err));
};

export const getAllUsuarios = (mostrar_cargando = true, mostrar_cargado = false, mostrar_error = true) => {
    if (mostrar_cargando)
        cargando();
    return API.post(\`\${ruta_base}getAllUsuarios\`, {})
        .then(res => mostrar_cargado ? returnGuardadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorGuardar(err));
};
export const getDirecciones = (mostrar_cargando = true, mostrar_cargado = false, mostrar_error = true) => {
    if (mostrar_cargando)
        cargando();
    return API.post(\`\${ruta_base}getDirecciones\`, {})
        .then(res => mostrar_cargado ? returnGuardadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorGuardar(err));
};
export const getMiPerfil = (usuario_id_e, relaciones = [], mostrar_cargando = true, mostrar_cargado = true, mostrar_error = true) => {
    if (mostrar_cargando)
        cargando();
    return API.post(\`\${ruta_base}getMiPerfil\`, {usuario_id_e, relaciones})
        .then(res => mostrar_cargado ? returnGuardadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorGuardar(err));
};
export const guardaDireccion = (usuario_id_e, direccion, mostrar_cargando = true, mostrar_cargado = true, mostrar_error = true) => {
    cargando();
    return API.post(\`\${ruta_base}\${usuario_id_e === null ? 'guardarDireccionAnonimo' : 'guardarDireccion'}\`, {
        usuario_id_e,
        direccion
    })
        .then(res => mostrar_cargado ? returnGuardadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorGuardar(err));
};
export const inactivarUsuario = (usuario_id, mostrar_cargando = true, mostrar_cargado = true, mostrar_error = true) => {
    cargando();
    return API.post(\`\${ruta_base}actualizar\`, {usuario_id, info_actualizar: {estatus: 'INA'}})
        .then(res => mostrar_cargado ? returnGuardadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorGuardar(err));
};
export const restablecePassword = (hash, nuevo_password, mostrar_cargando = true, mostrar_cargado = true, mostrar_error = true) => {
    cargando();
    return API.post(\`\${ruta_base}restablecerPassword\`, {hash, nuevo_password})
        .then(res => mostrar_cargado ? returnGuardadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorGuardar(err));
};

export const registraUsuario = (usuario, mostrar_cargando = true, mostrar_cargado = true, mostrar_error = true) => {
    cargando();
    return API.post(\`\${ruta_base}registrarUsuario\`, {usuario})
        .then(res => res.data)
        .catch((err) => mostrar_error && mostrarErrorGuardar(err));
};

export const validaHash = (hash, mostrar_cargando = true, mostrar_cargado = true, mostrar_error = true) => {
    cargando();
    return API.post(\`\${ruta_base}validarHash\`, {hash})
        .then(res => mostrar_cargado ? returnGuardadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorGuardar(err));
};

export const recuperaPassword = (email, mostrar_cargado = true, mostrar_error = true) => {
    cargando();
    return API.post(\`\${ruta_base}olvidePassword\`, {email})
        .then(res => mostrar_cargado ? returnGuardadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorGuardar(err));
}

export const actualizaFotoPerfil = (info_personal_id, foto_uuid, mostrar_cargado = true, mostrar_error = true) => {
    cargando();
    return API.post(\`\${ruta_base}actualizarFotoPerfil\`, {info_personal_id: info_personal_id, foto_uuid: foto_uuid})
        .then(res => mostrar_cargado ? returnGuardadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorGuardar(err));
}
`;


module.exports = {creaEstructuraApi};
