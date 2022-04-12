import {makeAutoObservable, runInAction} from "mobx";
import {
    IntervalInterface,
    ReadInterface,
    SessionInterface
} from "../utils/helpers/interfaces";
import axiosConfig from "../utils/helpers/axiosConfig";
import { formatDateStringISO } from "../utils/helpers/formatDate";

/**
 * Class for managing state when editing a book read
 */
export default class EditReadStore {

    // Read
    private startDate: string = '';
    private endDate: string = '';
    public rating: number = 0;
    private notes: string = '';

    // Sessions
    private sessions: SessionInterface[] = [];
    private requestedSessions: boolean = false;
    private sessionStartDate: string = '';
    private sessionTime: IntervalInterface = {};
    private sessionId: number | undefined = undefined;

    // Other
    private finished: boolean = false;
    private errorMessage: string = '';
    private editDialogue: boolean = false;

    public constructor() {
        makeAutoObservable(this);
    }


    // Start Date
    public getStartDate():string {
        return this.startDate;
    }

    public setStartDate(value:string) {
        runInAction(() => {
            this.startDate = formatDateStringISO(value);
        })
    }

    // End Date
    public getEndDate():string {
        return this.endDate;
    }

    public setEndDate(value:string) {
        runInAction(() => {
            this.endDate = formatDateStringISO(value)
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

    // Currently Reading
    public setCurrentRead(read:ReadInterface) {
        runInAction(() => {
            this.startDate = formatDateStringISO(read.startDate);
            this.endDate = formatDateStringISO(read.endDate);
            this.rating = read.rating;
            this.notes = read.notes;

            this.requestSessions(read.id);
        })
    }

    // Sessions

    // Get current read's sessions
    public getSessions(readId:number): SessionInterface[] | undefined {
        if (this.sessions === undefined) {
            this.requestSessions(readId);

            return undefined;
        } else {
            return this.sessions;
        }
    }

    // Request current read sessions from backend
    public requestSessions(readId:number) {
        if (!this.requestedSessions) {
            runInAction(() => {
                this.requestedSessions = true;
            })
        } else {
            return;
        }

        axiosConfig().get(`/sessions/${readId}`).then(data => {
            runInAction(() => {
                this.sessions = data.data;
                this.requestedSessions = false;
            })
        })
    }

    // Session
    public setCurrentSession(session:SessionInterface) {
        runInAction(() => {
            this.sessionStartDate = formatDateStringISO(session.startDate);
            this.sessionTime = session.time;
            this.sessionId = session.id;
        })
    }

    // Start Date
    public getSessionStartDate():string {
        return this.sessionStartDate;
    }

    // Session time
    public getSessionTime():IntervalInterface {
        return this.sessionTime;
    }

    // Session Id
    public getSessionId():number | undefined {
        return this.sessionId;
    }

    // Other

    // Error message
    public getErrorMessage():string {
        return this.errorMessage;
    }

    public setErrorMessage(value:string) {
        runInAction(() => {
            this.errorMessage = value;
        })
    }

    // Is read finished?
    public isFinished():boolean {
        return this.finished;
    }

    public setIsFinished(value:boolean) {
        runInAction(() => {
            this.finished = value;
        })
    }

    // Edit Dialog for session
    public isEditDialogue():boolean {
        return this.editDialogue;
    }

    public setEditDialog(editDialogue:boolean) {
        runInAction(() => {
            this.editDialogue = editDialogue;
        })
    }
}
