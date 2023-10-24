import { createSlice } from '@reduxjs/toolkit'

import {
    INACTIVE_TIMEOUT_MILI_SEC,
    } from '../../common/utils/wsConstants'

const initialState = {
    language: "en-US",
    forceLogoutTimer: INACTIVE_TIMEOUT_MILI_SEC,
    inactivityTimer: INACTIVE_TIMEOUT_MILI_SEC
};

const configurationSlice = createSlice({
    name: 'configuration',
    initialState,
    reducers: {
        updateLanguage: (state, action) => {
            state.language = action.payload;
        },
        updateForceLogoutTimer: (state, action) => {
            state.forceLogoutTimer = action.payload;
        },
        updateInactivityTimer: (state, action) => {
            state.inactivityTimer = action.payload;
        }
    },
});

export const { 
                updateLanguage, 
                updateForceLogoutTimer, 
                updateInactivityTimer
            } = configurationSlice.actions;

export default configurationSlice.reducer;