import {makeAutoObservable, runInAction} from "mobx";
import {BookInterface, BookReadInterface} from "../config/interfaces";
import axiosConfig from "../config/axiosConfig";

export default class BookStore {

    private book: BookInterface | undefined = undefined;
    private reads: BookReadInterface[] | undefined = undefined;

    private requestedBook: boolean = false;
    private requestedReads: boolean = false;


    public constructor() {
        makeAutoObservable(this);
    }

    // Get current user's books
    public getBook(bookId:number): BookInterface | undefined {
        if (this.book === undefined || this.book.id !== bookId) {
            this.requestBook(bookId);
            this.requestReads(bookId);

            return undefined;
        } else {
            return this.book;
        }
    }

    // Request current user books
    public requestBook(bookId:number) {
        if (!this.requestedBook) {
            runInAction(() => {
                this.requestedBook = true;
            })
        } else {
            return;
        }

        axiosConfig().get(`/pg/books/${bookId}`).then(data => {
            runInAction(() => {
                this.book = data.data;
                this.requestedBook = false;
            })
        })
    }

    public resetBook() {
        this.book = undefined;
    }

    // Get current user's books
    public getReads(bookId:number): BookReadInterface[] | undefined {
        if (this.reads === undefined) {
            this.requestReads(bookId);

            return undefined;
        } else {
            return this.reads;
        }
    }

    // Request current user books
    public requestReads(bookId:number) {
        if (!this.requestedReads) {
            runInAction(() => {
                this.requestedReads = true;
            })
        } else {
            return;
        }

        axiosConfig().get(`/pg/books/${bookId}/reads`).then(data => {
            runInAction(() => {
                this.reads = data.data;
                this.requestedReads = false;
            })
        })
    }
}
