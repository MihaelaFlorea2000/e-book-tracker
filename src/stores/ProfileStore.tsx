import {makeAutoObservable, runInAction} from "mobx";
import axiosConfig from "../utils/helpers/axiosConfig";
import {
    SimpleBookInterface,
    GoalsInterface,
    NumbersInterface, ProfileSettingsInterface, UserProfileInterface, SimpleUserInterface
} from "../utils/helpers/interfaces";

/**
 * Class for managing user profile state
 */
export default class ProfileStore {

    // Profile Information
    private id: number;
    private user: UserProfileInterface | undefined = undefined;
    private goals: GoalsInterface | undefined = undefined;
    private numbers: NumbersInterface | undefined = undefined;
    private books: SimpleBookInterface[] | undefined = undefined;
    private profileSettings: ProfileSettingsInterface | undefined = undefined;
    private mutualFriends: SimpleUserInterface[] | undefined = undefined;


    private requestedUser: boolean = false;
    private requestedGoals: boolean = false;
    private requestedNumbers: boolean = false;
    private requestedBooks: boolean = false;
    private requestedProfileSettings: boolean = false;
    private requestedMutualFriends: boolean = false;


    public constructor(id: number) {
        makeAutoObservable(this);

        this.id = id;
    }

    // Get current user information
    public getUser(): UserProfileInterface | undefined {
        if (this.user === undefined) {
            this.requestUser();

            return undefined;
        } else {
            return this.user;
        }
    }

    // Request current user information from the backend
    public requestUser() {
        if (!this.requestedUser) {
            runInAction(() => {
                this.requestedUser = true;
            })
        } else {
            return;
        }

        axiosConfig().get(`/users/${this.id}`).then(data => {
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

    // Request goals metrics from backend
    public requestGoals() {
        if (!this.requestedGoals) {
            runInAction(() => {
                this.requestedGoals = true;
            })
        } else {
            return;
        }

        axiosConfig().get(`/metrics/goals/${this.id}`).then(data => {
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

    // Request track numbers from backend
    public requestNumbers() {
        if (!this.requestedNumbers) {
            runInAction(() => {
                this.requestedNumbers = true;
            })
        } else {
            return;
        }

        axiosConfig().get(`/metrics/numbers/${this.id}`).then(data => {
            runInAction(() => {
                this.numbers = data.data;
                this.requestedNumbers = false;
            })
        })
    }

    // Get user's books
    public getBooks(): SimpleBookInterface[] | undefined {
        if (this.books === undefined) {
            this.requestBooks();

            return undefined;
        } else {
            return this.books;
        }
    }

    // Request user books from backend
    public requestBooks() {
        if (!this.requestedBooks) {
            runInAction(() => {
                this.requestedBooks = true;
            })
        } else {
            return;
        }

        axiosConfig().get(`/users/${this.id}/books`).then(data => {
            runInAction(() => {
                this.books = data.data;
                this.requestedBooks = false
            })
        })
    }

    // Settings
    public getProfileSettings(): ProfileSettingsInterface | undefined {
        if (this.profileSettings === undefined) {
            this.requestProfileSettings();

            return undefined;
        } else {
            return this.profileSettings;
        }
    }

    // Request user settings from backend
    public requestProfileSettings() {
        if (!this.requestedProfileSettings) {
            runInAction(() => {
                this.requestedProfileSettings = true;
            })
        } else {
            return;
        }

        axiosConfig().get(`/users/settings/profile/${this.id}`).then(data => {
            runInAction(() => {
                this.profileSettings = data.data;
            })
        })
    }

    // Get mutual friends with current user
    public getMutualFriends(): SimpleUserInterface[] | undefined {
        if (this.mutualFriends === undefined) {
            this.requestMutualFriends();

            return undefined;
        } else {
            return this.mutualFriends;
        }
    }

    // Request mutual friends with current user from backend
    public requestMutualFriends() {
        if (!this.requestedMutualFriends) {
            runInAction(() => {
                this.requestedMutualFriends = true;
            })
        } else {
            return;
        }

        axiosConfig().get(`/friends/mutual/${this.id}`).then(data => {
            runInAction(() => {
                this.mutualFriends = data.data;
                this.requestedMutualFriends = false
            })
        })
    }


}
