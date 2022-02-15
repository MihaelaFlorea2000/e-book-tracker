import styled from "@emotion/styled";
import React, {useEffect, useRef, useState} from "react";
// @ts-ignore
import {ReactReader, ReactReaderStyle} from "react-reader";
import {Rendition} from "epubjs";
import {BookInterface} from "../../../config/interfaces";
import Button from "@mui/material/Button";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {device} from "../../../config/config";
import {useMediaQuery} from "@mui/material";

interface Props {
    book: BookInterface;
}
const BookReader = (props: Props) => {

    const [location, setLocation] = useState<string | number>("epubcfi(/6/6[titlepage]!/4/2/12[pgepubid00003]/3:0)")
    const [size, setSize] = useState<number>(100)
    const renditionRef = useRef<Rendition | undefined>();
    const isMobile = useMediaQuery(device.mobileL);

    const changeSize = (newSize:number) => {
        setSize(newSize)
    }

    const locationChanged = (epubcifi:string | number ) => {
        setLocation(epubcifi);
        console.log(epubcifi);
    }

    const getRendition = (rendition:Rendition) => {
        const spine_get = rendition.book.spine.get.bind(rendition.book.spine);
        rendition.book.spine.get = function(target) {
            let t = spine_get(target);
            console.log(t);
            // while ((t == null) && target.startsWith("../")) {
            //     target = target.substring(3);
            //     t = spine_get(target);
            // }
            return t;
        }

        renditionRef.current = rendition
        renditionRef.current.themes.fontSize(`${size}%`)
    }

    useEffect(() => {
        if (renditionRef.current) {
            renditionRef.current.themes.fontSize(`${size}%`)
        }
    }, [size])

    const defaultStyle = {
        ...ReactReaderStyle
    }

    const hideArrows = {
        ...ReactReaderStyle,
        arrow: {
            ...ReactReaderStyle.arrow,
            display: 'none'
        }
    }

    return (
        <Container>
            <ReaderContainer>
                <ReactReader
                    url={props.book.file}
                    title={props.book.title}
                    location={location}
                    locationChanged={locationChanged}
                    getRendition={getRendition}
                    styles={isMobile ? hideArrows : defaultStyle}
                    swipeable={isMobile}
                />
            </ReaderContainer>
            <SettingsContainer>
                <Button onClick={() => changeSize(Math.max(80, size - 10))}>
                    <FontAwesomeIcon className="fa-fw" icon={faMinus}/>
                </Button>
                <span>Font size: {size}%</span>
                <Button onClick={() => changeSize(Math.min(200, size + 10))}>
                    <FontAwesomeIcon className="fa-fw" icon={faPlus}/>
                </Button>
            </SettingsContainer>
        </Container>
    )
}

export default BookReader;

const Container = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
`

const ReaderContainer = styled.div`
  height: 100vh;
  width: 100vw;
`
const SettingsContainer = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  left: 1rem;
  text-align: center;
  z-index: 1;
`
