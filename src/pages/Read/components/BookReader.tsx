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
import { defaultStyle, mobileStyle } from "../helpers/ReaderStyles";
import { highlightColors } from "../helpers/HighlightColors";
import HighlightDialog from "./HighlightDialog";
import { useStore } from "../../../stores/RootStore";
import {toJS} from "mobx";

interface Props {
    book: BookInterface,
    selections: HighlightInterface[];
}

interface Toc {
    label: string;
    href: string;
}

const BookReader = (props: Props) => {

    // Get ReadStore
    const { readStore } = useStore();

    // Change font size
    const [fontSize, setFontSize] = useState<number>(100);

    const changeSize = (newSize:number) => {
        setFontSize(newSize)
    }

    // Detect mobile width
    const isMobile = useMediaQuery(device.mobileL);

    // Render book
    const [page, setPage] = useState('')
    const renditionRef = useRef<Rendition | null>(null);
    const tocRef = useRef(null);

    const locationChanged = (epubcifi:string | number ) => {
        if (renditionRef.current && tocRef.current) {
            const { displayed, href } = renditionRef.current.location.start
            // @ts-ignore
            const chapter = tocRef.current.find((item) => item.href === href)
            setPage(`Page ${displayed.page} of ${displayed.total} in chapter ${chapter ? chapter.label : ''}`)
        }
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


    //For updating font size
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
                    // @ts-ignore
                    tocChanged={toc => tocRef.current = toc}
                    styles={isMobile ? mobileStyle(isMobile) : defaultStyle}
                />
            </ReaderContainer>
            <BottomContainer>
                <SettingsContainer>
                    <Button onClick={() => changeSize(Math.max(80, fontSize - 10))}>
                        <FontAwesomeIcon className="fa-fw" icon={faMinus}/>
                    </Button>
                    <span><FontSizeText>Font size: </FontSizeText>{fontSize}%</span>
                    <Button onClick={() => changeSize(Math.min(200, fontSize + 10))}>
                        <FontAwesomeIcon className="fa-fw" icon={faPlus}/>
                    </Button>
                </SettingsContainer>
                <PageContainer>
                    {page}
                </PageContainer>
            </BottomContainer>
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


const BottomContainer = styled.div`
  position: absolute;
  bottom: 3px;
  right: 1rem;
  left: 1rem;
  text-align: center;
  z-index: 1;
  background-color: white;
  display: flex;
  justify-content: space-around;
  font-size: 0.95rem; 

  @media only screen and ${device.mobileL} {
    font-size: 0.8rem;
  }
`

const SettingsContainer = styled.div`
`

const PageContainer = styled.div`
`

const FontSizeText = styled.span`
  @media only screen and ${device.mobileL} {
    display: none;
  }
`
