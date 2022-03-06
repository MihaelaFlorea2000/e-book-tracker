import { createContext, useContext } from "react";
import ReaderStore from "./ReaderStore";
import BooksStore from "./BooksStore";
import BookStore from "./BookStore";
import DeleteStore from "./DeleteStore";
import EditStore from "./EditStore";
import UploadStore from "./UploadStore";
import UserStore from "./UserStore";
import MetricsStore from "./MetricsStore";
import AddReadStore from "./AddReadStore";
import EditReadStore from "./EditReadStore";

interface Store {
    userStore: UserStore,
    uploadStore: UploadStore,
    booksStore: BooksStore,
    bookStore: BookStore,
    addReadStore: AddReadStore,
    editReadStore: EditReadStore,
    readerStore: ReaderStore,
    editStore: EditStore,
    deleteStore: DeleteStore,
    metricsStore: MetricsStore,
}

export const store: Store = {
    userStore: new UserStore(),
    uploadStore: new UploadStore(),
    booksStore: new BooksStore(),
    bookStore: new BookStore(),
    addReadStore: new AddReadStore(),
    editReadStore: new EditReadStore(),
    readerStore: new ReaderStore(),
    editStore: new EditStore(),
    deleteStore: new DeleteStore(),
    metricsStore: new MetricsStore(),
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext)
}