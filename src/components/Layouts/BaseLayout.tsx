import LeftSideBar from "../../components/Layouts/LeftSideBar";
import { useEffect, useSyncExternalStore } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Item, store as itemStore } from "../../storage/item";
import { getItems, setItems } from "../../redux/features/item/itemSlice";
type BaseLayoutProps = {
  children: React.ReactNode;
};
const BaseLayout = ({ children }: BaseLayoutProps) => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(getItems);
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

  useEffect(() => {
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "items",
        newValue: JSON.stringify(items),
      })
    );
  }, [items]);

  return (
    <div className="w-full h-full">
      <nav className=" bg-green-950 h-12">
        <div className="flex gap-2 p-2">
          <div>
            <a href="/">
              <img
                src="logo192.png"
                alt=""
                width={32}
                height={32}
              />
            </a>
          </div>
          <div>
            <a href="/assets">
              <p className="text-white hover:text-green-500 leading-8 ">
                Assets
              </p>
            </a>
          </div>
        </div>
      </nav>
      <div className="flex w-screen h-[calc(100%-3rem)]">
        <aside className="w-[240px] min-w-[240px] h-full border">
          <LeftSideBar />
        </aside>
        <main className="w-[calc(100%-480px)] h-full border">{children}</main>
        <aside className="w-[240px] min-w-[240px] h-full border"></aside>
      </div>
    </div>
  );
};

export default BaseLayout;
