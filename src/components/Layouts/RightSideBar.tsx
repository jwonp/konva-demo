import { useEffect, useSyncExternalStore } from "react";
import {
  Item,
  ItemType,
  addItem,
  store as itemStore,
} from "../../storage/item";
import { useAppDispatch } from "@/redux/hooks";
import { setItems } from "@/redux/features/item/itemSlice";
const RightSideBar = () => {
  const dispatch = useAppDispatch();
  const stringifiedItems = useSyncExternalStore(
    itemStore.subscribe,
    itemStore.getSnapshot
  );

  useEffect(() => {
    const newItems = (JSON.parse(stringifiedItems) as Item[]).filter(
      (item) => item.name && item.type
    );

    dispatch(setItems(newItems));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stringifiedItems]);
  <div className="w-full h-full">
    <div className="flex flex-col h-full p-2"></div>
  </div>;
};
export default RightSideBar;
