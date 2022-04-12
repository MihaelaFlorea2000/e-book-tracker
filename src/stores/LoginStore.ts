import {makeAutoObservable} from "mobx";
import jwt_decode from "jwt-decode";

/**
 * Class for managing Login functionality
 */
class LoginStore {

    private authStatus: boolean = false;

    public constructor() {
        makeAutoObservable(this);
        this.setAuthStatus();
    }


    // Login user
    public login(authToken: string) {
        localStorage.setItem("user", authToken);

        this.setAuthStatus();
    }

    // Logout user
    public logout() {
        localStorage.removeItem("user");
        localStorage.removeItem("darkTheme");

        this.authStatus = false;
    }

    // Check if user is logged in
    public isAuth() {
        return this.authStatus;
    }

    // Return token
    public getToken() {
        return localStorage.getItem('user') as string;
    }

    // Set authentication status
    private setAuthStatus(): boolean {
        let tokenOk = this.checkToken();
        if (tokenOk) {
            this.authStatus = true;

            return true;

        } else {
            this.authStatus = false;

            return false;
        }
    }

    // Check if token is ok
    private checkToken(): boolean {
        try {
            jwt_decode(this.getToken());
            return true;
        } catch (err) {
            return false;
        }
    }
}

export default new LoginStore();
