import {makeAutoObservable, runInAction} from "mobx";
import {FrontSessionInterface} from "../config/interfaces";
import {useState} from "react";

export default class AddReadStore {

    private sessions: FrontSessionInterface[] = [];
    private startDate: string = '';
    private endDate: string = '';

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

   public formatDate(value:string):string {
       if (!value) return '';
       return value !== '' ? new Date(value).toLocaleDateString('en-US') : '';
   }

    public getStartDate():string {
        return this.startDate;
    }

    public setStartDate(value:string) {
        runInAction(() => {
            this.startDate = value;
        })
    }

    public getEndDate():string {
        return this.endDate;
    }

    public setEndDate(value:string) {
        runInAction(() => {
            this.endDate = value;
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
