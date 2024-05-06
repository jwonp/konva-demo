import {
  useEffect,
  useRef,
  useSyncExternalStore,
} from "react";
import {
  Item,
  ItemType,
  addItem,
  store as itemStore,
} from "../../storage/item";
import { useAppDispatch } from "../../redux/hooks";
import { setItems } from "../../redux/features/itemSlice";
import ItemList from "../LeftSideBar/ItemList";

const LeftSideBar = () => {
  const dispatch = useAppDispatch();

  const $nameRef = useRef<HTMLInputElement>(null);
  const $typeRef = useRef<HTMLSelectElement>(null);
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

  return (
    <div className="w-full h-full">
      <div className="flex flex-col h-full p-2">
        <section>
          <button className="w-full mb-2 bg-green-600 rounded">
            <p
              className="text-white"
              onClick={() => {
                window.localStorage.setItem("items", JSON.stringify([]));
                window.dispatchEvent(
                  new StorageEvent("storage", {
                    key: "items",
                    newValue: JSON.stringify([]),
                  })
                );
              }}>
              아이템 리셋
            </p>
          </button>
        </section>
        <section className="border p-2">
          <form
            onSubmit={(e: React.SyntheticEvent) => {
              e.preventDefault();

              if (!$nameRef.current || !$typeRef.current) {
                return;
              }
              const item: Item = {
                name: $nameRef.current?.value,
                type: $typeRef.current?.value as ItemType,
              };

              addItem(JSON.stringify(item));
            }}>
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
        <section className="flex flex-col grow">
          <ItemList />
        </section>
      </div>
    </div>
  );
};

export default LeftSideBar;
