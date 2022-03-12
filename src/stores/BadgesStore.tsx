import {makeAutoObservable, runInAction} from "mobx";
import {
    BadgeInterface,
} from "../config/interfaces";
import axiosConfig from "../config/axiosConfig";

export default class BadgesStore {

    private badges: BadgeInterface[] | undefined = undefined

    private requested: boolean = false;

    public constructor() {
        makeAutoObservable(this);
    }

    // Get current user's books
    public getBadges(): BadgeInterface[] | undefined {
        if (this.badges === undefined) {
            this.requestBadges();

            return undefined;
        } else {
            return this.badges;
        }
    }

    // Request current user books
    public requestBadges() {
        if (!this.requested) {
            runInAction(() => {
                this.requested = true;
            })
        } else {
            return;
        }

        axiosConfig().get('/pg/badges').then(data => {
            runInAction(() => {
                this.badges = data.data;
                this.requested = false
            })
        })
    }
}
