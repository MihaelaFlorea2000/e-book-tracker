import {makeAutoObservable, runInAction} from "mobx";
import {BookInterface, ReadInterface, SessionInterface} from "../config/interfaces";
import axiosConfig from "../config/axiosConfig";

export default class BookStore {

    private book: BookInterface | undefined = undefined;
    private reads: ReadInterface[] | undefined = undefined;
    private sessions: SessionInterface[] | undefined;

    private requestedBook: boolean = false;
    private requestedReads: boolean = false;
    private requestedSessions: boolean = false;


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
    public getReads(bookId:number): ReadInterface[] | undefined {
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

        axiosConfig().get(`/pg/reads/${bookId}`).then(data => {
            runInAction(() => {
                this.reads = data.data;
                this.requestedReads = false;
            })
        })
    }

    // Sessions
    // Get current user's books
    public getSessions(readId:number): SessionInterface[] | undefined {
        if (this.sessions === undefined) {
            this.requestSessions(readId);

            return undefined;
        } else {
            return this.sessions;
        }
    }

    // Request current user books
    public requestSessions(readId:number) {
        if (!this.requestedSessions) {
            runInAction(() => {
                this.requestedSessions = true;
            })
        } else {
            return;
        }

        axiosConfig().get(`/pg/sessions/${readId}`).then(data => {
            runInAction(() => {
                this.sessions = data.data;
                this.requestedSessions = false;
            })
        })
    }
}
