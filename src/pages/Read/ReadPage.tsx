import React from "react";
import { useNavigate, useParams} from "react-router-dom";
import { observer } from "mobx-react";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faStickyNote,
    faHighlighter
} from "@fortawesome/free-solid-svg-icons";
import { CircularLoading } from "../../utils/components/CircularLoading";
import { theme } from "../../utils/style/themeConfig";
import SideMenu from "../../utils/components/SideMenu";
import { device } from "../../config/config";
import { updateLocation } from "./helpers/UpdateLocation";
import HighlightMenu from "./components/HighlightMenu";
import BookReader from "./components/BookReader";
import { useStore } from "../../stores/RootStore";

const ReadPage = () => {

    const navigate = useNavigate();

    // Get stores access
    const { readStore, bookStore } = useStore();

    // Get book
    const params = useParams();
    const bookId = Number(params.bookId);

    const book = bookStore.getBook(bookId);

    // Loading book
    if (book === undefined || book.id === undefined) {
        return (
            <Page>
                <CircularLoading />
            </Page>
        )
    }

    const selections = readStore.getSelections(bookId);

    // Loading book
    if (selections === undefined) {
        return (
            <Page>
                <CircularLoading />
            </Page>
        )
    }

    // Remember location in book on back
    const handleBackClick = () => {
        updateLocation(book.id, readStore, bookStore).then(res => {
            navigate('/');
        });
    }

    // Check if highlight is on
    const highlightOn = readStore.isHighlightOn();

    // Open the highlights menu
    const handleHighlightClick = () => {
        const newHighlightOn = !highlightOn;
        readStore.setIsHighlightOn(newHighlightOn);

        if (readStore.getCurrentSelection() !== null && newHighlightOn) {
            readStore.setHighlightDialog(true);
        }
    };

    if (readStore.isFirstRender()) {
        readStore.setLocation(book.location);
        readStore.setFirstRender(false);
    }


    return (
        <Page>
            <ButtonsContainer>
                <HighlightButton color={highlightOn ? theme.palette.secondary.main : theme.palette.primary.main} onClick={handleHighlightClick}><FontAwesomeIcon icon={faHighlighter}/></HighlightButton>
                <SideMenu fontSize="1.6rem" buttonSize="medium" icon={faStickyNote} direction="right" menu={<HighlightMenu book={book} selections={selections}/>} />
                <BackButton onClick={handleBackClick}><FontAwesomeIcon icon={faArrowLeft}/></BackButton>
            </ButtonsContainer>
            <BookReader book={book} selections={selections}/>
        </Page>
    )
}

export default observer(ReadPage);

const Page = styled.div`
`

const ButtonsContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  text-align: center;
  z-index: 2;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
`

const HighlightButton = styled.div<{color:string}>`
  color: ${props => props.color};
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 35px;
  height: 35px;

  @media only screen and ${device.mobileL} {
    width: 30px;
    height: 30px;
  }
`


const BackButton = styled.div`
  border-radius: 100%;
  border: 3px solid ${theme.palette.primary.main};
  background-color: ${theme.palette.primary.main};
  color: white;
  padding: 7px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.5s, background-color 0.5s;
  cursor: pointer;
  
  :hover {
    background-color: ${theme.palette.primary.light};
    color: ${theme.palette.primary.main};
  }

  @media only screen and ${device.mobileL} {
    padding: 5px;
    font-size: 0.9rem;
    width: 30px;
    height: 30px;
  }
`