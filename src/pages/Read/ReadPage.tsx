import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { observer } from "mobx-react";
import React from "react";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import BookStore from "../../stores/BookStore";
import {CircularLoading} from "../../utils/components/CircularLoading";
import BookReader from "./components/BookReader";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {theme} from "../../utils/style/themeConfig";
import {device} from "../../config/config";
import ReadStore from "../../stores/ReadStore";
import { updateLocation } from "./helpers/UpdateLocation";

const ReadPage = () => {

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
    ReadStore.setLocation(book.location);

    // Remember location in book on back
    const handleClick = () => {
        updateLocation(book.id).then(res => {
            navigate('/library');
        });
    }

    return (
        <Page>
            <ButtonsContainer>
                <IconContainer onClick={handleClick}><FontAwesomeIcon icon={faArrowLeft}/></IconContainer>
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
  top: 1rem;
  right: 1rem;
  text-align: center;
  z-index: 2;
`

const IconContainer = styled.div`
  border-radius: 100%;
  border: 3px solid ${theme.palette.primary.main};
  background-color: ${theme.palette.primary.main};
  color: white;
  padding: 7px;
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
  }
`
