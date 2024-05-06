import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import ItemListBar from "../LeftSideBar/ItemListBar";

export type ItemType = "triangle" | "cube" | "circle";
export type Item = {
  name: string;
  type: ItemType;
};

const addItem = (stringifiedItem: string) => {
  const storedStringifiedItems =
    window.localStorage.getItem("items") ?? JSON.stringify([]);

  const storedItems = JSON.parse(storedStringifiedItems) as Item[];
  const item = JSON.parse(stringifiedItem) as Item;

  const duplicatedItem = storedItems.find(
    (storedItem) => storedItem.name === item.name
  );
  if (duplicatedItem === undefined) {
    storedItems.push(item);
  }

  window.localStorage.setItem("items", JSON.stringify(storedItems));

  window.dispatchEvent(
    new StorageEvent("storage", {
      key: "items",
      newValue: stringifiedItem,
    })
  );
};

const store = {
  getSnapshot: () => window.localStorage.getItem("items") ?? JSON.stringify([]),

  subscribe: (listener: () => void) => {
    window.addEventListener("storage", listener);
    return () => void window.removeEventListener("storage", listener);
  },
};

const LeftSideBar = () => {
  const [selectedItem, setSelectedItem] = useState<number>(-1);
  const [items, setItems] = useState<Item[]>([]);
  const $nameRef = useRef<HTMLInputElement>(null);
  const $typeRef = useRef<HTMLSelectElement>(null);
  const stringifiedItems = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot
  );
  const itemList = useMemo(() => {
    return items.map((item) => (
      <ItemListBar
        key={`item-${item.name}`}
        name={item.name}
        type={item.type}
      />
    ));
  }, [items]);

  useEffect(() => {
    setItems(() => {
      const items = JSON.parse(stringifiedItems) as Item[];
      return items.filter((item) => item.name && item.type);
    });
  }, [stringifiedItems]);

  return (
    <div className="w-full h-full">
      <div className="p-2">
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
        <section>
          <div>
            <p className="mt-2 mb-1 text-white font-bold border-b ">
              아이템 목록
            </p>
          </div>
          <div>{itemList}</div>
        </section>
      </div>
    </div>
  );
};

export default LeftSideBar;
