import styled from "@emotion/styled";
import React, {useEffect, useRef, useState} from "react";
import {ReactReader} from "react-reader";
import {Rendition} from "epubjs";
import {BookInterface} from "../../../config/interfaces";
import Button from "@mui/material/Button";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {device} from "../../../config/config";
import {useMediaQuery} from "@mui/material";
import ReadStore from "../../../stores/ReadStore";
import { observer } from "mobx-react";
import {updateLocation} from "../helpers/UpdateLocation";
import {defaultStyle, mobileStyle } from "../helpers/ReaderStyles";

interface Props {
    book: BookInterface;
}
const BookReader = (props: Props) => {

    // Change font size
    const [fontSize, setFontSize] = useState<number>(100);

    const changeSize = (newSize:number) => {
        setFontSize(newSize)
    }

    // Detect mobile width
    const isMobile = useMediaQuery(device.mobileL);

    // Render book
    const renditionRef = useRef<Rendition | undefined>();

    const locationChanged = (epubcifi:string | number ) => {
        ReadStore.setLocation(epubcifi);
        console.log(epubcifi);
    }

    const getRendition = (rendition:Rendition) => {
        const spine_get = rendition.book.spine.get.bind(rendition.book.spine);
        rendition.book.spine.get = function(target) {
            return spine_get(target);
        }

        renditionRef.current = rendition
        renditionRef.current.themes.fontSize(`${fontSize}%`);
        rendition.themes.register('custom', {
            "a:hover": {
                "color": "inherit"
            }
        })
        rendition.themes.select('custom')
    }

    useEffect(() => {
        if (renditionRef.current) {
            renditionRef.current.themes.fontSize(`${fontSize}%`)
        }
        window.addEventListener("beforeunload", handleRefresh);
        window.addEventListener("popstate", handleBack);
        return () => {
            window.removeEventListener("beforeunload", handleRefresh);
            window.addEventListener("popstate", handleBack);
        };
    }, [fontSize]);

    // Remember location in book on refresh
    const handleRefresh = (e:any) => {
        e.preventDefault();

        updateLocation(props.book.id).then(res => {
            console.log(res);
        });

        if (e) {
            e.returnValue = '';
        }

        return '';
    }

    // Remember location in book on back (in browser)
    const handleBack = () => {
        updateLocation(props.book.id).then(res => {
            console.log(res);
        });
    }

    const location = ReadStore.getLocation();

    return (
        <Container>
            <ReaderContainer>
                <ReactReader
                    url={props.book.file}
                    title={props.book.title}
                    location={location}
                    locationChanged={locationChanged}
                    getRendition={getRendition}
                    styles={isMobile ? mobileStyle(isMobile) : defaultStyle}
                    // swipeable={isMobile}
                />
            </ReaderContainer>
            <SettingsContainer>
                <Button onClick={() => changeSize(Math.max(80, fontSize - 10))}>
                    <FontAwesomeIcon className="fa-fw" icon={faMinus}/>
                </Button>
                <span>Font size: {fontSize}%</span>
                <Button onClick={() => changeSize(Math.min(200, fontSize + 10))}>
                    <FontAwesomeIcon className="fa-fw" icon={faPlus}/>
                </Button>
            </SettingsContainer>
        </Container>
    )
}

export default observer(BookReader);

const Container = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  position: relative;
`

const ReaderContainer = styled.div`
  height: 100vh;
  width: 100vw;
`
const SettingsContainer = styled.div`
  position: absolute;
  bottom: 1px;
  right: 1rem;
  left: 1rem;
  text-align: center;
  z-index: 1;
  background-color: white;

  @media only screen and ${device.mobileL} {
    font-size: 0.9rem;
  }
`
