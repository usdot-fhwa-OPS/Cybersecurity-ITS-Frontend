import {configureStore} from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import userReducer from '../features/authentication/userSlice';
import globalStateReducer from '../features/global/globalStateSlice';
import configurationReducer from '../features/configuration/configurationSlice';
import storage from 'redux-persist/lib/storage';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ["user"],
}

const rootReducer = combineReducers({
    user: userReducer,
    globalState: globalStateReducer,
    configuration: configurationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
});

export default store;