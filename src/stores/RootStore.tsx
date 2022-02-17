import { createContext, useContext } from "react";
import ReadStore from "./ReadStore";

interface Store {
    readStore: ReadStore
}

export const store: Store = {
    readStore: new ReadStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext)
}