import ReadStore from "../../../stores/ReadStore";
import BookStore from "../../../stores/BookStore";

// Send last location to backend
export const updateLocation = async (bookId:number | undefined, readStore:ReadStore, bookStore:BookStore) => {
    if (bookId !== undefined) {
        try {
            await readStore.updateLocation(bookId)
            bookStore.requestBook(bookId);
        } catch (err) {
            console.log(err)
        }
    }
}