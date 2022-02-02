// URL for talking to the backend
export const URL = 'https://comp3200-backend.herokuapp.com/'

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
    profile: '/profile'
}