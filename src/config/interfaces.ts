export interface TokenInterface {
    iat: number
    id: number
}

// Current user information
export interface UserInterface {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    profileImage: string
}

export interface UserProfileInterface {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    profileImage: string,
    isFriend: boolean,
    sentRequest: boolean,
    receivedRequest: boolean
}

export interface SimpleUserInterface {
    id: number,
    firstName: string,
    lastName: string,
    profileImage: string
}

// Book Information
export interface BookInterface {
    id?: number,
    userId: number,
    title: string,
    authors: string[],
    description: string,
    coverImage: string,
    tags: string[],
    publisher: string,
    pubDate: string,
    language: string,
    rating: number,
    file: string,
    fileName: string,
    series: string,
    location: string
}

export interface SimpleBookInterface {
    id: number,
    title: string,
    coverImage: string
}

export interface HighlightInterface {
    id?: number,
    text: string,
    cfiRange: string,
    note: string,
    color: string
}

export interface SearchResultInterface {
    cfi: string,
    excerpt: string
}

export interface IntervalInterface {
    years?: number,
    months?: number,
    days?: number,
    hours?: number,
    minutes?: number,
    seconds?: number,
    milliseconds?: number
}

export interface ReadInterface {
    id: number,
    startDate: string,
    endDate: string,
    rating: number,
    notes: string,
    time: IntervalInterface,
    sessions: number
}

export interface SessionInterface {
    id?: number,
    startDate: string,
    time: IntervalInterface
}

export interface FrontSessionInterface {
    id: string | undefined,
    startDate: string,
    hours: number,
    minutes: number,
}

export interface NumbersInterface {
    booksRead: number,
    booksCurrRead: number,
    authorsReadCount: number,
    longestSession: IntervalInterface,
    avgTimePerSession: IntervalInterface,
    bestDay: string
}

export interface PercentInterface {
    booksRead: number,
    totalBooks: number,
    value: number
}

export interface NumberGoalsInterface {
    yearly: number,
    monthly: number,
    dailyHours: number,
    dailyMinutes: number
}

export interface PercentageGoalsInterface {
    yearly: number,
    monthly: number,
    daily: number
}

export interface GoalsInterface {
    set: NumberGoalsInterface,
    done: NumberGoalsInterface,
    percentage: PercentageGoalsInterface
}

export interface ChartDataInterface {
    labels: string[],
    dataValues: number[],
}


export interface SettingsInterface {
    darkTheme: boolean,
    fontSize: number,
    readerTheme: string,
    notifications: boolean,
    profileVisibility: string,
    showGoals: boolean,
    showBooks: boolean,
    showNumbers: boolean
}

export interface ProfileSettingsInterface {
    profileVisibility: string,
    showGoals: boolean,
    showBooks: boolean,
    showNumbers: boolean
}