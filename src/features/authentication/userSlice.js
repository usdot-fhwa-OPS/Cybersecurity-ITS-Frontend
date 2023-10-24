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
