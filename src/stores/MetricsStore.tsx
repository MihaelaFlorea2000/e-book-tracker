import {makeAutoObservable, runInAction} from "mobx";
import {
    NumberGoalsInterface,
    NumbersInterface,
    PercentInterface,
    GoalsInterface,
    ChartDataInterface
} from "../utils/helpers/interfaces";
import axiosConfig from "../utils/helpers/axiosConfig";

/**
 * Class for managing metrics for Track page
 */
export default class MetricsStore {

    // User goals
    private setGoals: NumberGoalsInterface = {
        yearly: 0,
        monthly: 0,
        dailyHours: 0,
        dailyMinutes: 0
    }

    // Open edit goals dialog?
    private goalsDialogue: boolean = false;

    // Data for each type of chart
    private numbers: NumbersInterface | undefined = undefined;
    private percent: PercentInterface | undefined = undefined;
    private goals: GoalsInterface | undefined = undefined;

    // Line charts
    private weeklyProgress: ChartDataInterface | undefined;
    private monthlyProgress: ChartDataInterface | undefined;
    private yearlyProgress: ChartDataInterface | undefined;
    private totalProgress: ChartDataInterface | undefined;

    // Bar charts
    private topTagsByRead: ChartDataInterface | undefined;
    private topTagsByBooks: ChartDataInterface | undefined;

    // Calendar Chart
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

    // Request track numbers from backend
    public requestNumbers() {
        if (!this.requestedNumbers) {
            runInAction(() => {
                this.requestedNumbers = true;
            })
        } else {
            return;
        }

        axiosConfig().get(`/metrics/numbers`).then(data => {
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

    // Request percent of books read from backend
    public requestPercent() {
        if (!this.requestedPercent) {
            runInAction(() => {
                this.requestedPercent = true;
            })
        } else {
            return;
        }

        axiosConfig().get(`/metrics/percentage`).then(data => {
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

    // Request goals metrics from backend
    public requestGoals() {
        if (!this.requestedGoals) {
            runInAction(() => {
                this.requestedGoals = true;
            })
        } else {
            return;
        }

        axiosConfig().get(`/metrics/goals`).then(data => {
            runInAction(() => {
                this.goals = data.data;
                this.requestedGoals = false;
            })
        })
    }

    // Get current user's goals
    public getSetGoals(): NumberGoalsInterface {
        return this.setGoals;
    }

    // Set current user goals
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

    // Request weekly reading metrics from backend
    public requestWeeklyProgress() {
        if (!this.requestedWeeklyProgress) {
            runInAction(() => {
                this.requestedWeeklyProgress = true;
            })
        } else {
            return;
        }

        axiosConfig().get(`/metrics/weekly`).then(data => {
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

    // Request monthly reading metrics from backend
    public requestMonthlyProgress() {
        if (!this.requestedMonthlyProgress) {
            runInAction(() => {
                this.requestedMonthlyProgress = true;
            })
        } else {
            return;
        }

        axiosConfig().get(`/metrics/monthly`).then(data => {
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

    // Request yearly reading metrics from backend
    public requestYearlyProgress() {
        if (!this.requestedYearlyProgress) {
            runInAction(() => {
                this.requestedYearlyProgress = true;
            })
        } else {
            return;
        }

        axiosConfig().get(`/metrics/yearly`).then(data => {
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

    // Request total reading metrics from backend
    public requestTotalProgress() {
        if (!this.requestedTotalProgress) {
            runInAction(() => {
                this.requestedTotalProgress = true;
            })
        } else {
            return;
        }

        axiosConfig().get(`/metrics/total`).then(data => {
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

    // Request top tags by reading time from backend
    public requestTopTagsByRead() {
        if (!this.requestedTopTagsByRead) {
            runInAction(() => {
                this.requestedTopTagsByRead = true;
            })
        } else {
            return;
        }

        axiosConfig().get(`/metrics/tags/read`).then(data => {
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

    // Request top tags by number of books from backend
    public requestTopTagsByBooks() {
        if (!this.requestedTopTagsByBooks) {
            runInAction(() => {
                this.requestedTopTagsByBooks = true;
            })
        } else {
            return;
        }

        axiosConfig().get(`/metrics/tags/books`).then(data => {
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

    // Request calendar days from backend
    public requestCalendarDays() {
        if (!this.requestedCalendarDays) {
            runInAction(() => {
                this.requestedCalendarDays = true;
            })
        } else {
            return;
        }

        axiosConfig().get(`/metrics/calendar`).then(data => {
            runInAction(() => {
                this.calendarDays = data.data;
                this.requestedCalendarDays = false;
            })
        })
    }

    // Refresh all metrics
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
