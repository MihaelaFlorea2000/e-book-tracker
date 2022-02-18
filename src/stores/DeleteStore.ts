import {makeAutoObservable} from "mobx";

export default class DeleteStore {

    private error: string = ""

    public constructor() {
        makeAutoObservable(this);
    }

    // Get delete error
    public getError(): string {
       return this.error;
    }

    // Set delete error
    public setError(message:string) {
        this.error = message
    }
}
