import '@emotion/react';

// Types for emotion theme
declare module '@emotion/react' {
    export interface Theme {
        palette: {
            primary: {
                light: string,
                main: string,
            },
            secondary: {
                main: string,
                dark: string
            },
            info: {
                light: string,
                main: string
            },
            warning: {
                main:  string
            }
        }
    }
}