import {makeAutoObservable, runInAction} from "mobx";
import {
    SimpleBookInterface,
    SimpleUserInterface
} from "../config/interfaces";
import axiosConfig from "../config/axiosConfig";
import axios from "axios";

export default class SearchStore {

    private users: SimpleUserInterface[] | undefined = undefined;
    private books: SimpleBookInterface[] | undefined = undefined;
    private googleBooks: SimpleBookInterface[] | undefined = undefined;
    private query: string = '';

    private requestedSearch:boolean = false;
    private requestedGoogleSearch:boolean = false;

    public constructor() {
        makeAutoObservable(this);
    }

    public requestSearch() {
        axiosConfig().get(`/pg/search?query=${this.query}`).then(data => {
            runInAction(() => {
                this.users = data.data.users;
                this.books = data.data.books;
            })
        })
    }

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

    public getQuery():string {
        return this.query;
    }

    public setQuery(query:string) {
        runInAction(() => {
            this.query = query;
        })
    }

    public getBooks(): SimpleBookInterface[] | undefined {
        if (this.books === undefined) {
            this.requestSearch();

            return undefined;
        } else {
            return this.books;
        }
    }

    public getUsers(): SimpleUserInterface[] | undefined {
        if (this.users === undefined) {
            this.requestSearch();

            return undefined;
        } else {
            return this.users;
        }
    }

    public getGoogleBooks():SimpleBookInterface[] | undefined {
        if (this.googleBooks === undefined) {
            this.requestGoogleSearch();

            return undefined;
        } else {
            return this.googleBooks;
        }
    }
}
