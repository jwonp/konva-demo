import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";
import { ModifierKey, ModifierKeys } from "../../../utils/keyEventHandler";
export interface SetSelectedItemIndexByModifierKey {
  pressedKey: ModifierKeys;
  index: number;
}

interface ItemControlState {
  moveToIndex: number;
  selectedItemIndexs: number[];
  focusedItemIndex: number;
  dragEventClearId: NodeJS.Timeout | null;
  isOnDrag: boolean;
  itemListScrollTop: number;
}

const initialState: ItemControlState = {
  moveToIndex: -1,
  selectedItemIndexs: [],
  focusedItemIndex: -1,
  dragEventClearId: null,
  isOnDrag: false,
  itemListScrollTop: 0,
};

export const itemControlSlice = createSlice({
  name: "itemControl",

  initialState,
  reducers: {
    setMoveToIndex: (state, action: PayloadAction<number>) => {
      state.moveToIndex = action.payload;
    },
    setSelectedItemIndex: (state, action: PayloadAction<number>) => {
      state.selectedItemIndexs = [action.payload];
    },
    setSelectedItemIndexByModifierKey: (
      state,
      action: PayloadAction<SetSelectedItemIndexByModifierKey>
    ) => {
      if (action.payload.pressedKey === ModifierKey.none) {
        state.selectedItemIndexs = [action.payload.index];
        return;
      }
      if (action.payload.pressedKey === ModifierKey.ctrl) {
        state.selectedItemIndexs = [
          ...state.selectedItemIndexs,
          action.payload.index,
        ];
        return;
      }
      if (action.payload.pressedKey === ModifierKey.shift) {
        const tempSelectedIndexIndexs = [...state.selectedItemIndexs];
        const fromIndex = Math.min(
          state.focusedItemIndex,
          action.payload.index
        );
        const toIndex = Math.max(state.focusedItemIndex, action.payload.index);

        const toAddIndex = Array.from(
          { length: toIndex - fromIndex + 1 },
          (v, i) => i + fromIndex
        );

        toAddIndex.forEach((idx) => {
          if (tempSelectedIndexIndexs.includes(idx) === false) {
            tempSelectedIndexIndexs.push(idx);
          }
        });

        state.selectedItemIndexs = [...tempSelectedIndexIndexs];
        return;
      }
      if (action.payload.pressedKey === ModifierKey.alt) {
        state.selectedItemIndexs = [action.payload.index];
        return;
      }
    },
    setFocusedItemIndex: (state, action: PayloadAction<number>) => {
      state.focusedItemIndex = action.payload;
    },
    setDragEventClearId: (
      state,
      action: PayloadAction<NodeJS.Timeout | null>
    ) => {
      state.dragEventClearId = action.payload;
    },
    setIsOnDrag: (state, action: PayloadAction<boolean>) => {
      state.isOnDrag = action.payload;
    },
    setItemListScrollTop: (state, action: PayloadAction<number>) => {
      state.itemListScrollTop = action.payload;
    },
    resetDragEventClearId: (state) => {
      state.dragEventClearId = null;
    },
    resetItemControl: (state) => {
      state.focusedItemIndex = initialState.focusedItemIndex;
      state.selectedItemIndexs = initialState.selectedItemIndexs;
      state.moveToIndex = initialState.moveToIndex;
    },
  },
});

export const {
  setMoveToIndex,
  setSelectedItemIndex,
  setSelectedItemIndexByModifierKey,
  setFocusedItemIndex,
  setDragEventClearId,
  setIsOnDrag,
  setItemListScrollTop,
  resetDragEventClearId,
  resetItemControl,
} = itemControlSlice.actions;

export const getItemControlState = (state: RootState) => state.itemControl;
export const getMoveToIndex = (state: RootState) =>
  state.itemControl.moveToIndex;
export const getSelectedItemIndexs = (state: RootState) =>
  state.itemControl.selectedItemIndexs;
export const getFocusedItemIndex = (state: RootState) =>
  state.itemControl.focusedItemIndex;
export const getDragEventClearId = (state: RootState) =>
  state.itemControl.dragEventClearId;
export const getIsOnDrag = (state: RootState) => state.itemControl.isOnDrag;
export const getItemListScrollTop = (state: RootState) =>
  state.itemControl.itemListScrollTop;
export default itemControlSlice.reducer;
