import {makeAutoObservable, runInAction} from "mobx";
import {UserInterface} from "../utils/helpers/interfaces";
import axiosConfig from "../utils/helpers/axiosConfig";

/**
 * Class for managing current user state and information
 */
export default class UserStore {

    private currentUser: UserInterface | undefined = undefined

    private requested: boolean = false;

    public constructor() {
        makeAutoObservable(this);
    }

    // Get current user information
    public getCurrentUser(): UserInterface | undefined {
        if (this.currentUser === undefined) {
            this.requestCurrentUser();

            return undefined;
        } else {
            return this.currentUser;
        }
    }

    // Request current user information from the backend
    public requestCurrentUser() {
        if (!this.requested) {
            runInAction(() => {
                this.requested = true;
            })
        } else {
            return;
        }

        axiosConfig().get('/users/currentUser').then(data => {
            runInAction(() => {
                this.currentUser = data.data;
                this.requested = false
            })
        })
    }
}
