import {makeAutoObservable, runInAction} from "mobx";
import axiosConfig from "../config/axiosConfig";
import {
    SimpleBookInterface,
    GoalsInterface,
    NumbersInterface,
    UserInterface
} from "../config/interfaces";

export default class ProfileStore {

    private id: number;
    private user: UserInterface | undefined = undefined;
    private goals: GoalsInterface | undefined = undefined;
    private numbers: NumbersInterface | undefined = undefined;
    private books: SimpleBookInterface[] | undefined = undefined

    private requestedUser: boolean = false;
    private requestedGoals: boolean = false;
    private requestedNumbers: boolean = false;
    private requestedBooks: boolean = false;

    public constructor(id: number) {
        makeAutoObservable(this);

        this.id = id;
    }

    // Get current user information
    public getUser(): UserInterface | undefined {
        if (this.user === undefined) {
            this.requestUser();

            return undefined;
        } else {
            return this.user;
        }
    }

    // Request current user information from the API
    public requestUser() {
        if (!this.requestedUser) {
            runInAction(() => {
                this.requestedUser = true;
            })
        } else {
            return;
        }

        axiosConfig().get(`/pg/users/${this.id}`).then(data => {
            runInAction(() => {
                this.user = data.data;
                this.requestedUser = false
            })
        })
    }

    // Get goals metrics
    public getGoals(): GoalsInterface | undefined {
        if (this.goals === undefined) {
            this.requestGoals();

            return undefined;
        } else {
            return this.goals;
        }
    }

    // Request goals metrics
    public requestGoals() {
        if (!this.requestedGoals) {
            runInAction(() => {
                this.requestedGoals = true;
            })
        } else {
            return;
        }

        axiosConfig().get(`/pg/metrics/goals/${this.id}`).then(data => {
            runInAction(() => {
                this.goals = data.data;
                this.requestedGoals = false;
            })
        })
    }

    // Get track numbers
    public getNumbers(): NumbersInterface | undefined {
        if (this.numbers === undefined) {
            this.requestNumbers();

            return undefined;
        } else {
            return this.numbers;
        }
    }

    // Request track numbers
    public requestNumbers() {
        if (!this.requestedNumbers) {
            runInAction(() => {
                this.requestedNumbers = true;
            })
        } else {
            return;
        }

        axiosConfig().get(`/pg/metrics/numbers/${this.id}`).then(data => {
            runInAction(() => {
                this.numbers = data.data;
                this.requestedNumbers = false;
            })
        })
    }

    // Get current user's books
    public getBooks(): SimpleBookInterface[] | undefined {
        if (this.books === undefined) {
            this.requestBooks();

            return undefined;
        } else {
            return this.books;
        }
    }

    // Request current user books
    public requestBooks() {
        if (!this.requestedBooks) {
            runInAction(() => {
                this.requestedBooks = true;
            })
        } else {
            return;
        }

        axiosConfig().get(`/pg/users/${this.id}/books`).then(data => {
            runInAction(() => {
                this.books = data.data;
                this.requestedBooks = false
            })
        })
    }

}
