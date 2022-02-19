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