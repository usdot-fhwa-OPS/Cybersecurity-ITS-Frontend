import {createSlice} from '@reduxjs/toolkit'
import {USER_ROLE_USER} from './userRoleTypes'
const initialState = {
    userRole: USER_ROLE_USER
};

const globalStateSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setUserRole:(state, action) => {
            state.userRole = action.payload;
        }
    }
})

export default globalStateSlice.reducer;

export const {setUserRole} = globalStateSlice.actions;