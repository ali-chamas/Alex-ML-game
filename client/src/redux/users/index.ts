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
    setUsers: (state, action: PayloadAction<UserState>) => {
      state.users = action.payload.users;
    },
  },
});

export const { setUsers } = userSlice.actions;
