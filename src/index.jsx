import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import {MemoryRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './app/store';
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import './common/localization/i18n'

const persistedStore = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);