import {makeAutoObservable, runInAction} from "mobx";
import axiosConfig from "../config/axiosConfig";
import {UserInterface} from "../config/interfaces";

export default class ProfileStore {

    private id: number;
    private user: UserInterface | undefined = undefined;

    private requested: boolean = false;

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
        if (!this.requested) {
            runInAction(() => {
                this.requested = true;
            })
        } else {
            return;
        }

        axiosConfig().get(`/pg/users/${this.id}`).then(data => {
            runInAction(() => {
                this.user = data.data;
                this.requested = false
            })
        })
    }

}
