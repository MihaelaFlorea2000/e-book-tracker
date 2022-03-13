import {makeAutoObservable, runInAction} from "mobx";
import {SimpleUserInterface} from "../config/interfaces";
import axiosConfig from "../config/axiosConfig";

export default class FriendsStore {

    private friends: SimpleUserInterface[] | undefined = undefined
    private mutualFriends: SimpleUserInterface[] | undefined = undefined;

    private requested: boolean = false;
    private requestedMutualFriends: boolean = false;

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

    // Get current user information
    public getMutualFriends(userId:number): SimpleUserInterface[] | undefined {
        if (this.mutualFriends === undefined) {
            this.requestMutualFriends(userId);

            return undefined;
        } else {
            return this.mutualFriends;
        }
    }

    // Request current user information from the API
    public requestMutualFriends(userId:number) {
        if (!this.requestedMutualFriends) {
            runInAction(() => {
                this.requestedMutualFriends = true;
            })
        } else {
            return;
        }

        axiosConfig().get(`/pg/friends/mutual/${userId}`).then(data => {
            runInAction(() => {
                this.mutualFriends = data.data;
                this.requestedMutualFriends = false
            })
        })
    }
}
