import { configureStore } from "@reduxjs/toolkit";
import itemSelectModeReducer from "./features/item/itemSelectModeSlice";
import itemControlReducer from "./features/item/itemControlSlice";
import itemReducer from "./features/item/itemSlice";
import itemMoveNavigatorReducer from "./features/item/itemMoveNavigatorSlice";

export const store = configureStore({
  reducer: {
    itemSelectMode: itemSelectModeReducer,
    itemControl: itemControlReducer,
    itemMoveNavigator:itemMoveNavigatorReducer,
    item: itemReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
