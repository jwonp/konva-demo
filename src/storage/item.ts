export type ItemType = "triangle" | "cube" | "circle";
export type Item = {
  name: string;
  type: ItemType;
};
export const store = {
    getSnapshot: () => window.localStorage.getItem("items") ?? JSON.stringify([]),
  
    subscribe: (listener: () => void) => {
      window.addEventListener("storage", listener);
      return () => void window.removeEventListener("storage", listener);
    },
  };

export const addItem = (stringifiedItem: string) => {
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