import React from 'react';
import './index.css';
import AppWithRedux from './AppWithRedux';
//import AppWithReducer from './AppWithReducer';
import {createRoot} from 'react-dom/client';
import { Provider } from 'react-redux';
import {store} from "./state/store";

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container);
root.render(
    <Provider store={store}>
       <AppWithRedux />
    </Provider>
   );




