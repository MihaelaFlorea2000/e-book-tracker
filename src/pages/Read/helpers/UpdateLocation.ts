import ReadStore from "../../../stores/ReadStore";
import BookStore from "../../../stores/BookStore";

// Send last location to backend
export const updateLocation = async (bookId:number | undefined) => {
    if (bookId !== undefined) {
        try {
            await ReadStore.updateLocation(bookId)
            BookStore.requestBook(bookId);
        } catch (err) {
            console.log(err)
        }
    }
}