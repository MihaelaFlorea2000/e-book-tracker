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