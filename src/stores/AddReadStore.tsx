import {makeAutoObservable, runInAction} from "mobx";
import {FrontSessionInterface} from "../config/interfaces";
import { formatDateStringISO } from "../config/formatDateLong";

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
