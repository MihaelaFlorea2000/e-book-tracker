import {makeAutoObservable, runInAction} from "mobx";
import {
    SimpleBookInterface,
    SimpleUserInterface
} from "../config/interfaces";
import axiosConfig from "../config/axiosConfig";

export default class SearchStore {

    private users: SimpleUserInterface[] | undefined = undefined;
    private books: SimpleBookInterface[] | undefined = undefined;


    public constructor() {
        makeAutoObservable(this);
    }

    public requestSearch(query:string) {
        axiosConfig().get(`/pg/search?query=${query}`).then(data => {
            runInAction(() => {
                this.users = data.data.users;
                this.books = data.data.books;
            })
        })
    }

    public getUsers():SimpleUserInterface[] | undefined {
        return this.users;
    }

    public getBooks():SimpleBookInterface[] | undefined {
        return this.books;
    }
}
