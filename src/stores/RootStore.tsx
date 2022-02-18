import { createContext, useContext } from "react";
import ReadStore from "./ReadStore";
import BooksStore from "./BooksStore";
import BookStore from "./BookStore";
import DeleteStore from "./DeleteStore";
import EditStore from "./EditStore";
import UploadStore from "./UploadStore";
import UserStore from "./UserStore";

interface Store {
    userStore: UserStore,
    uploadStore: UploadStore,
    booksStore: BooksStore,
    bookStore: BookStore,
    readStore: ReadStore,
    editStore: EditStore,
    deleteStore: DeleteStore,
}

export const store: Store = {
    userStore: new UserStore(),
    uploadStore: new UploadStore(),
    booksStore: new BooksStore(),
    bookStore: new BookStore(),
    readStore: new ReadStore(),
    editStore: new EditStore(),
    deleteStore: new DeleteStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext)
}