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
    series: string
}