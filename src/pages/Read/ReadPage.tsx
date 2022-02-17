import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { observer } from "mobx-react";
import React, {useEffect, useState } from "react";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import BookStore from "../../stores/BookStore";
import {CircularLoading} from "../../utils/components/CircularLoading";
import BookReader from "./components/BookReader";
import {faArrowLeft, faStickyNote, faHighlighter} from "@fortawesome/free-solid-svg-icons";
import {theme} from "../../utils/style/themeConfig";
import {device} from "../../config/config";
import ReadStore from "../../stores/ReadStore";
import { updateLocation } from "./helpers/UpdateLocation";
import HighlightMenu from "./components/HighlightMenu";
import SideMenu from "../../utils/components/SideMenu";
import HighlightDialog from "./components/HighlightDialog";
import {toJS} from "mobx";
import {useStore} from "../../stores/RootStore";
import {Contents} from "epubjs";

const ReadPage = () => {

    const { readStore } = useStore();

    const navigate = useNavigate();

    // Get book
    const params = useParams();
    const bookId = Number(params.bookId);

    const book = BookStore.getBook(bookId);

    // Loading book
    if (book === undefined || book.id === undefined) {
        return (
            <Page>
                <CircularLoading />
            </Page>
        )
    }

    // Set location in state
    readStore.setLocation(book.location);

    const highlightOn = readStore.isHighlightOn();


    // Remember location in book on back
    const handleBackClick = () => {
        updateLocation(book.id, readStore).then(res => {
            navigate('/library');
        });
    }

    //console.log(highlightOn);
    // Open the highlights menu
    const handleHighlightClick = () => {
        const newHighlightOn = !highlightOn;
        readStore.setIsHighlightOn(newHighlightOn);

        if(newHighlightOn) {
            console.log("on")
        } else {
            console.log("off")
            readStore.setCurrentSelection(null);
        }
    };


    return (
        <Page>
            <ButtonsContainer>
                <HighlightButton color={highlightOn ? theme.palette.secondary.main : theme.palette.primary.main} onClick={handleHighlightClick}><FontAwesomeIcon icon={faHighlighter}/></HighlightButton>
                <SideMenu fontSize="1.6rem" buttonSize="medium" icon={faStickyNote} direction="right" menu={<HighlightMenu />} />
                <BackButton onClick={handleBackClick}><FontAwesomeIcon icon={faArrowLeft}/></BackButton>
            </ButtonsContainer>
            <BookReader book={book}/>
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

const HighlightButton = styled.div<{color:string}>`
  color: ${props => props.color};
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 35px;
  height: 35px;
  
  // svg {
  //   transition: color 0.5s;
  // }
  //
  // :hover svg{
  //   color: ${theme.palette.secondary.main};
  // }

  @media only screen and ${device.mobileL} {
    width: 30px;
    height: 30px;
  }
`
