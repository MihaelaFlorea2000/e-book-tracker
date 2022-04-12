// Current user information
export interface UserInterface {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    profileImage: string
}

// User profile information
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

// Simplified user information need for search
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
    location: string,
    link?:string
}

// Simplified book information need for search
export interface SimpleBookInterface {
    id: number,
    title: string,
    coverImage: string
}

// Highlight Information
export interface HighlightInterface {
    id?: number,
    text: string,
    cfiRange: string,
    note: string,
    color: string
}

// Book Search Results
export interface SearchResultInterface {
    cfi: string,
    excerpt: string
}

// Time interval interface
export interface IntervalInterface {
    years?: number,
    months?: number,
    days?: number,
    hours?: number,
    minutes?: number,
    seconds?: number,
    milliseconds?: number
}

// Information about a Read
// start of book - finish of book
export interface ReadInterface {
    id: number,
    startDate: string,
    endDate: string,
    rating: number,
    notes: string,
    time: IntervalInterface,
    sessions: number
}

// Session Information
// open book - close book
export interface SessionInterface {
    id?: number,
    startDate: string,
    time: IntervalInterface
}

// Front end session
export interface FrontSessionInterface {
    id: string | undefined,
    startDate: string,
    hours: number,
    minutes: number,
}

// Data for numbered metrics
export interface NumbersInterface {
    booksRead: number,
    booksCurrRead: number,
    authorsReadCount: number,
    longestSession: IntervalInterface,
    avgTimePerSession: IntervalInterface,
    bestDay: string
}

// Data for percentage of books read chart
export interface PercentInterface {
    booksRead: number,
    totalBooks: number,
    value: number
}

// Goals set by the user
export interface NumberGoalsInterface {
    yearly: number,
    monthly: number,
    dailyHours: number,
    dailyMinutes: number
}

// Data for goal metrics
export interface PercentageGoalsInterface {
    yearly: number,
    monthly: number,
    daily: number
}

// Data for goals (doughnut) charts
export interface GoalsInterface {
    set: NumberGoalsInterface,
    done: NumberGoalsInterface,
    percentage: PercentageGoalsInterface
}

// Data for line and bar charts
export interface ChartDataInterface {
    labels: string[],
    dataValues: number[],
}

// All Settings
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

// Profile Settings
export interface ProfileSettingsInterface {
    profileVisibility: string,
    showGoals: boolean,
    showBooks: boolean,
    showNumbers: boolean
}

// Notification Interface
export interface NotificationInterface {
    senderId: number,
    receiverId: number,
    date: string,
    type: string,
    image: string | null,
    firstName: string | null,
    lastName: string | null
}

// Badge Information
export interface BadgeInterface {
    id: number,
    type: string,
    number: number,
    done: boolean
}