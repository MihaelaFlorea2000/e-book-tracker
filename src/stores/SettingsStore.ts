import {makeAutoObservable, runInAction} from "mobx";
import axiosConfig from "../config/axiosConfig";
import {SettingsInterface} from "../config/interfaces";

export default class SettingsStore {

    private profileImageUrl: string = '';
    private profileImage: File = {} as File;
    private settings: SettingsInterface | undefined = undefined;
    private requestedSettings: boolean = false;

    private darkThemeOn: boolean = false;

    private expandAccount: boolean = true;
    private expandAppearance: boolean = false;

    public constructor() {
        makeAutoObservable(this);
    }

    // Profile Info
    public getProfileImageUrl(): string {
        return this.profileImageUrl;
    }

    public getProfileImage(): File {
        return this.profileImage;
    }

    public setProfileImageUrl(profileImageUrl: string) {
        this.profileImageUrl = profileImageUrl;
    }

    public setProfileImage(profileImage: File) {
        this.profileImage = profileImage;
    }

    public uploadProfileImage () {
        const filesData = new FormData();
        filesData.append('profileImage', this.getProfileImage())
        return axiosConfig().post( `/pg/users/profile/edit/upload`, filesData);
    }

    // Settings
    public getSettings(): SettingsInterface | undefined {
        if (this.settings === undefined) {
            this.requestSettings();

            return undefined;
        } else {
            return this.settings;
        }
    }

    // Request current user books
    public requestSettings() {
        if (!this.requestedSettings) {
            runInAction(() => {
                this.requestedSettings = true;
            })
        } else {
            return;
        }

        axiosConfig().get(`/pg/users/settings`).then(data => {
            runInAction(() => {
                this.settings = data.data;
                localStorage.setItem('darkTheme', data.data.darkTheme);
                this.darkThemeOn = data.data.darkTheme;
                this.requestedSettings = false;
            })
        })
    }

    // Dark Theme
    public isDarkThemeOn(): boolean {
        return this.darkThemeOn
    }

    public setDarkTheme(value: boolean) {
        this.darkThemeOn = value;
    }

    public getExpandAccount(): boolean {
        return this.expandAccount;
    }

    public setExpandAccount(value: boolean) {
        this.expandAccount = value;
    }

    public getExpandAppearance(): boolean {
        return this.expandAppearance;
    }

    public setExpandAppearance(value: boolean) {
        this.expandAppearance = value;
    }

    public collapseAll() {
        this.expandAccount = false;
        this.expandAppearance = false;
    }
}
