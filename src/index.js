//|-----Plantilla generada con ws_structure @windsaber 2022-------|//
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

//|-----LibreriasImport-------|//

import {iniciaLang} from './lang/i18n';
import {myStore} from './store/store';




//|------CSS------|//

import 'react-tippy/dist/tippy.css';";
import "import "animate.css"";





//|------InitDeAplicacion------|//
export const useStore = myStore;
useStore.getState().cargaPermisos();
//useStore.getState().cargaConfiguracion();
//useStore.getState().cargaUsuario();
iniciaLang();


ReactDOM.render(
    <React.StrictMode>
        
            <App/>
        
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
