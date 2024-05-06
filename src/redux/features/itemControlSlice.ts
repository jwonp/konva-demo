import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";

interface ItemControlState {
  moveToIndex: number;
  selectedItemIndex: number;
}

const initialState: ItemControlState = {
  moveToIndex: -1,
  selectedItemIndex: -1,
};

export const itemControlSlice = createSlice({
  name: "itemControl",

  initialState,
  reducers: {
    setMoveToIndex: (state, action: PayloadAction<number>) => {
      state.moveToIndex = action.payload;
    },
    setSelectedItemIndex: (state, action: PayloadAction<number>) => {
      state.selectedItemIndex = action.payload;
    },
    resetItemControl: (state) => {
      state = initialState;
    },
  },
});

export const { setMoveToIndex, setSelectedItemIndex, resetItemControl } =
  itemControlSlice.actions;

export const getItemControlState = (state: RootState) => state.itemControl;
export const getMoveToIndex = (state: RootState) =>
  state.itemControl.moveToIndex;
export const getSelectedItemIndex = (state: RootState) =>
  state.itemControl.selectedItemIndex;

export default itemControlSlice.reducer;
