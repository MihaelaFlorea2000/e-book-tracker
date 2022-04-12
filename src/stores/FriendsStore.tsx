import {makeAutoObservable, runInAction} from "mobx";
import {SimpleUserInterface} from "../utils/helpers/interfaces";
import axiosConfig from "../utils/helpers/axiosConfig";

/**
 * Class for managing friends state
 */
export default class FriendsStore {

    // Current user's friends
    private friends: SimpleUserInterface[] | undefined = undefined

    // Current user's mutual friends with another user
    private mutualFriends: SimpleUserInterface[] | undefined = undefined;

    private requested: boolean = false;
    private requestedMutualFriends: boolean = false;

    public constructor() {
        makeAutoObservable(this);
    }

    // Get current user's friends
    public getFriends(): SimpleUserInterface[] | undefined {
        if (this.friends === undefined) {
            this.requestFriends();

            return undefined;
        } else {
            return this.friends;
        }
    }

    // Request current user friends from backend
    public requestFriends() {
        if (!this.requested) {
            runInAction(() => {
                this.requested = true;
            })
        } else {
            return;
        }

        axiosConfig().get('/friends').then(data => {
            runInAction(() => {
                this.friends = data.data;
                this.requested = false
            })
        })
    }

    // Get mutual friends with another user
    public getMutualFriends(userId:number): SimpleUserInterface[] | undefined {
        if (this.mutualFriends === undefined) {
            this.requestMutualFriends(userId);

            return undefined;
        } else {
            return this.mutualFriends;
        }
    }

    // Request mutual friends with another user from backend
    public requestMutualFriends(userId:number) {
        if (!this.requestedMutualFriends) {
            runInAction(() => {
                this.requestedMutualFriends = true;
            })
        } else {
            return;
        }

        axiosConfig().get(`/friends/mutual/${userId}`).then(data => {
            runInAction(() => {
                this.mutualFriends = data.data;
                this.requestedMutualFriends = false
            })
        })
    }
}
