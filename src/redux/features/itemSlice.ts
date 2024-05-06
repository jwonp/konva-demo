import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";
import { Item } from "@/storage/item";

export interface MoveItemActionPayload {
  from: number[];
  to: number;
}

interface ItemState {
  items: Item[];
}

const initialState: ItemState = {
  items: [],
};

export const itemSlice = createSlice({
  name: "item",

  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Item[]>) => {
      state.items = [...action.payload];
    },
    moveItem: (state, action: PayloadAction<MoveItemActionPayload>) => {
      if (action.payload.from.includes(-1) || action.payload.to < 0) {
        return;
      }
      let movedItems: Item[] = [];
      const items = [...(state.items as Item[])];
      const { from, to } = action.payload;

      from.forEach((fromIndex) => {
        const splicedItems = items.splice(fromIndex, 1);
        movedItems = [...movedItems, ...splicedItems];
      });

      state.items = items.toSpliced(to, 0, ...movedItems);
    },
    resetItems: (state) => {
      state.items = [];
    },
  },
});

export const { setItems, moveItem, resetItems } = itemSlice.actions;

export const getItemState = (state: RootState) => state.item;
export const getItems = (state: RootState) => state.item.items;

export default itemSlice.reducer;
