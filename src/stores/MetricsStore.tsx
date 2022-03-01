import {makeAutoObservable, runInAction} from "mobx";
import {NumbersInterface} from "../config/interfaces";
import axiosConfig from "../config/axiosConfig";

export default class MetricsStore {

    private numbers: NumbersInterface | undefined = undefined;

    private requestedNumbers: boolean = false;


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

    public resetNumbers() {
        this.numbers = undefined;
    }
}
