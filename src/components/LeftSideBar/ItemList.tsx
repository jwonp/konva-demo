import { useMemo } from "react";
import ItemListBar from "./ItemListBar";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getItems } from "../../redux/features/item/itemSlice";
import { setItemListScrollTop } from "../../redux/features/item/itemControlSlice";

const ItemList = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(getItems);

  const itemList = useMemo(() => {
    return items.map((item, index) => (
      <ItemListBar
        key={`item-${item.name}`}
        index={index}
        name={item.name}
        type={item.type}
      />
    ));
  }, [items]);
  const handleClickOnItemList = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {};
  return (
    <>
      <div>
        <p className="mt-2 mb-1 text-white font-bold border-b ">아이템 목록</p>
      </div>
      <div
        className="grow  overflow-x-hidden"
        onClick={handleClickOnItemList}>
        <div
          className="h-[400px] overflow-y-scroll hover:overflow-y-scroll"
          onScroll={(e) => {
            dispatch(setItemListScrollTop((e.target as HTMLElement).scrollTop));
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}>
          {itemList}
        </div>
      </div>
    </>
  );
};

export default ItemList;
