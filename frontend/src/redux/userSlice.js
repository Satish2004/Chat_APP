import { createSlice } from "@reduxjs/toolkit";
// import { getOtherUser } from "../../../backend/controllers/userController";
const userSlice = createSlice({
  name: "user",
  initialState: {
    authUser: null,
    OtherUsers: null,
    SelectedUser: null,
    onlineUsers: null,
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    setOtherUsers: (state, action) => {
      state.OtherUsers = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.SelectedUser = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});
export const { setAuthUser, setOtherUsers, setSelectedUser, setOnlineUsers } =
  userSlice.actions;

export default userSlice.reducer;
