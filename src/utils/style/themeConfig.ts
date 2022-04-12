/**
 * Light and dark theme color palettes
 */

import { createTheme } from "@mui/material/styles"
import {Theme} from "@emotion/react";

export const theme: Theme = {
    palette: {
        primary: {
            light: '#f5f4f8',
            main: '#412234',
        },
        secondary: {
            main: '#CA7B73',
            dark: '#000'
        },
        info: {
            light: '#ffffff',
            main: '#9094a3'
        },
        warning: {
            main:  'rgba(255, 255, 255, 0.5)'
        }
    }
};

export const darkTheme: Theme = {
    palette: {
        primary: {
            light: '#2F3135',
            main: '#CA7B73',
        },
        secondary: {
            main: '#CA7B73',
            dark: '#fff'
        },
        info: {
            light: '#1e1e1e',
            main: '#ddd'
        },
        warning: {
            main:  'rgba(0, 0, 0, 0.5)'
        }
    }
};

export const lightThemeMui = createTheme({
    palette: {
        primary: {
            light: '#f5f4f8',
            main: '#412234',
        },
        secondary: {
            main: '#CA7B73',
            dark: '#000'
        },
        info: {
            light: '#ffffff',
            main: '#9094a3'
        },
        warning: {
            main:  'rgba(255, 255, 255, 0.5)'
        }
    }
});

export const darkThemeMUI = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            light: '#2F3135',
            main: '#CA7B73',
        },
        secondary: {
            main: '#CA7B73',
            dark: '#fff'
        },
        info: {
            light: '#121212',
            main: '#fff'
        },
        warning: {
            main:  'rgba(0, 0, 0, 0.5)'
        }
    }
});

export const border = {
    borderRadius: "10px"
}