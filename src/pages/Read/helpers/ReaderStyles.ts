// @ts-ignore
import {ReactReaderStyle} from "react-reader";

export const defaultStyle = {
    ...ReactReaderStyle
}

// Adjust book style on mobile
export const mobileStyle = (isMobile:boolean) => {
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
        }
    }
}