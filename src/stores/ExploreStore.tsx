import {makeAutoObservable, runInAction} from "mobx";
import {SimpleBookInterface} from "../utils/helpers/interfaces";
import axios from "axios";

/**
 * Class for managing state on the Explore page
 * (book recommendations)
 */
export default class ExploreStore {

    private books: SimpleBookInterface[] | undefined = undefined

    private requested: boolean = false;

    private genre: string

    public constructor(genre: string) {
        makeAutoObservable(this);

        this.genre = genre;
    }

    // Get book recommendations
    public getBooks(): SimpleBookInterface[] | undefined {
        if (this.books === undefined) {
            this.requestBooks();

            return undefined;
        } else {
            return this.books;
        }
    }

    // Request book recommendations from
    // Google Books API by genre
    public requestBooks() {
        if (!this.requested) {
            runInAction(() => {
                this.requested = true;
            })
        } else {
            return;
        }

        axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:${this.genre}&langRestrict=en&download=epub&orderBy=newest&maxResults=5`).then(data => {
            const newBooks:SimpleBookInterface[] = [];

            for (const row of data.data.items) {

                const book = {
                    id: row.id,
                    title: row.volumeInfo.title,
                    coverImage: row.volumeInfo.imageLinks ? row.volumeInfo.imageLinks.thumbnail : null
                }

                newBooks.push(book);
            }

            runInAction(() => {
                this.books = newBooks;
                this.requested = false;
            })
        })
    }
}
