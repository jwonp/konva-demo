import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  getIsMouseDown,
  setMouseDown,
} from "../../redux/features/itemSelectModeSlice";
import { Item, ItemType } from "../../storage/item";
import {
  getMoveToIndex,
  getSelectedItemIndex,
  resetItemControl,
  setMoveToIndex,
  setSelectedItemIndex,
} from "../../redux/features/itemControlSlice";
import {
  MoveItemActionPayload,
  moveItem,
} from "../../redux/features/itemSlice";

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

const MOUSE_ON = {
  TOP: "top",
  BOTTOM: "bottom",
  NONE: "none",
} as const;

const BORDER_COLOR = {
  TOP: "border-t-2 border-t-red-300",
  BOTTOM: "border-b-2 border-b-red-300",
  NONE: "",
} as const;
const SELECTED_COLOR = {
  SELECTED: "bg-slate-500",
  NONE: "",
} as const;

type MouseOn = (typeof MOUSE_ON)[keyof typeof MOUSE_ON];
type BorderColor = (typeof BORDER_COLOR)[keyof typeof BORDER_COLOR];
type SelectedColor = (typeof SELECTED_COLOR)[keyof typeof SELECTED_COLOR];

const ItemListBar = ({ name, type, index }: ItemListBarProps) => {
  const dispatch = useAppDispatch();
  const selectedItemIndex = useAppSelector(getSelectedItemIndex);
  const moveToIndex = useAppSelector(getMoveToIndex);
  const isMouseDown = useAppSelector(getIsMouseDown);
  const [mouseOn, setMouseOn] = useState<MouseOn>(MOUSE_ON.NONE);
  const [borderColor, setBorderColor] = useState<BorderColor>(
    BORDER_COLOR.NONE
  );
  const [selectedColor, setSelectedColor] = useState<SelectedColor>(
    SELECTED_COLOR.NONE
  );

  useEffect(() => {
    if (mouseOn === MOUSE_ON.NONE) {
      setBorderColor(BORDER_COLOR.NONE);
      return;
    }
    if (mouseOn === MOUSE_ON.TOP) {
      setBorderColor(BORDER_COLOR.TOP);
      return;
    }
    if (mouseOn === MOUSE_ON.BOTTOM) {
      setBorderColor(BORDER_COLOR.BOTTOM);
      return;
    }
  }, [mouseOn]);

  useEffect(() => {
    if (index === selectedItemIndex) {
      setSelectedColor(SELECTED_COLOR.SELECTED);
      return;
    }
    setSelectedColor(SELECTED_COLOR.NONE);
  }, [index, selectedItemIndex]);

  const handleMouseDown = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    dispatch(setMouseDown(true));
  };
  const handleMouseUp = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const moveItemAction: MoveItemActionPayload = {
      from: [selectedItemIndex],
      to: moveToIndex,
    };

    dispatch(moveItem(moveItemAction));
    dispatch(setSelectedItemIndex(moveToIndex));
    dispatch(setMouseDown(false));
    setMouseOn(MOUSE_ON.NONE);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (isMouseDown === false) {
      return;
    }

    const barHeight = e.currentTarget.offsetHeight;
    const mouseY = e.nativeEvent.offsetY;

    dispatch(setMoveToIndex(index));
    if (mouseY < barHeight / 2) {
      setMouseOn("top");
      return;
    }

    setMouseOn("bottom");
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    dispatch(resetItemControl());
    setMouseOn("none");
  };

  const handleMouseClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    dispatch(setSelectedItemIndex(index));
  };

  return (
    <article
      className={`flex gap-2 p-0.5 bg-green-800 select-none ${borderColor} ${selectedColor}`}
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleMouseClick}>
      <img
        src={icon[type]}
        alt=""
        width={16}
        height={16}
      />
      <p className="text-white">{name}</p>
    </article>
  );
};

export default ItemListBar;
