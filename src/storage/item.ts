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

// export const pushItemOnArray = <T=any>(arr:T[],item:T|T[],propertyKeyToPreventDuplicated:string):T[] =>{
//   const property =  propertyKeyToPreventDuplicated;

//   if (Array.isArray(item)) {

//     const duplicatedItem = arr.filter(
//       (arr) =>
//       {
//         const
//         // item.find((item) => item[property] === arr[property]) !== undefined
//         return 1;
//       }
//     );
//     if (duplicatedItem === undefined) {
//       arr.concat(item);
//     }
//   } else {
//     const duplicatedItem = arr.find(
//       (el) => el[property] === item[property]
//     );
//     if (duplicatedItem === undefined) {
//       arr.push(item);
//     }
//   }

//   const newItems = [...arr];
//   return newItems
// }
export const setNewItems = (stringifiedItem: string) => {
  const newItems = JSON.parse(stringifiedItem) as Item[];
  window.localStorage.setItem("items", JSON.stringify(newItems));

  window.dispatchEvent(
    new StorageEvent("storage", {
      key: "items",
      newValue: JSON.stringify(newItems),
    })
  );
};
export const addItem = (stringifiedItem: string) => {
  const storedStringifiedItems =
    window.localStorage.getItem("items") ?? JSON.stringify([]);

  const storedItems = JSON.parse(storedStringifiedItems) as Item[];
  const item = JSON.parse(stringifiedItem) as Item | Item[];

  if (Array.isArray(item)) {
    const duplicatedItem = storedItems.filter(
      (storedItem) =>
        item.find((item) => item.name === storedItem.name) !== undefined
    );
    if (duplicatedItem === undefined) {
      storedItems.concat(item);
    }
  } else {
    const duplicatedItem = storedItems.find(
      (storedItem) => storedItem.name === item.name
    );
    if (duplicatedItem === undefined) {
      storedItems.push(item);
    }
  }

  const newItems = [...storedItems];

  window.localStorage.setItem("items", JSON.stringify(newItems));

  window.dispatchEvent(
    new StorageEvent("storage", {
      key: "items",
      newValue: JSON.stringify(newItems),
    })
  );
};
