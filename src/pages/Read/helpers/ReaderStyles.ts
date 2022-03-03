// @ts-ignore
import {ReactReaderStyle} from "react-reader";
import {getTheme} from "./ReaderColors";

export const defaultStyle = (isThemeOn:boolean) => {
    return {
        ...ReactReaderStyle,
        readerArea: {
            ...ReactReaderStyle.readerArea,
            backgroundColor: getTheme(isThemeOn).backgroundColor
        },
        arrow: {
            ...ReactReaderStyle.arrow,
            color: isThemeOn ? getTheme(isThemeOn).color : '#E2E2E2'
        },
    }
}

// Adjust book style on mobile
export const mobileStyle = (isMobile:boolean, isThemeOn:boolean) => {
    return {
        ...ReactReaderStyle,
        arrow: {
            ...ReactReaderStyle.arrow,
            height: '85vh',
            top: '15vh',
            color: 'transparent'
        },
        reader: {
            position: 'absolute',
            top: 50,
            left: 20,
            bottom: 20,
            right: 20
        },
        titleArea: {
            ...ReactReaderStyle.titleArea,
            width: '50vw',
            textAlign: 'left',
            fontSize: isMobile ? '0.8rem' : '1rem'
        },
        readerArea: {
            ...ReactReaderStyle.readerArea,
            backgroundColor: getTheme(isThemeOn).backgroundColor
        }
    }
}