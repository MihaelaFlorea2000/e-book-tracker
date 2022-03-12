import {makeAutoObservable, runInAction} from "mobx";
import {NotificationInterface} from "../config/interfaces";
import axiosConfig from "../config/axiosConfig";

export default class NotificationsStore {

    private notifications: NotificationInterface[] | undefined = undefined

    private requested: boolean = false;

    public constructor() {
        makeAutoObservable(this);
    }

    // Get current user's books
    public getNotifications(): NotificationInterface[] | undefined {
        if (this.notifications === undefined) {
            this.requestNotifications();

            return undefined;
        } else {
            return this.notifications;
        }
    }

    // Request current user books
    public requestNotifications() {
        if (!this.requested) {
            runInAction(() => {
                this.requested = true;
            })
        } else {
            return;
        }

        axiosConfig().get('/pg/notifications').then(data => {
            runInAction(() => {
                this.notifications = data.data;
                this.requested = false
            })
        })
    }
}
