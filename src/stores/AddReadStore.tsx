import {makeAutoObservable, runInAction} from "mobx";
import {FrontSessionInterface} from "../utils/helpers/interfaces";
import { formatDateStringISO } from "../utils/helpers/formatDate";

/**
 * Class for managing state for adding a Read
 */
export default class AddReadStore {

    // Sessions
    private sessions: FrontSessionInterface[] = [];

    // Read
    private startDate: string = '';
    private endDate: string = '';

    // Other
    private errorMessage: string = '';


    public constructor() {
        makeAutoObservable(this);
    }

    // Getters and setters
    public getSessions():FrontSessionInterface[] {
        return this.sessions;
    }

    public setSessions(value:FrontSessionInterface[]) {
       runInAction(() => {
           this.sessions = value;
       })
    }

    public getStartDate():string {
        return this.startDate;
    }

    public setStartDate(value:string) {
        runInAction(() => {
            this.startDate = formatDateStringISO(value);
        })
    }

    public getEndDate():string {
        return this.endDate;
    }

    public setEndDate(value:string) {
        runInAction(() => {
            this.endDate = formatDateStringISO(value);
        })
    }

    public getErrorMessage():string {
        return this.errorMessage;
    }

    public setErrorMessage(value:string) {
        runInAction(() => {
            this.errorMessage = value;
        })
    }
}
