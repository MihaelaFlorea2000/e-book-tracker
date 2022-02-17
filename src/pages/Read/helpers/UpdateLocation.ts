import ReadStore from "../../../stores/ReadStore";
import BookStore from "../../../stores/BookStore";
import {useStore} from "../../../stores/RootStore";

export const updateLocation = async (bookId:number | undefined, readStore:ReadStore) => {
    if (bookId !== undefined) {
        try {
            await readStore.updateLocation(bookId)
            BookStore.requestBook(bookId);
        } catch (err) {
            console.log(err)
        }
    }
}