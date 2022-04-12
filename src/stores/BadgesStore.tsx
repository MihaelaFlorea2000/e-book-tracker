import {makeAutoObservable, runInAction} from "mobx";
import {
    BadgeInterface,
} from "../utils/helpers/interfaces";
import axiosConfig from "../utils/helpers/axiosConfig";

/**
 * Class for managing state for displaying badges
 */
export default class BadgesStore {

    private badges: BadgeInterface[] | undefined = undefined

    private requested: boolean = false;

    public constructor() {
        makeAutoObservable(this);
    }

    // Get current user's badges
    public getBadges(): BadgeInterface[] | undefined {
        if (this.badges === undefined) {
            this.requestBadges();

            return undefined;
        } else {
            return this.badges;
        }
    }

    // Request current user badges from the backend
    public requestBadges() {
        if (!this.requested) {
            runInAction(() => {
                this.requested = true;
            })
        } else {
            return;
        }

        axiosConfig().get('/badges').then(data => {
            runInAction(() => {
                this.badges = data.data;
                this.requested = false
            })
        })
    }
}
