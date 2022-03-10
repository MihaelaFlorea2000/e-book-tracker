import React, { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react";
import styled from "@emotion/styled";
import { ReactReader } from "react-reader";
import { Contents, Rendition } from "epubjs";
import Button from "@mui/material/Button";
import { useMediaQuery } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import {BookInterface, HighlightInterface, SettingsInterface} from "../../../config/interfaces";
import { device } from "../../../config/config";
import { defaultStyle, mobileStyle } from "../helpers/ReaderStyles";
import {getReaderStyles, getTheme, readerColors} from "../helpers/ReaderColors";
import HighlightDialog from "./HighlightDialog";
import { useStore } from "../../../stores/RootStore";
import {toJS} from "mobx";
import FinishedDialog from "./FinishedDialog";

interface Props {
    book: BookInterface,
    selections: HighlightInterface[],
    settings: SettingsInterface
}

interface Toc {
    id: string,
    label: string,
    href: string,
    subitems: Toc[],
    parent: string | undefined
}

const BookReader = (props: Props) => {

    // Get ReaderStore
    const { readerStore } = useStore();

    // Change font size
    const [fontSize, setFontSize] = useState<number>(props.settings.fontSize);

    const changeSize = (newSize:number) => {
        setFontSize(newSize)
    }

    // Detect mobile width
    const isMobile = useMediaQuery(device.mobileL);

    const pageColor = getReaderStyles(props.settings.readerTheme);

    // Render book
    const [page, setPage] = useState('')
    const renditionRef = useRef<Rendition | null>(null);

    const locationChanged = (epubcifi:string | number ) => {
        if (renditionRef.current) {
            const { displayed } = renditionRef.current.location.start
            setPage(`${displayed.total - displayed.page} pages left in chapter`)

            // Is book finished?
            const bookEnd = renditionRef.current.location.atEnd;
            const textCfi = epubcifi.toString().startsWith("text")
            if ( bookEnd && !textCfi ) {
                readerStore.setFinishedDialog(true);
            }
        }
        readerStore.setLocation(epubcifi);
        console.log(epubcifi);
    }

    const getRendition = (rendition:Rendition) => {
        console.log(rendition.book.spine)
        const spine_get = rendition.book.spine.get.bind(rendition.book.spine);
        rendition.book.spine.get = function(target) {
            // let t = spine_get(target);
            // console.log(target)
            // console.log(t)
            // // @ts-ignore
            // while ((t === null) && target.startsWith("../")) {
            //     console.log(t)
            //     // @ts-ignore
            //     target = target.substring(3);
            //     t = spine_get(target);
            // }
            // return t
            return spine_get(target);
        }



        rendition.themes.register('custom', {
            "body": {
                "background-color": pageColor.backgroundColor,
                "color": pageColor.color
            },
            "a:hover": {
                "color": "inherit"
            }
        })

        rendition.themes.select('custom');

        readerStore.setRendition(rendition);
        renditionRef.current = rendition;
        renditionRef.current.themes.fontSize(`${fontSize}%`);

        // Get and color selections
        if (props.book.id !== undefined) {
            const selections = readerStore.getSelections(props.book.id);
            console.log(toJS(selections));

            if (selections !== undefined) {
                selections.forEach((selection) => {
                    if(rendition) {
                        rendition.annotations.add("highlight", selection.cfiRange, {}, undefined , "hl", {"fill": `${selection.color}`, "fill-opacity": "0.8", "mix-blend-mode": "multiply"})
                    }
                })
            }
        }
    }

    //For updating font size
    useEffect(() => {
        if (renditionRef.current) {
            renditionRef.current.themes.fontSize(`${fontSize}%`)
        }
    }, [fontSize]);

    // For highlights
    useEffect(() => {
        const renditionState = readerStore.getRendition();
        if (renditionState) {
            renditionState.on("selected", setRenderSelection);
            return () => {
                if (renditionState) {
                    renditionState.off("selected", setRenderSelection);
                }
            }
        }
    }, [readerStore.rendition, readerStore.currentSelection])

    const [contents, setContents] = useState<Contents | undefined>(undefined);

    const setRenderSelection = (cfiRange:string, contents:Contents) => {
        const renditionState = readerStore.getRendition();
        if (renditionState) {
            readerStore.setCurrentSelection({
                text: renditionState.getRange(cfiRange).toString(),
                cfiRange,
                note: "",
                color: readerColors.yellow.light
            });

            setContents(contents);
        }
    }

    const location = readerStore.getLocation();
    const isThemeOn = readerStore.isThemeOn()

    return (
        <Container>
            <ReaderContainer>
                <ReactReader
                    url={props.book.file}
                    title={props.book.title}
                    location={location}
                    locationChanged={locationChanged}
                    getRendition={getRendition}
                    styles={isMobile ? mobileStyle(isMobile, pageColor) : defaultStyle(pageColor)}
                />
            </ReaderContainer>
            <BottomContainer backgroundColor={getTheme(isThemeOn).backgroundColor} color={getTheme(isThemeOn).color}>
                <SettingsContainer>
                    <Button onClick={() => changeSize(Math.max(80, fontSize - 10))}>
                        <FontSizeIcon color={pageColor.buttonsColor}><FontAwesomeIcon className="fa-fw" icon={faMinus}/></FontSizeIcon>
                    </Button>
                    <FontSizeSpan color={pageColor.color}><FontSizeText>Font size: </FontSizeText>{fontSize}%</FontSizeSpan>
                    <Button onClick={() => changeSize(Math.min(200, fontSize + 10))}>
                        <FontSizeIcon color={pageColor.buttonsColor}><FontAwesomeIcon className="fa-fw" icon={faPlus}/></FontSizeIcon>
                    </Button>
                </SettingsContainer>
                <PageContainer>
                    {page}
                </PageContainer>
            </BottomContainer>
            <HighlightDialog contents={contents} book={props.book}/>
            <FinishedDialog book={props.book}/>
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


const BottomContainer = styled.div<{backgroundColor: string, color: string}>`
  position: absolute;
  bottom: 3px;
  right: 1rem;
  left: 1rem;
  text-align: center;
  z-index: 1;
  display: flex;
  justify-content: space-around;
  font-size: 0.95rem; 
  color: ${props => props.color};


  @media only screen and ${device.mobileL} {
    font-size: 0.8rem;
  }
`

const SettingsContainer = styled.div`
`

const PageContainer = styled.div`
`

const FontSizeSpan = styled.span<{color: string}>`
  color: ${props => props.color}
`

const FontSizeText = styled.span`
  @media only screen and ${device.mobileL} {
    display: none;
  }
`

const FontSizeIcon = styled.div<{color: string}>`
    color: ${props => props.color}
`
