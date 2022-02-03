import { createTheme } from "@mui/material/styles"

export const theme = createTheme({
    palette: {
        primary: {
            light: '#f5f4f8',
            main: '#412234',
        },
        secondary: {
            main: '#CA7B73',
        },
        info: {
            light: '#ffffff',
            main: '#9094a3'
        }
    }
});

export const border = {
    borderRadius: "10px",
    border: `1px solid ${theme.palette.primary.light}`
}