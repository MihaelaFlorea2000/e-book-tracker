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
    seconds: number,
    milliseconds: number
}

export interface BookReadInterface {
    id: number,
    startDate: string,
    endDate: string,
    rating: number,
    notes: string,
    time: IntervalInterface,
    sessions: number
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
    value: number
}