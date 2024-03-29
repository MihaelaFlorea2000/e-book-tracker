import React from "react";
import { observer } from "mobx-react";
import styled from "@emotion/styled";
import { NavLink, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import {
    faEdit,
    faBookReader,
    faAngleRight
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ConfirmBox from "./components/Metadata/ConfirmBox";
import { CircularLoading } from "../../utils/components/CircularLoading";
import { border } from "../../utils/style/themeConfig";
import { device } from "../../utils/helpers/constants";
import { useStore } from "../../stores/RootStore";
import MetadataInfo from "./components/Metadata/MetadataInfo";
import ReadInfo from "./components/ReadInfo/ReadInfo";

/**
 * Page displaying book metadata and metrics
 * @constructor
 */
const BookInfoPage = () => {

    // Get stores access
    const { bookStore, deleteStore, userStore } = useStore();

    // Is the user on this page after a book edit?
    let url = new URL(window.location.href);
    let fromEdit = url.searchParams.get('fromEdit');

    // Is this a google book?
    let fromAPI = url.searchParams.get('fromAPI');

    // Get book
    const params = useParams();
    const book = fromAPI !== null ? bookStore.getAPIBook(String(params.bookId)) : bookStore.getBook(Number(params.bookId));

    // Get current user
    const user = userStore.getCurrentUser();

    // Loading
    if (book === undefined || book.id === undefined || user === undefined) {
        return (
            <Page>
                <CircularLoading />
            </Page>
        )
    }

    // Is this the current user's book
    if (book.userId === user.id) {
        bookStore.setIsOwner(true);
    }

    const error = deleteStore.getError();

    return (
        <Page>
            <Container>
                {bookStore.isOwner() && fromAPI === null &&
                    <>
                        <ButtonsContainerDesktop>
                            <NavLink to={`/book/edit/${book.id}`}>
                                <Button
                                    type="button"
                                    variant="contained"
                                    size="medium"
                                    startIcon={<FontAwesomeIcon className="fa-fw" icon={faEdit}/>}
                                >
                                    Edit
                                </Button>
                            </NavLink>
                            <NavLink to={`/book/reader/${book.id}`}>
                                <Button
                                    type="button"
                                    variant="contained"
                                    size="medium"
                                    startIcon={<FontAwesomeIcon className="fa-fw" icon={faBookReader}/>}
                                >
                                    Read
                                </Button>
                            </NavLink>
                            <ConfirmBox bookId={book.id} />
                        </ButtonsContainerDesktop>
                        <ButtonsContainerMobile>
                            <NavLink to={`/book/edit/${book.id}`}>
                                <Button
                                    type="button"
                                    variant="contained"
                                    size="large"
                                >
                                    <FontAwesomeIcon className="fa-fw" icon={faEdit}/>
                                </Button>
                            </NavLink>
                            <NavLink to={`/book/reader/${book.id}`}>
                                <Button
                                    type="button"
                                    variant="contained"
                                    size="large"
                                >
                                    <FontAwesomeIcon className="fa-fw" icon={faBookReader}/>
                                </Button>
                            </NavLink>
                            <ConfirmBox bookId={book.id}/>
                        </ButtonsContainerMobile>
                        {error !== '' && <ErrorContainer><Alert severity="error">{error}</Alert></ErrorContainer>}
                        {fromEdit !== null && <Alert severity="success">Book successfully updated</Alert> }
                    </>
                }
                {fromAPI !== null &&
                    <a href={book.link ? book.link : ''} target="_blank">
                        <Button
                            type="button"
                            variant="contained"
                            size="medium"
                            startIcon={<FontAwesomeIcon className="fa-fw" icon={faAngleRight}/>}
                        >
                            More
                        </Button>
                    </a>
                }
                <MetadataInfo book={book} />
            </Container>
            {fromAPI === null &&
                <ReadInfo book={book}/>
            }
        </Page>
    )
}

export default observer(BookInfoPage);

const Page = styled.div`
  padding: 20px;
  display: flex;
  flex-flow: column;
  gap: 20px;
  color: ${props => props.theme.palette.secondary.dark}
`

const Container = styled.div`
  display: flex;
  flex-flow: column;
  gap: 20px;
  background-color: ${props => props.theme.palette.info.light};
  border-radius: ${border.borderRadius};
  padding: 20px;

  @media only screen and ${device.tablet} {
    flex-flow: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }
`

const ButtonsContainerDesktop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-top: 20px;
  
  button {
    width: 110px;
  }

  @media only screen and ${device.tablet} {
    display: none;
  }
`

const ButtonsContainerMobile = styled.div`
  display: none;

  @media only screen and ${device.tablet} {
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: space-around;
    padding-top: 20px;
    
    button {
      font-size: 1.3rem;
    }
  }
`

const ErrorContainer = styled.div`
  padding: 10px;

  @media only screen and ${device.tablet} {
    width: 100%;
    margin-top: 5px;
  }
`








