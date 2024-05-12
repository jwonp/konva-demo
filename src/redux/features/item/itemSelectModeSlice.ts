import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";

interface MouseClickState {
  mouseDownIndex: number;
  isKeyDownShift: boolean;
  isKeyDownCtrl: boolean;
}

const initialState: MouseClickState = {
  mouseDownIndex: -1,
  isKeyDownShift: false,
  isKeyDownCtrl: false,
};

export const itemSelectModeSlice = createSlice({
  name: "itemSelectMode",

  initialState,
  reducers: {
    setMouseDownIndex: (state, action: PayloadAction<number>) => {
      state.mouseDownIndex = action.payload;
    },
    setKeyDownShift: (state, action: PayloadAction<boolean>) => {
      state.isKeyDownShift = action.payload;
    },
    setKeyDownCtrl: (state, action: PayloadAction<boolean>) => {
      state.isKeyDownCtrl = action.payload;
    },
  },
});

export const { setMouseDownIndex, setKeyDownShift, setKeyDownCtrl } =
  itemSelectModeSlice.actions;

export const getItemSelectModeState = (state: RootState) =>
  state.itemSelectMode;

export const getMouseDownIndex = (state: RootState) =>
  state.itemSelectMode.mouseDownIndex;
export const getIsKeyDownShift = (state: RootState) =>
  state.itemSelectMode.isKeyDownShift;
export const getIsKeyDownCtrl = (state: RootState) =>
  state.itemSelectMode.isKeyDownCtrl;

export default itemSelectModeSlice.reducer;
