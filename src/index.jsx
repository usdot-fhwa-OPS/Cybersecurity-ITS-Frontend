/* Copyright (C) 2024 LEIDOS.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

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