
export const highlightColors = {
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

export const getHoverColor = (color:string):string => {
    switch (color) {
        case highlightColors.yellow.light:
            return highlightColors.yellow.dark
        case highlightColors.red.light:
            return highlightColors.red.dark
        case highlightColors.blue.light:
            return highlightColors.blue.dark
        case highlightColors.green.light:
            return highlightColors.green.dark
        case highlightColors.orange.light:
            return highlightColors.orange.dark
        default:
            return highlightColors.yellow.light
    }
}