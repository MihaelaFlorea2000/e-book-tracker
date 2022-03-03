import {makeAutoObservable, runInAction} from "mobx";
import {BookInterface, UserInterface} from "../config/interfaces";
import axiosConfig from "../config/axiosConfig";

export default class BooksStore {

    private books: BookInterface[] | undefined = undefined

    private requested: boolean = false;

    public constructor() {
        makeAutoObservable(this);
    }

    // Get current user's books
    public getBooks(): BookInterface[] | undefined {
        if (this.books === undefined) {
            this.requestBooks();

            return undefined;
        } else {
            return this.books;
        }
    }

    // Request current user books
    public requestBooks() {
        if (!this.requested) {
            runInAction(() => {
                this.requested = true;
            })
        } else {
            return;
        }

        axiosConfig().get('/pg/books').then(data => {
            runInAction(() => {
                this.books = data.data;
                this.requested = false
            })
        })
    }

    public sortBooks() {
        if (this.books) {
            this.books = this.books.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
        }
    }
}
