import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@mui/material/Button";
import { observer } from "mobx-react";
import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import BookStore from "../../stores/BookStore";
import {CircularLoading} from "../../utils/components/CircularLoading";
import BookReader from "./components/BookReader";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

const ReadPage = () => {

    const params = useParams();
    const bookId = Number(params.bookId);

    const book = BookStore.getBook(bookId);
    const navigate = useNavigate();

    if (book === undefined || book.id === undefined) {
        return (
            <Page>
                <CircularLoading />
            </Page>
        )
    }

    return (
        <Page>
            <ButtonsContainer>
                <BackButton>
                    <Button
                        onClick={() => navigate('/library')}
                        startIcon={<FontAwesomeIcon className="fa-fw" icon={faArrowLeft}/>}
                        size="small"
                    >
                        Back
                    </Button>
                </BackButton>
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

const FontButton = styled.div`
`

const BackButton = styled.div`
`