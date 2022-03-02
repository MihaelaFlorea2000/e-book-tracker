import {makeAutoObservable, runInAction} from "mobx";
import {NumberGoalsInterface, NumbersInterface, PercentInterface, GoalsInterface} from "../config/interfaces";
import axiosConfig from "../config/axiosConfig";

export default class MetricsStore {

    private numbers: NumbersInterface | undefined = undefined;
    private percent: PercentInterface | undefined = undefined;
    private goalsDialogue: boolean = false;
    private goals: GoalsInterface | undefined = undefined;
    private setGoals: NumberGoalsInterface = {
        yearly: 0,
        monthly: 0,
        dailyHours: 0,
        dailyMinutes: 0
    }

    private requestedNumbers: boolean = false;
    private requestedPercent: boolean = false;
    private requestedGoals: boolean = false;


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

    // Goals Dialog
    public isGoalsDialogue():boolean {
        return this.goalsDialogue;
    }

    public setGoalsDialogue(value:boolean) {
        runInAction(() => {
            this.goalsDialogue = value;
        })
    }

    // Get current user's books
    public getGoals(): GoalsInterface | undefined {
        if (this.goals === undefined) {
            this.requestGoals();

            return undefined;
        } else {
            return this.goals;
        }
    }

    // Request current user books
    public requestGoals() {
        if (!this.requestedGoals) {
            runInAction(() => {
                this.requestedGoals = true;
            })
        } else {
            return;
        }

        axiosConfig().get(`/pg/metrics/goals`).then(data => {
            runInAction(() => {
                this.goals = data.data;
                this.requestedGoals = false;
            })
        })
    }

    // Get current user's books
    public getSetGoals(): NumberGoalsInterface {
        return this.setGoals;
    }

    // Request current user books
    public setSetGoals(value: NumberGoalsInterface) {
        runInAction(() => {
            this.setGoals = value;
        })
    }

    public resetData() {
        this.numbers = undefined;
        this.percent = undefined;
        this.goalsDialogue = false;
        this.goals = undefined;
    }
}
