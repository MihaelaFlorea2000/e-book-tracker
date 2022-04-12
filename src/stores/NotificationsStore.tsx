import {makeAutoObservable, runInAction} from "mobx";
import {NotificationInterface} from "../utils/helpers/interfaces";
import axiosConfig from "../utils/helpers/axiosConfig";

/**
 * Class for managing notifications
 */
export default class NotificationsStore {

    private notifications: NotificationInterface[] | undefined = undefined

    private requested: boolean = false;

    public constructor() {
        makeAutoObservable(this);
    }

    // Get current user's notifications
    public getNotifications(): NotificationInterface[] | undefined {
        if (this.notifications === undefined) {
            this.requestNotifications();

            return undefined;
        } else {
            return this.notifications;
        }
    }

    // Request current user notifications from backend
    public requestNotifications() {
        if (!this.requested) {
            runInAction(() => {
                this.requested = true;
            })
        } else {
            return;
        }

        axiosConfig().get('/notifications').then(data => {
            runInAction(() => {
                this.notifications = data.data;
                this.requested = false
            })
        })
    }
}
