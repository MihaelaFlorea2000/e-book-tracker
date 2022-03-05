import { createContext, useContext } from "react";
import ReaderStore from "./ReaderStore";
import BooksStore from "./BooksStore";
import BookStore from "./BookStore";
import DeleteStore from "./DeleteStore";
import EditStore from "./EditStore";
import UploadStore from "./UploadStore";
import UserStore from "./UserStore";
import ReadStore from "./ReadStore";
import MetricsStore from "./MetricsStore";
import AddReadStore from "./AddReadStore";

interface Store {
    userStore: UserStore,
    uploadStore: UploadStore,
    booksStore: BooksStore,
    bookStore: BookStore,
    readStore: ReadStore,
    addReadStore: AddReadStore,
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
    readStore: new ReadStore(),
    addReadStore: new AddReadStore(),
    readerStore: new ReaderStore(),
    editStore: new EditStore(),
    deleteStore: new DeleteStore(),
    metricsStore: new MetricsStore(),
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext)
}