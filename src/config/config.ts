// URL for talking to the backend
export const URL = 'https://comp3200-backend.herokuapp.com/'

// Routes in the app
export const ROUTES = {
    home: '*',
    user: {
        login: '*',
        register: '/register',
    },
    library: '/library',
    track: '/track',
    explore: '/explore',
    friends: '/friends',
    settings: '/settings',
    profile: '/profile',
    upload: '/upload'
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

