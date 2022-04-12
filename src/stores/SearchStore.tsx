import {makeAutoObservable, runInAction} from "mobx";
import {
    SimpleBookInterface,
    SimpleUserInterface
} from "../utils/helpers/interfaces";
import axiosConfig from "../utils/helpers/axiosConfig";
import axios from "axios";

/**
 * Class for managing searching within the app
 */
export default class SearchStore {

    // Results can be users, book from the current
    // user or books from the Google Books API
    private users: SimpleUserInterface[] | undefined = undefined;
    private books: SimpleBookInterface[] | undefined = undefined;
    private googleBooks: SimpleBookInterface[] | undefined = undefined;

    // Search query
    private query: string = '';

    public constructor() {
        makeAutoObservable(this);
    }

    // Search the app
    public requestSearch() {
        axiosConfig().get(`/search?query=${this.query}`).then(data => {
            runInAction(() => {
                this.users = data.data.users;
                this.books = data.data.books;
            })
        })
    }

    // Search Google Books
    public requestGoogleSearch() {
        if (this.query === '') {
            runInAction(() => {
                this.googleBooks = [];
            })
            return;
        }

        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${this.query}&langRestrict=en&&maxResults=5`).then(data => {
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
                this.googleBooks = newBooks;
            })
        })
    }

    // Set user query
    public setQuery(query:string) {
        runInAction(() => {
            this.query = query;
        })
    }

    // Get current user's books that match query
    public getBooks(): SimpleBookInterface[] | undefined {
        if (this.books === undefined) {
            this.requestSearch();

            return undefined;
        } else {
            return this.books;
        }
    }

    // Get users that match query
    public getUsers(): SimpleUserInterface[] | undefined {
        if (this.users === undefined) {
            this.requestSearch();

            return undefined;
        } else {
            return this.users;
        }
    }

    // Get Google Books that match query
    public getGoogleBooks():SimpleBookInterface[] | undefined {
        if (this.googleBooks === undefined) {
            this.requestGoogleSearch();

            return undefined;
        } else {
            return this.googleBooks;
        }
    }
}
