import { useEffect, useState } from "react";
import { Item, ItemType } from "../Layouts/LeftSideBar";

type ItemListBarProps = Item;
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

type MouseOn = (typeof MOUSE_ON)[keyof typeof MOUSE_ON];
type BorderColor = (typeof BORDER_COLOR)[keyof typeof BORDER_COLOR];

const ItemListBar = ({ name, type }: ItemListBarProps) => {
  const [mouseOn, setMouseOn] = useState<MouseOn>(MOUSE_ON.NONE);
  const [borderColor, setBorderColor] = useState<BorderColor>(
    BORDER_COLOR.NONE
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
  return (
    <article
      className={`flex gap-2 p-0.5 bg-green-800 ${borderColor}`}
      onMouseMove={(e) => {
        const barHeight = e.currentTarget.offsetHeight;
        const mouseY = e.nativeEvent.offsetY;

        if (mouseY < barHeight / 2) {
          setMouseOn("top");
          return;
        }
        setMouseOn("bottom");
      }}
      onMouseLeave={() => {
        setMouseOn("none");
      }}>
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
