import {makeAutoObservable, runInAction} from "mobx";
import {
    NumberGoalsInterface,
    NumbersInterface,
    PercentInterface,
    GoalsInterface,
    ProgressInterface
} from "../config/interfaces";
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

    private weeklyProgress: ProgressInterface | undefined;
    private monthlyProgress: ProgressInterface | undefined;
    private yearlyProgress: ProgressInterface | undefined;


    private requestedNumbers: boolean = false;
    private requestedPercent: boolean = false;
    private requestedGoals: boolean = false;
    private requestedWeeklyProgress: boolean = false;
    private requestedMonthlyProgress: boolean = false;
    private requestedYearlyProgress: boolean = false;


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

    // Get current user's books
    public getWeeklyProgress(): ProgressInterface | undefined {
        if (this.weeklyProgress === undefined) {
            this.requestWeeklyProgress();

            return undefined;
        } else {
            return this.weeklyProgress;
        }
    }

    // Request current user books
    public requestWeeklyProgress() {
        if (!this.requestedWeeklyProgress) {
            runInAction(() => {
                this.requestedWeeklyProgress = true;
            })
        } else {
            return;
        }

        axiosConfig().get(`/pg/metrics/weekly`).then(data => {
            runInAction(() => {
                this.weeklyProgress = data.data;
                this.requestedWeeklyProgress = false;
            })
        })
    }

    // Get current user's books
    public getMonthlyProgress(): ProgressInterface | undefined {
        if (this.monthlyProgress === undefined) {
            this.requestMonthlyProgress();

            return undefined;
        } else {
            return this.monthlyProgress;
        }
    }

    // Request current user books
    public requestMonthlyProgress() {
        if (!this.requestedMonthlyProgress) {
            runInAction(() => {
                this.requestedMonthlyProgress = true;
            })
        } else {
            return;
        }

        axiosConfig().get(`/pg/metrics/monthly`).then(data => {
            runInAction(() => {
                this.monthlyProgress = data.data;
                this.requestedMonthlyProgress = false;
            })
        })
    }

    // Get current user's books
    public getYearlyProgress(): ProgressInterface | undefined {
        if (this.yearlyProgress === undefined) {
            this.requestYearlyProgress();

            return undefined;
        } else {
            return this.yearlyProgress;
        }
    }

    // Request current user books
    public requestYearlyProgress() {
        if (!this.requestedYearlyProgress) {
            runInAction(() => {
                this.requestedYearlyProgress = true;
            })
        } else {
            return;
        }

        axiosConfig().get(`/pg/metrics/yearly`).then(data => {
            runInAction(() => {
                this.yearlyProgress = data.data;
                this.requestedYearlyProgress = false;
            })
        })
    }



    public resetData() {
        this.numbers = undefined;
        this.percent = undefined;
        this.goalsDialogue = false;
        this.goals = undefined;
    }
}
