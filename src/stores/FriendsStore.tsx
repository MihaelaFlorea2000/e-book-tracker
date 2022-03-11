import {makeAutoObservable, runInAction} from "mobx";
import {SimpleUserInterface} from "../config/interfaces";
import axiosConfig from "../config/axiosConfig";

export default class FriendsStore {

    private friends: SimpleUserInterface[] | undefined = undefined

    private requested: boolean = false;

    public constructor() {
        makeAutoObservable(this);
    }

    // Get current user's books
    public getFriends(): SimpleUserInterface[] | undefined {
        if (this.friends === undefined) {
            this.requestFriends();

            return undefined;
        } else {
            return this.friends;
        }
    }

    // Request current user books
    public requestFriends() {
        if (!this.requested) {
            runInAction(() => {
                this.requested = true;
            })
        } else {
            return;
        }

        axiosConfig().get('/pg/friends').then(data => {
            runInAction(() => {
                this.friends = data.data;
                this.requested = false
            })
        })
    }
}
