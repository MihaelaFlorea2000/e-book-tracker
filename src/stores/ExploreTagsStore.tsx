import {makeAutoObservable, runInAction, toJS} from "mobx";
import {SimpleBookInterface} from "../config/interfaces";
import axios from "axios";

export default class ExploreTagsStore {

    private books: SimpleBookInterface[] | undefined = undefined

    private requested: boolean = false;

    public constructor() {
        makeAutoObservable(this);
    }

    // Get current user's books
    public getBooks(tags:string[]): SimpleBookInterface[] | undefined {
        if (this.books === undefined) {
            this.requestBooks(tags);

            return undefined;
        } else {
            return this.books;
        }
    }

    // Request current user books
    public requestBooks(tags:string[]) {
        if (!this.requested) {
            runInAction(() => {
                this.books = []
                this.requested = true;
            })
        } else {
            return;
        }


        for (const tag of tags) {
            axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:${tag}&langRestrict=en&download=epub&orderBy=newest&maxResults=5`).then(data => {

                if (data.data.totalItems > 0) {
                    for (const row of data.data.items) {

                        const book = {
                            id: row.id,
                            title: row.volumeInfo.title,
                            coverImage: row.volumeInfo.imageLinks ? row.volumeInfo.imageLinks.thumbnail : null
                        }

                        if (this.books) {
                            this.books.push(book)
                        }
                    }
                }
            })
        }

        runInAction(() => {
            this.requested = false;
        })
    }
}
