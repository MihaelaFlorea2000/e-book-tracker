// @ts-ignore
import {ReactReaderStyle} from "react-reader";

export const defaultStyle = {
    ...ReactReaderStyle
}

export const mobileStyle = (isMobile:boolean) => {
    return {
        ...ReactReaderStyle,
        arrow: {
            ...ReactReaderStyle.arrow,
            height: '100vh',
            top: '0',
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
            width: '72vw',
            textAlign: 'center',
            fontSize: isMobile ? '0.9rem' : '1rem'
        }
    }
}