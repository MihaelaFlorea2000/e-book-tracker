import {makeAutoObservable} from "mobx";
import jwt_decode from "jwt-decode";
import {AuthTokenDataStructure} from "../config/interfaces";

class MainStore {
    private isAuthenticated: boolean = false;

    public constructor() {
        makeAutoObservable(this);

        this.setAuthentication();
    }

    public login(token: string) {
        localStorage.setItem("token", token);

        this.setAuthentication();
    }

    public logout() {
        localStorage.removeItem("token");

        this.isAuthenticated = false;
    }

    public isAuth() {
        return this.isAuthenticated;
    }

    public getAuthToken() {
        return localStorage.getItem('token') as string;
    }

    private setAuthentication(): boolean {
        let token = this.parseAuthToken()

        if (token !== false) {

            this.isAuthenticated = true;

            return true;

        } else {
            this.isAuthenticated = false;

            return false;
        }
    }

    private parseAuthToken(): AuthTokenDataStructure | boolean {
        try {
            return jwt_decode(this.getAuthToken()) as AuthTokenDataStructure
        } catch (err) {
            return false;
        }
    }
}

export default new MainStore();
