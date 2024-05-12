import { useRef, useState, useEffect } from "react";
import { Item, ItemType, addItem } from "../../storage/item";
import { getIsOnDrag } from "../../redux/features/item/itemControlSlice";
import ItemList from "../LeftSideBar/ItemList";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setItems } from "../../redux/features/item/itemSlice";
import {
  getItemMoveNavigatorBarHeight,
  setItemMoveNavigatorBarHeight,
} from "../../redux/features/item/itemMoveNavigatorSlice";
import { resetItemControl } from "../../redux/features/item/itemControlSlice";
import { getMouseDownIndex } from "../../redux/features/item/itemSelectModeSlice";

const LeftSideBar = () => {
  const dispatch = useAppDispatch();
  const $nameRef = useRef<HTMLInputElement>(null);
  const $typeRef = useRef<HTMLSelectElement>(null);
  const itemMoveNavigatorBarHeight = useAppSelector(
    getItemMoveNavigatorBarHeight
  );
  const isOnDrag = useAppSelector(getIsOnDrag);
  const mouseDownIndex = useAppSelector(getMouseDownIndex);

  useEffect(() => {
    if (isOnDrag === false || mouseDownIndex === -1 ) {
      dispatch(setItemMoveNavigatorBarHeight(-1));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnDrag, mouseDownIndex]);

  const handleClick = () => {
    dispatch(setItems([]));
  };
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!$nameRef.current || !$typeRef.current) {
      return;
    }
    const item: Item = {
      name: $nameRef.current?.value,
      type: $typeRef.current?.value as ItemType,
    };

    addItem(JSON.stringify(item));
  };
  return (
    <div className="w-full h-full">
      <div className="flex flex-col h-full p-2">
        <section>
          <button className="w-full mb-2 bg-green-600 rounded">
            <p
              className="text-white"
              onClick={handleClick}>
              아이템 리셋
            </p>
          </button>
        </section>
        <section className="border p-2">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="input-name">
                <p className="text-white w-full">이름</p>
              </label>
              <input
                ref={$nameRef}
                id="input-name"
                name="name"
                className="indent-2 mb-1 p-0.5 w-full"
                placeholder="이름"
              />
            </div>
            <div>
              <label>
                <p className="text-white">타입</p>
              </label>
              <select
                ref={$typeRef}
                name="type"
                className="indent-2 mb-1 p-0.5 w-full">
                <option value="cube">사각형</option>
                <option value="triangle">삼각형</option>
                <option value="circle">원형</option>
              </select>
            </div>
            <div className="flex pr-0.5">
              <button
                type="submit"
                className="mt-1 ml-auto px-3 py-0.5 bg-green-700 rounded-lg">
                <p className="text-white">추가</p>
              </button>
            </div>
          </form>
        </section>
        <section
          className="flex flex-col grow"
          onClick={(e) => {
            console.log(e.currentTarget);
            dispatch(resetItemControl());
          }}>
          <ItemList />
        </section>
      </div>
      <div
        className={`fixed w-[222px] left-2 border-2 border-teal-200 ${
          itemMoveNavigatorBarHeight < 0 ? "hidden" : ""
        }`}
        style={{
          top: `${itemMoveNavigatorBarHeight}px`,
        }}></div>
    </div>
  );
};

export default LeftSideBar;
