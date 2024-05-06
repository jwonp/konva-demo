import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";

interface MouseClickState {
  isMouseDown: boolean;
  isKeyDownShift: boolean;
  isKeyDownCtrl: boolean;
}

const initialState: MouseClickState = {
  isMouseDown: false,
  isKeyDownShift: false,
  isKeyDownCtrl: false,
};

export const itemSelectModeSlice = createSlice({
  name: "itemSelectMode",

  initialState,
  reducers: {
    setMouseDown: (state, action: PayloadAction<boolean>) => {
      state.isMouseDown = action.payload;
    },
    setKeyDownShift: (state, action: PayloadAction<boolean>) => {
      state.isKeyDownShift = action.payload;
    },
    setKeyDownCtrl: (state, action: PayloadAction<boolean>) => {
      state.isKeyDownCtrl = action.payload;
    },
  },
});

export const { setMouseDown, setKeyDownShift, setKeyDownCtrl } =
  itemSelectModeSlice.actions;

export const getItemSelectModeState = (state: RootState) =>
  state.itemSelectMode;

export const getIsMouseDown = (state: RootState) =>
  state.itemSelectMode.isMouseDown;
export const getIsKeyDownShift = (state: RootState) =>
  state.itemSelectMode.isKeyDownShift;
export const getIsKeyDownCtrl = (state: RootState) =>
  state.itemSelectMode.isKeyDownCtrl;

export default itemSelectModeSlice.reducer;
