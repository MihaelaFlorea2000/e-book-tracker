import {makeAutoObservable, runInAction} from "mobx";
import {BookInterface, BookReadInterface} from "../config/interfaces";
import axiosConfig from "../config/axiosConfig";

export default class ReadStore {

    private editId: number | undefined = undefined;
    private readDialogue: boolean = false;

    private startDate: string = '';
    private endDate: string = '';
    private years: number = 0;
    private months: number = 0;
    private days: number = 0;
    private hours: number = 0;
    private minutes: number = 0;
    private seconds:number = 0;
    private milliseconds: number = 0;
    private sessions: number = 0;
    public rating: number = 0;
    private notes: string = '';
    private finish: boolean = false;


    public constructor() {
        makeAutoObservable(this);
    }

    // Is the user editing a highlight?
    public getEditId():number | undefined {
        return this.editId;
    }

    public setEditId(value:number | undefined) {
        runInAction(() => {
            this.editId = value;
        })
    }

    // Read Dialog
    public isReadDialogue():boolean {
        return this.readDialogue;
    }

    public setReadDialog(readDialogue:boolean) {
        runInAction(() => {
            this.readDialogue = readDialogue;
        })
    }

    // Start Date
    public getStartDate():string {
        return this.startDate;
    }

    public setStartDate(value:string) {
        runInAction(() => {
            this.startDate = ReadStore.formatDate(value);
        })
    }

    // End Date
    public getEndDate():string {
        return this.endDate;
    }

    public setEndDate(value:string) {
        runInAction(() => {
            this.endDate = ReadStore.formatDate(value)
        })
    }

    // Years
    public getYears():number {
        return this.years;
    }

    public setYears(value:number) {
        runInAction(() => {
            this.years = value;
        })
    }

    // Months
    public getMonths():number {
        return this.months;
    }

    public setMonths(value:number) {
        runInAction(() => {
            this.months = value;
        })
    }

    // Days
    public getDays():number {
        return this.days;
    }

    public setDays(value:number) {
        runInAction(() => {
            this.days = value;
        })
    }

    // Hours
    public getHours():number {
        return this.hours;
    }

    public setHours(value:number) {
        runInAction(() => {
            this.hours = value;
        })
    }

    // Minutes
    public getMinutes():number {
        return this.minutes;
    }

    public setMinutes(value:number) {
        runInAction(() => {
            this.minutes = value;
        })
    }

    // Seconds
    public getSeconds():number {
        return this.seconds;
    }

    public setSeconds(value:number) {
        runInAction(() => {
            this.seconds = value;
        })
    }

    // Milliseconds
    public getMilliseconds():number {
        return this.milliseconds;
    }

    public setMilliseconds(value:number) {
        runInAction(() => {
            this.milliseconds = value;
        })
    }

    // Sessions
    public getSessions():number {
        return this.sessions;
    }

    public setSessions(value:number) {
        runInAction(() => {
            this.sessions = value;
        })
    }

    // Rating
    public getRating():number {
        return this.rating;
    }

    public setRating(value:number) {
        runInAction(() => {
            this.rating = value;
        })
    }

    // Notes
    public getNotes():string {
        return this.notes;
    }

    public setNotes(value:string) {
        runInAction(() => {
            this.notes = value;
        })
    }

    // Finish
    public isFinish():boolean {
        return this.finish;
    }

    public setFinish(value:boolean) {
        runInAction(() => {
            this.finish = value;
        })
    }

    public setCurrentRead(read:BookReadInterface, finish:boolean) {
        runInAction(() => {
            this.startDate = ReadStore.formatDate(read.startDate);
            this.endDate = ReadStore.formatDate(read.endDate);
            this.years = read.time.years ? read.time.years : 0;
            this.months = read.time.months ? read.time.months : 0;
            this.days = read.time.days ? read.time.days : 0;
            this.hours = read.time.hours ? read.time.hours : 0;
            this.minutes = read.time.minutes ? read.time.minutes : 0;
            this.seconds = read.time.seconds ? read.time.seconds : 0;
            this.milliseconds = read.time.milliseconds ? read.time.milliseconds : 0;
            this.sessions = read.sessions;
            this.rating = read.rating;
            this.notes = read.notes;
            this.finish = finish;
        })
    }

    public resetCurrentRead() {
        runInAction(() => {
            this.startDate = "";
            this.endDate = "";
            this.years = 0;
            this.months = 0;
            this.days = 0;
            this.hours = 0;
            this.minutes = 0;
            this.seconds = 0;
            this.milliseconds = 0;
            this.sessions = 0;
            this.rating = 0;
            this.notes = "";
            this.finish = false;
        })
    }


    private static formatDate(value:string):string {
        if (!value) return '';
        return value.trim() !== '' ? new Date(value).toISOString().split('T')[0] : '';
    }
}
