import {makeAutoObservable, runInAction, toJS} from "mobx";
import {BookInterface, ReadInterface, SimpleBookInterface} from "../config/interfaces";
import axiosConfig from "../config/axiosConfig";
import axios from "axios";

export default class BookStore {

    private book: BookInterface | undefined = undefined;
    private APIBook: BookInterface | undefined = undefined;
    private reads: ReadInterface[] | undefined = undefined;
    private owner: boolean = false;

    private requestedBook: boolean = false;
    private requestedAPIBook: boolean = false;
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

    // Get current user's books
    public getAPIBook(bookId:string): BookInterface | undefined {
        if (this.APIBook === undefined || this.APIBook.id === undefined || this.APIBook.id.toString() !== bookId) {
            this.requestAPIBook(bookId);

            return undefined;
        } else {
            return this.APIBook;
        }
    }

    // Request current user books
    public requestAPIBook(bookId:string) {
        if (!this.requestedAPIBook) {
            runInAction(() => {
                this.requestedAPIBook = true;
            })
        } else {
            return;
        }

        axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`).then(data => {

            const volumeInfo = data.data.volumeInfo

            const book:BookInterface = {
                id: data.data.id,
                userId: data.data.id,
                title: volumeInfo.title,
                authors: volumeInfo.authors ? volumeInfo.authors : [],
                description: volumeInfo.description ? volumeInfo.description : '' ,
                coverImage: volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : null,
                tags: volumeInfo.categories ? volumeInfo.categories : [],
                publisher: volumeInfo.publisher ? volumeInfo.publisher : '',
                pubDate: volumeInfo.publishedDate ? volumeInfo.publishedDate : '',
                language: volumeInfo.language ? volumeInfo.language : '',
                rating: volumeInfo.averageRating ? volumeInfo.averageRating : 0,
                file: '',
                fileName: '',
                series: volumeInfo.subtitle ? volumeInfo.subtitle : '',
                location: '',
                link: volumeInfo.previewLink
            }

            runInAction(() => {
                this.APIBook = book;
                this.requestedAPIBook = false;
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

    // Is the user highlighting something?
    public isOwner():boolean {
        return this.owner;
    }

    public setIsOwner(owner:boolean) {
        runInAction(() => {
            this.owner = owner;
        })
    }
}
