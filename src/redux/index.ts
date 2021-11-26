import { configureStore } from "@reduxjs/toolkit";
import { reducer as notificationsReducer } from "reapop";
import userReducer from "./user/userReducer";

const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: {
    notifications: notificationsReducer(),
    user: userReducer,
  },
});

export default store;
