import { useEffect, useRef, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  getMouseDownIndex,
  setMouseDownIndex,
} from "../../redux/features/item/itemSelectModeSlice";
import { Item, ItemType } from "../../storage/item";
import {
  getMoveToIndex,
  getSelectedItemIndexs,
  setMoveToIndex,
  setFocusedItemIndex,
  setSelectedItemIndexByModifierKey,
  getFocusedItemIndex,
  getDragEventClearId,
  setDragEventClearId,
  setIsOnDrag,
  getIsOnDrag,
  getItemListScrollTop,
} from "../../redux/features/item/itemControlSlice";

import { getPressedModifierKey } from "../../utils/keyEventHandler";
import { setItemMoveNavigatorBarHeight } from "../../redux/features/item/itemMoveNavigatorSlice";
import {
  getItems,
  setItems,
  setItemsAndSave,
} from "../../redux/features/item/itemSlice";

interface ItemListBarProps extends Item {
  index: number;
}
type IconType = {
  [key in ItemType]: string;
};

const icon: IconType = {
  triangle: "/icons/triangle.svg",
  cube: "/icons/cube.svg",
  circle: "/icons/circle.svg",
};

const SELECTED_COLOR = {
  SELECTED: "bg-slate-500",
  NONE: "",
} as const;

type SelectedColor = (typeof SELECTED_COLOR)[keyof typeof SELECTED_COLOR];

const ItemListBar = ({ name, type, index }: ItemListBarProps) => {
  const dispatch = useAppDispatch();
  const $ListBarRef = useRef<HTMLDivElement>(null);
  const $inputRef = useRef<HTMLParagraphElement>(null);
  const items = useAppSelector(getItems);
  const focusedItemIndex = useAppSelector(getFocusedItemIndex);
  const selectedItemIndexs = useAppSelector(getSelectedItemIndexs);
  const moveToIndex = useAppSelector(getMoveToIndex);
  const mouseDownIndex = useAppSelector(getMouseDownIndex);
  const isOnDrag = useAppSelector(getIsOnDrag);
  const dragEventClearId = useAppSelector(getDragEventClearId);
  const itemListScrollTop = useAppSelector(getItemListScrollTop);

  const [newItemMoveNavigatorBarHeight, setNewItemMoveNavigatorBarHeight] =
    useState<number>(0);
  const [isContentEditable, setContentEditable] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<SelectedColor>(
    SELECTED_COLOR.NONE
  );

  useEffect(() => {
    // isContentEditable이 되면 focus 되도록 하는 hook
    if ($inputRef) {
      $inputRef.current?.focus();
    }
  }, [isContentEditable]);

  useEffect(() => {
    // 선택된 아이템 배경색 변화 관련 hook
    if (selectedItemIndexs.includes(index)) {
      setSelectedColor(SELECTED_COLOR.SELECTED);
      return;
    }
    setSelectedColor(SELECTED_COLOR.NONE);
  }, [index, selectedItemIndexs]);

  useEffect(() => {
    if ($ListBarRef.current) {
      if (mouseDownIndex === index) {
        dispatch(setItemMoveNavigatorBarHeight(-1));
      }
      if (isOnDrag && moveToIndex === index) {
        dispatch(
          setItemMoveNavigatorBarHeight(
            $ListBarRef.current.offsetTop - itemListScrollTop
          )
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnDrag, itemListScrollTop]);

  const handleMouseDown = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    dispatch(setMouseDownIndex(index));
    const barHeight = e.currentTarget.offsetHeight;
    const mouseY = e.nativeEvent.offsetY;

    const moveToBottom = mouseY >= barHeight / 2 ? 1 : 0;
    dispatch(setMoveToIndex(index + moveToBottom));

    if ($ListBarRef.current) {
      dispatch(
        setItemMoveNavigatorBarHeight(
          $ListBarRef.current.offsetTop +
            $ListBarRef.current.offsetHeight * moveToBottom -
            itemListScrollTop
        )
      );
    }
    if (selectedItemIndexs.includes(index) === false) {
      return;
    }
    const clearId = setTimeout(() => {
      dispatch(setIsOnDrag(true));
    }, 300);
    dispatch(setDragEventClearId(clearId));
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (isOnDrag) {
      console.log({ selectedItemIndexs, mouseDownIndex, index, moveToIndex });

      // dispatch(
      //   setItemMoveNavigatorBarHeight((e.target as HTMLElement).offsetTop)
      // );
    }
    // const moveItemAction: MoveItemActionPayload = {
    //   from: [...selectedItemIndexs],
    //   to: moveToIndex,
    // };

    // dispatch(moveItem(moveItemAction));
    if (dragEventClearId) {
      clearTimeout(dragEventClearId);
      dispatch(setDragEventClearId(null));
    }
    dispatch(setMouseDownIndex(-1));

    dispatch(setIsOnDrag(false));
  };

  const handleMouseClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const pressedKey = getPressedModifierKey(e);

    dispatch(setSelectedItemIndexByModifierKey({ pressedKey, index }));
    dispatch(setFocusedItemIndex(index));
  };
  const handleInputDoubleClick = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    if (focusedItemIndex === index) {
      setContentEditable(true);
    }
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (mouseDownIndex === -1) {
      return;
    }
    if (isOnDrag) {
      const barHeight = e.currentTarget.offsetHeight;
      const mouseY = e.nativeEvent.offsetY;

      const moveToBottom = mouseY >= barHeight / 2 ? 1 : 0;
      dispatch(setMoveToIndex(index + moveToBottom));

      if ($ListBarRef.current) {
        dispatch(
          setItemMoveNavigatorBarHeight(
            $ListBarRef.current.offsetTop +
              $ListBarRef.current.offsetHeight * moveToBottom -
              itemListScrollTop
          )
        );
      }
    }
    // const barHeight = e.currentTarget.offsetHeight;
    // const mouseY = e.nativeEvent.offsetY;

    // dispatch(setMoveToIndex(index));
    // if (mouseY < barHeight / 2) {
    //   return;
    // }
  };
  const handleMouseLeave = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {};

  const handleBlur = (e: React.FocusEvent<HTMLElement, Element>) => {
    console.log(items[index]);
    const newItems = [...items];
    if ($inputRef.current) {
      newItems[index] = { name: $inputRef.current.innerText, type };
    }
    dispatch(setItemsAndSave(newItems));
    setContentEditable(false);
  };
  return (
    <article
      ref={$ListBarRef}
      className={`flex gap-2 p-0.5 bg-green-800 select-none ${selectedColor}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={handleMouseClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onBlur={handleBlur}>
      <img
        src={icon[type]}
        alt=""
        width={16}
        height={16}
      />
      <p
        ref={$inputRef}
        className="text-white"
        contentEditable={isContentEditable}
        onDoubleClick={handleInputDoubleClick}
        suppressContentEditableWarning={true}>
        {name}
      </p>
    </article>
  );
};

export default ItemListBar;
