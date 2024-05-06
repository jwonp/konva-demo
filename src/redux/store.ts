import { configureStore } from "@reduxjs/toolkit";
import itemSelectModeReducer from "./features/itemSelectModeSlice";
import itemControlReducer from "./features/itemControlSlice";
import itemReducer from "./features/itemSlice";

export const store = configureStore({
  reducer: {
    itemSelectMode: itemSelectModeReducer,
    itemControl: itemControlReducer,
    item: itemReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
