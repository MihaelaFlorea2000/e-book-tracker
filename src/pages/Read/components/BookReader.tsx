import React, { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react";
import styled from "@emotion/styled";
import { ReactReader } from "react-reader";
import { Contents, Rendition } from "epubjs";
import Button from "@mui/material/Button";
import { useMediaQuery } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import {BookInterface, HighlightInterface} from "../../../config/interfaces";
import { device } from "../../../config/config";
import { updateLocation } from "../helpers/UpdateLocation";
import { defaultStyle, mobileStyle } from "../helpers/ReaderStyles";
import { highlightColors } from "../helpers/HighlightColors";
import HighlightDialog from "./HighlightDialog";
import { useStore } from "../../../stores/RootStore";
import {toJS} from "mobx";

interface Props {
    book: BookInterface,
    selections: HighlightInterface[];
}

const BookReader = (props: Props) => {

    // Get ReadStore
    const { readStore, bookStore } = useStore();

    // Change font size
    const [fontSize, setFontSize] = useState<number>(100);

    const changeSize = (newSize:number) => {
        setFontSize(newSize)
    }

    // Detect mobile width
    const isMobile = useMediaQuery(device.mobileL);

    // Render book
    const renditionRef = useRef<Rendition | null>(null);

    const locationChanged = (epubcifi:string | number ) => {
        readStore.setLocation(epubcifi);
        console.log(epubcifi);
    }


    const getRendition = (rendition:Rendition) => {
        const spine_get = rendition.book.spine.get.bind(rendition.book.spine);
        rendition.book.spine.get = function(target) {
            return spine_get(target);
        }

        readStore.setRendition(rendition);
        renditionRef.current = rendition;
        renditionRef.current.themes.fontSize(`${fontSize}%`);
        // renditionRef.current.themes.default({
        //     '::selection': {
        //         'background': 'yellow'
        //     }
        // })

        // Get and color selections
        if (props.book.id !== undefined) {
            const selections = readStore.getSelections(props.book.id);
            console.log(toJS(selections));

            if (selections !== undefined) {
                selections.forEach((selection) => {
                    if(rendition) {
                        rendition.annotations.add("highlight", selection.cfiRange, {}, undefined , "hl", {"fill": `${selection.color}`, "fill-opacity": "0.8", "mix-blend-mode": "multiply"})
                    }
                })
            }
        }
        rendition.themes.register('custom', {
            "a:hover": {
                "color": "inherit"
            }
        })
        rendition.themes.select('custom')
    }

    // For updating location on leave
    useEffect(() => {
        window.addEventListener("beforeunload", handleRefresh);
        window.addEventListener("popstate", handleBack);
        return () => {
            window.removeEventListener("beforeunload", handleRefresh);
            window.addEventListener("popstate", handleBack);
        };
    }, []);

    // For updating font size
    useEffect(() => {
        if (renditionRef.current) {
            renditionRef.current.themes.fontSize(`${fontSize}%`)
        }
    }, [fontSize]);

    // For highlights
    useEffect(() => {
        const renditionState = readStore.getRendition();
        if (renditionState) {
            renditionState.on("selected", setRenderSelection);
            return () => {
                if (renditionState) {
                    renditionState.off("selected", setRenderSelection);
                }
            }
        }
    }, [readStore.rendition, readStore.currentSelection])

    const [contents, setContents] = useState<Contents | undefined>(undefined);

    const setRenderSelection = (cfiRange:string, contents:Contents) => {
        const renditionState = readStore.getRendition();
        if (renditionState) {
            readStore.setCurrentSelection({
                text: renditionState.getRange(cfiRange).toString(),
                cfiRange,
                note: "",
                color: highlightColors.yellow.light
            });

            setContents(contents);
        }
    }

    // Remember location in book on refresh
    const handleRefresh = (e:any) => {
        e.preventDefault();

        updateLocation(props.book.id, readStore, bookStore).then(res => {
            console.log(res);
        });
        readStore.reset();

        if (e) {
            e.returnValue = '';
        }

        return '';
    }

    // Remember location in book on back (in browser)
    const handleBack = () => {
        updateLocation(props.book.id, readStore, bookStore).then(res => {
            console.log(res);
        });
        readStore.reset();
    }

    const location = readStore.getLocation();

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
            <HighlightDialog contents={contents} book={props.book}/>
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
