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

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserApi } from "../../api/UserApi";

const initialState = {
  user: null,
  loading: false,
  token: null,
  error: "",
};

async function fetchUserAsync(userName, password) {
  await UserApi.login(userName, password);

  return {"user_Info":{"firstName":"John","lastName":"Doe","username":"user1","password":"password1","role":"Administrator","disabled":false,"id":"fc2ff8dc-fd84-4b03-9e19-90e60924cdbd","active":true}};
}

export const fetchUser = createAsyncThunk(
  "/user/fetchUser",
  ({ userName, password }) => {
    return fetchUserAsync(userName, password);
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      UserApi.logout();
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = "";
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
    });
  },
});

export default userSlice.reducer;

export const { logout } = userSlice.actions;
