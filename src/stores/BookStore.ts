import {makeAutoObservable, runInAction} from "mobx";
import {BookInterface, ReadInterface} from "../utils/helpers/interfaces";
import axiosConfig from "../utils/helpers/axiosConfig";
import axios from "axios";

/**
 * Class for managing state of a single book
 */
export default class BookStore {

    // Book uploaded by the user on the app
    private book: BookInterface | undefined = undefined;

    // Book from the Google Books API
    private APIBook: BookInterface | undefined = undefined;

    // Book reads
    private reads: ReadInterface[] | undefined = undefined;

    // Whether the current user owns this book
    private owner: boolean = false;

    private requestedBook: boolean = false;
    private requestedAPIBook: boolean = false;
    private requestedReads: boolean = false;


    public constructor() {
        makeAutoObservable(this);
    }

    // Get a book by id
    public getBook(bookId:number): BookInterface | undefined {
        if (this.book === undefined || this.book.id !== bookId) {
            this.requestBook(bookId);
            this.requestReads(bookId);

            return undefined;
        } else {
            return this.book;
        }
    }

    // Request current a book by id from backend
    public requestBook(bookId:number) {
        if (!this.requestedBook) {
            runInAction(() => {
                this.requestedBook = true;
            })
        } else {
            return;
        }

        axiosConfig().get(`/books/${bookId}`).then(data => {
            runInAction(() => {
                this.book = data.data;
                this.requestedBook = false;
            })
        })
    }

    // Get a book by id from Google Book API
    public getAPIBook(bookId:string): BookInterface | undefined {
        if (this.APIBook === undefined || this.APIBook.id === undefined || this.APIBook.id.toString() !== bookId) {
            this.requestAPIBook(bookId);

            return undefined;
        } else {
            return this.APIBook;
        }
    }

    // Request a book by id from Google Book API
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

            // Format data to fit BookInterface
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

    // Reset book
    public resetBook() {
        this.book = undefined;
    }

    // Get a book's reads
    public getReads(bookId:number): ReadInterface[] | undefined {
        if (this.reads === undefined) {
            this.requestReads(bookId);

            return undefined;
        } else {
            return this.reads;
        }
    }

    // Request a book's reads from API
    public requestReads(bookId:number) {
        if (!this.requestedReads) {
            runInAction(() => {
                this.requestedReads = true;
            })
        } else {
            return;
        }

        axiosConfig().get(`/reads/${bookId}`).then(data => {
            runInAction(() => {
                this.reads = data.data;
                this.requestedReads = false;
            })
        })
    }

    // Is the user the book owner?
    public isOwner():boolean {
        return this.owner;
    }

    // Update whether the user is the owner of the book
    public setIsOwner(owner:boolean) {
        runInAction(() => {
            this.owner = owner;
        })
    }
}
