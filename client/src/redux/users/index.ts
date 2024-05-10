import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userType } from "../../tools/data-types/userType";

interface UserState {
  users: userType[] | [];
}

const initialState: UserState = {
  users: [],
};
