import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import userSliceReducer from "./users";
export const store = configureStore({
  reducer: {
    users: userSliceReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
