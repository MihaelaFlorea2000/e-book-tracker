import {makeAutoObservable, runInAction} from "mobx";
import {
    IntervalInterface,
    ReadInterface,
    SessionInterface
} from "../config/interfaces";
import axiosConfig from "../config/axiosConfig";

export default class EditReadStore {

    private sessions: SessionInterface[] = [];
    private editDialogue: boolean = false;


    private startDate: string = '';
    private endDate: string = '';
    public rating: number = 0;
    private notes: string = '';

    private requestedSessions: boolean = false;

    private sessionStartDate: string = '';
    private sessionTime: IntervalInterface = {};
    private sessionId: number | undefined = undefined;

    public constructor() {
        makeAutoObservable(this);
    }

    // Edit Dialog
    public isEditDialogue():boolean {
        return this.editDialogue;
    }

    public setEditDialog(editDialogue:boolean) {
        runInAction(() => {
            this.editDialogue = editDialogue;
        })
    }

    // Start Date
    public getStartDate():string {
        return this.startDate;
    }

    // End Date
    public getEndDate():string {
        return this.endDate;
    }

    public setEndDate(value:string) {
        runInAction(() => {
            this.endDate = this.formatDate(value)
        })
    }

    // Rating
    public getRating():number {
        return this.rating;
    }

    // Notes
    public getNotes():string {
        return this.notes;
    }

    public setCurrentRead(read:ReadInterface) {
        runInAction(() => {
            this.startDate = this.formatDate(read.startDate);
            this.endDate = this.formatDate(read.endDate);
            this.rating = read.rating;
            this.notes = read.notes;

            this.requestSessions(read.id);
        })
    }

    // Get current user's sessions
    public getSessions(readId:number): SessionInterface[] | undefined {
        if (this.sessions === undefined) {
            this.requestSessions(readId);

            return undefined;
        } else {
            return this.sessions;
        }
    }

    // Request current user books
    public requestSessions(readId:number) {
        if (!this.requestedSessions) {
            runInAction(() => {
                this.requestedSessions = true;
            })
        } else {
            return;
        }

        axiosConfig().get(`/pg/sessions/${readId}`).then(data => {
            runInAction(() => {
                this.sessions = data.data;
                this.requestedSessions = false;
            })
        })
    }

    public setCurrentSession(session:SessionInterface) {
        runInAction(() => {
            this.sessionStartDate = this.formatDate(session.startDate);
            this.sessionTime = session.time;
            this.sessionId = session.id;
        })
    }

    // Start Date
    public getSessionStartDate():string {
        return this.sessionStartDate;
    }

    // Start Date
    public getSessionTime():IntervalInterface {
        return this.sessionTime;
    }

    // Start Date
    public getSessionId():number | undefined {
        return this.sessionId;
    }


    public formatDate(value:string):string {
        if (!value) return '';
        return value !== '' ? new Date(value).toISOString().split('T')[0] : '';
    }
}
