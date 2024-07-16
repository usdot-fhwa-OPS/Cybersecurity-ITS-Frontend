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