// Colors the users can use to highlight
export const readerColors = {
    yellow: {
        light: "rgba(255,255,0,0.4)",
        dark: "rgba(255, 255, 0, 0.8)"
    },
    red: {
        light: "rgb(255, 111, 113, 0.3)",
        dark: "rgb(255, 111, 113, 0.8)"
    },

    blue: {
        light: "rgba(0, 255, 217, 0.3)",
        dark: "rgba(0, 255, 217, 0.8)"
    },
    green: {
        light: "rgba(117,249,111,0.4)",
        dark: "rgba(117, 249, 111, 0.8)"
    },
    orange: {
        light: "rgba(251, 120, 68, 0.3)",
        dark: "rgba(251, 120, 68, 0.8)"
    }
}

// Return the darker color given the lighter color
export const getHoverColor = (color:string):string => {
    switch (color) {
        case readerColors.yellow.light:
            return readerColors.yellow.dark
        case readerColors.red.light:
            return readerColors.red.dark
        case readerColors.blue.light:
            return readerColors.blue.dark
        case readerColors.green.light:
            return readerColors.green.dark
        case readerColors.orange.light:
            return readerColors.orange.dark
        default:
            return readerColors.yellow.light
    }
}

export const pageColors = {
    light: {
        color: "#000",
        backgroundColor: "#FFF"
    },
    yellow: {
        color: "#5E4B31",
        backgroundColor: "#FBF0D9"
    },
    dark: {
        color: "#C8C8C8",
        backgroundColor: "#000"
    }
}

export const getTheme = (isThemeOn:boolean) => {
    return isThemeOn ? pageColors.yellow : pageColors.light;
}