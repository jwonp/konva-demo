import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";

interface NavigatorState {
  itemMoveNavigatorBarHeight: number;
}

const initialState: NavigatorState = {
  itemMoveNavigatorBarHeight: -1,
};

export const itemMoveNavigatorSlice = createSlice({
  name: "itemMoveNavigator",

  initialState,
  reducers: {
    setItemMoveNavigatorBarHeight: (state, action: PayloadAction<number>) => {
      state.itemMoveNavigatorBarHeight = action.payload;
    },
  },
});

export const { setItemMoveNavigatorBarHeight } = itemMoveNavigatorSlice.actions;

export const getItemMoveNavigatorState = (state: RootState) =>
  state.itemMoveNavigator;
export const getItemMoveNavigatorBarHeight = (state: RootState) =>
  state.itemMoveNavigator.itemMoveNavigatorBarHeight;

export default itemMoveNavigatorSlice.reducer;
