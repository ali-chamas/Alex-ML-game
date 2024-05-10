import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userType } from "../../tools/data-types/userType";

interface UserState {
  users: userType[] | [];
}

const initialState: UserState = {
  users: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<userType[]>) => {
      state.users = action.payload;
    },
  },
});

export const { setUsers } = userSlice.actions;

export const selectUser = (state: { users: UserState }) => state.users;

export default userSlice.reducer;
