import { configureStore } from "@reduxjs/toolkit";
import { reducer as notificationsReducer } from "reapop";
import userReducer from "./user/userReducer";
import { poolReducer } from "@nftvillage/farms-sdk";

const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: {
    notifications: notificationsReducer(),
    user: userReducer,
    pools: poolReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
