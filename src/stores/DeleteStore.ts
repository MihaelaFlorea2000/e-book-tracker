import {makeAutoObservable} from "mobx";

/**
 * Class for managing state when deleting a book
 */
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
