import {makeAutoObservable, runInAction} from "mobx";
import {BookInterface} from "../config/interfaces";
import axiosConfig from "../config/axiosConfig";

export default class BookStore {

    private book: BookInterface | undefined = undefined

    private requested: boolean = false;

    public constructor() {
        makeAutoObservable(this);
    }

    // Get current user's books
    public getBook(bookId:number): BookInterface | undefined {
        if (this.book === undefined || this.book.id !== bookId) {
            this.requestBook(bookId);

            return undefined;
        } else {
            return this.book;
        }
    }

    // Request current user books
    public requestBook(bookId:number) {
        if (!this.requested) {
            runInAction(() => {
                this.requested = true;
            })
        } else {
            return;
        }

        axiosConfig().get(`/pg/books/${bookId}`).then(data => {
            runInAction(() => {
                this.book = data.data;
                this.requested = false;
            })
        })
    }

    public resetBook() {
        this.book = undefined;
    }
}
