// URL for talking to the backend
export const BACKEND_URL = 'https://comp3200-backend.herokuapp.com/';

// Routes in the app
export const ROUTES = {
    library: '*',
    user: {
        login: '*',
        register: '/register',
    },
    track: {
        main: '/track',
        goals: '/track/goals'
    },
    explore: '/explore',
    friends: {
        all: '/friends',
        mutual: '/friends/mutual/:userId'
    },
    settings: '/settings',
    badges: '/badges',
    profile: '/profile/:userId',
    book: {
        upload1: '/upload/1',
        upload2: '/upload/2',
        info: '/book/:bookId',
        reader: '/book/reader/:bookId',
        edit: '/book/edit/:bookId',
    },
    read: {
        add: '/book/:bookId/read/add',
        edit: '/book/:bookId/read/:readId/edit',
    },
    search: '/search'
}

// Breakpoints for media queries
const size = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px'
}

export const device = {
    mobileS: `(max-width: ${size.mobileS})`,
    mobileM: `(max-width: ${size.mobileM})`,
    mobileL: `(max-width: ${size.mobileL})`,
    tablet: `(max-width: ${size.tablet})`,
    laptop: `(max-width: ${size.laptop})`,
    laptopL: `(max-width: ${size.laptopL})`,
    desktop: `(max-width: ${size.desktop})`,
    desktopL: `(max-width: ${size.desktop})`
}

