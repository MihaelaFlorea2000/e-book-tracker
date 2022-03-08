import {makeAutoObservable} from "mobx";
import axiosConfig from "../config/axiosConfig";

export default class SettingsStore {

    private profileImageUrl: string = '';
    private profileImage: File = {} as File;


    public constructor() {
        makeAutoObservable(this);
    }

    // Cover Image
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
}
