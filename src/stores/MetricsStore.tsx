import {makeAutoObservable, runInAction} from "mobx";
import {NumbersInterface, PercentInterface} from "../config/interfaces";
import axiosConfig from "../config/axiosConfig";

export default class MetricsStore {

    private numbers: NumbersInterface | undefined = undefined;
    private percent: PercentInterface | undefined = undefined;


    private requestedNumbers: boolean = false;
    private requestedPercent: boolean = false;



    public constructor() {
        makeAutoObservable(this);
    }

    // Get current user's books
    public getNumbers(): NumbersInterface | undefined {
        if (this.numbers === undefined) {
            this.requestNumbers();

            return undefined;
        } else {
            return this.numbers;
        }
    }

    // Request current user books
    public requestNumbers() {
        if (!this.requestedNumbers) {
            runInAction(() => {
                this.requestedNumbers = true;
            })
        } else {
            return;
        }

        axiosConfig().get(`/pg/metrics/numbers`).then(data => {
            runInAction(() => {
                this.numbers = data.data;
                this.requestedNumbers = false;
            })
        })
    }

    // Get current user's books
    public getPercent(): PercentInterface | undefined {
        if (this.percent === undefined) {
            this.requestPercent();

            return undefined;
        } else {
            return this.percent;
        }
    }

    // Request current user books
    public requestPercent() {
        if (!this.requestedPercent) {
            runInAction(() => {
                this.requestedPercent = true;
            })
        } else {
            return;
        }

        axiosConfig().get(`/pg/metrics/percentage`).then(data => {
            runInAction(() => {
                this.percent = data.data;
                this.requestedPercent = false;
            })
        })
    }

    public resetData() {
        this.numbers = undefined;
        this.percent = undefined;
    }
}
