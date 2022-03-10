import {makeAutoObservable, runInAction} from "mobx";
import {
    NumberGoalsInterface,
    NumbersInterface,
    PercentInterface,
    GoalsInterface,
    ChartDataInterface
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

    private weeklyProgress: ChartDataInterface | undefined;
    private monthlyProgress: ChartDataInterface | undefined;
    private yearlyProgress: ChartDataInterface | undefined;
    private totalProgress: ChartDataInterface | undefined;

    private topTagsByRead: ChartDataInterface | undefined;
    private topTagsByBooks: ChartDataInterface | undefined;

    private calendarDays: string[] | undefined;

    private requestedNumbers: boolean = false;
    private requestedPercent: boolean = false;
    private requestedGoals: boolean = false;
    private requestedWeeklyProgress: boolean = false;
    private requestedMonthlyProgress: boolean = false;
    private requestedYearlyProgress: boolean = false;
    private requestedTotalProgress: boolean = false;

    private requestedTopTagsByRead: boolean = false;
    private requestedTopTagsByBooks: boolean = false;

    private requestedCalendarDays: boolean = false;

    public constructor() {
        makeAutoObservable(this);
    }

    // Get track numbers
    public getNumbers(): NumbersInterface | undefined {
        if (this.numbers === undefined) {
            this.requestNumbers();

            return undefined;
        } else {
            return this.numbers;
        }
    }

    // Request track numbers
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

    // Get percent of books read
    public getPercent(): PercentInterface | undefined {
        if (this.percent === undefined) {
            this.requestPercent();

            return undefined;
        } else {
            return this.percent;
        }
    }

    // Request percent of books read
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

    // Metrics Dialog
    public isGoalsDialogue():boolean {
        return this.goalsDialogue;
    }

    public setGoalsDialogue(value:boolean) {
        runInAction(() => {
            this.goalsDialogue = value;
        })
    }

    // Get goals metrics
    public getGoals(): GoalsInterface | undefined {
        if (this.goals === undefined) {
            this.requestGoals();

            return undefined;
        } else {
            return this.goals;
        }
    }

    // Request goals metrics
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

    // Get weekly reading metrics
    public getWeeklyProgress(): ChartDataInterface | undefined {
        if (this.weeklyProgress === undefined) {
            this.requestWeeklyProgress();

            return undefined;
        } else {
            return this.weeklyProgress;
        }
    }

    // Request weekly reading metrics
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

    // Get monthly reading metrics
    public getMonthlyProgress(): ChartDataInterface | undefined {
        if (this.monthlyProgress === undefined) {
            this.requestMonthlyProgress();

            return undefined;
        } else {
            return this.monthlyProgress;
        }
    }

    // Request monthly reading metrics
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

    // Get yearly reading metrics
    public getYearlyProgress(): ChartDataInterface | undefined {
        if (this.yearlyProgress === undefined) {
            this.requestYearlyProgress();

            return undefined;
        } else {
            return this.yearlyProgress;
        }
    }

    // Request yearly reading metrics
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

    // Get total reading metrics
    public getTotalProgress(): ChartDataInterface | undefined {
        if (this.totalProgress === undefined) {
            this.requestTotalProgress();

            return undefined;
        } else {
            return this.totalProgress;
        }
    }

    // Request total reading metrics
    public requestTotalProgress() {
        if (!this.requestedTotalProgress) {
            runInAction(() => {
                this.requestedTotalProgress = true;
            })
        } else {
            return;
        }

        axiosConfig().get(`/pg/metrics/total`).then(data => {
            runInAction(() => {
                this.totalProgress = data.data;
                this.requestedTotalProgress = false;
            })
        })
    }

    // Get top tags by reading time
    public getTopTagsByRead(): ChartDataInterface | undefined {
        if (this.topTagsByRead === undefined) {
            this.requestTopTagsByRead();

            return undefined;
        } else {
            return this.topTagsByRead;
        }
    }

    // Request top tags by reading time
    public requestTopTagsByRead() {
        if (!this.requestedTopTagsByRead) {
            runInAction(() => {
                this.requestedTopTagsByRead = true;
            })
        } else {
            return;
        }

        axiosConfig().get(`/pg/metrics/tags/read`).then(data => {
            runInAction(() => {
                this.topTagsByRead = data.data;
                this.requestedTopTagsByRead = false;
            })
        })
    }

    // Get top tags by number of books
    public getTopTagsByBooks(): ChartDataInterface | undefined {
        if (this.topTagsByBooks === undefined) {
            this.requestTopTagsByBooks();

            return undefined;
        } else {
            return this.topTagsByBooks;
        }
    }

    // Request top tags by number of books
    public requestTopTagsByBooks() {
        if (!this.requestedTopTagsByBooks) {
            runInAction(() => {
                this.requestedTopTagsByBooks = true;
            })
        } else {
            return;
        }

        axiosConfig().get(`/pg/metrics/tags/books`).then(data => {
            runInAction(() => {
                this.topTagsByBooks = data.data;
                this.requestedTopTagsByBooks = false;
            })
        })
    }

    // Get calendar days
    public getCalendarDays(): string[] | undefined {
        if (this.calendarDays === undefined) {
            this.requestCalendarDays();

            return undefined;
        } else {
            return this.calendarDays;
        }
    }

    // Request calendar days
    public requestCalendarDays() {
        if (!this.requestedCalendarDays) {
            runInAction(() => {
                this.requestedCalendarDays = true;
            })
        } else {
            return;
        }

        axiosConfig().get(`/pg/metrics/calendar`).then(data => {
            runInAction(() => {
                this.calendarDays = data.data;
                this.requestedCalendarDays = false;
            })
        })
    }

    public trackRefresh() {
        this.requestNumbers();
        this.requestPercent();
        this.requestGoals();
        this.requestWeeklyProgress();
        this.requestMonthlyProgress();
        this.requestYearlyProgress();
        this.requestTotalProgress();
        this.requestTopTagsByRead();
        this.requestTopTagsByBooks();
        this.requestCalendarDays();
    }
}
