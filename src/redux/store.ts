import { configureStore } from "@reduxjs/toolkit";
import itemSelectModeReducer from "./features/itemSelectModeSlice";

export const store = configureStore({
  reducer: {
    itemSelectMode: itemSelectModeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
