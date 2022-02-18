import React, {ReactNode} from "react";
import { observer } from "mobx-react";
import styled from "@emotion/styled";
import { NavLink, useParams } from "react-router-dom";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import {
    faBookOpen,
    faLanguage,
    faCalendar,
    faEdit,
    faBookReader
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ConfirmBox from "./components/ConfirmBox";
import { CircularLoading } from "../../utils/components/CircularLoading";
import { BookRating } from "../../utils/components/BookRating";
import ReadMore from "./components/ReadMore";
import PublicationDetail from "./components/PublicationDetail";
import { border, theme } from "../../utils/style/themeConfig";
import { device } from "../../config/config";
import { useStore } from "../../stores/RootStore";
// @ts-ignore
import defaultCoverImage from  "../../utils/images/defaultCoverImage.jpeg";


const BookInfoPage = () => {

    // Get stores access
    const { bookStore, deleteStore } = useStore();

    // Get book
    const params = useParams();
    const bookId = Number(params.bookId);

    const book = bookStore.getBook(bookId);

    if (book === undefined || book.id === undefined) {
        return (
            <Page>
                <CircularLoading />
            </Page>
        )
    }

    // Handle books with no cover image
    const coverImage = book.coverImage !== null ? book.coverImage : defaultCoverImage;
    const showTitle = book.coverImage === null;

    // Create author nodes
    let authorNodes: ReactNode[] = [];

    book.authors.forEach((author, index) => {
        authorNodes.push(
            <Author key={index}>{author}{index !== book.authors.length - 1 && ','}</Author>
        )
    })

    // Create tag nodes
    let tagNodes: ReactNode[] = [];

    book.tags.forEach((tag) => {
        tagNodes.push(
            <Chip
                key={tag}
                tabIndex={-1}
                label={tag}
            />
        )
    })

    const error = deleteStore.getError();

    // Is the user on this page after a book edit?
    let url = new URL(window.location.href);
    let fromEdit = url.searchParams.get('fromEdit');

    return (
        <Page>
            <Container>
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
                    <NavLink to={`/book/read/${book.id}`}>
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
                    <NavLink to={`/book/read/${book.id}`}>
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
                <BookInfoContainer>
                    <LeftContainer>
                        <CoverContainer>
                            <Image image={coverImage}/>
                            {showTitle && <CoverTitle>{book.title}</CoverTitle>}
                        </CoverContainer>
                    </LeftContainer>
                    <RightContainer>
                        <TitleContainer>
                            <Title>{book.title}</Title>
                            {book.series && <Series>{book.series}</Series>}
                        </TitleContainer>
                        <AuthorsContainer>
                            by {authorNodes}
                        </AuthorsContainer>
                        <RatingContainer>
                            <BookRating value={book.rating} size="large" readOnly={true} />
                            <RatingValue>{book.rating}</RatingValue>
                        </RatingContainer>
                        <DescriptionContainer>
                            {book.description !== '' && <ReadMore text={book.description} />}
                        </DescriptionContainer>
                        <TagsContainer>
                            {tagNodes}
                        </TagsContainer>
                        <DetailsContainer>
                            {book.publisher !== '' && <PublicationDetail title="Publication" icon={faBookOpen} detail={book.publisher}/>}
                            {book.language !== '' && <PublicationDetail title="Language" icon={faLanguage} detail={book.language}/>}
                            {book.pubDate !== '' && <PublicationDetail title="Calendar" icon={faCalendar} detail={new Date(book.pubDate).toISOString().split('T')[0]}/>}
                        </DetailsContainer>
                    </RightContainer>
                </BookInfoContainer>
            </Container>

        </Page>
    )
}

export default observer(BookInfoPage);

const Page = styled.div`
    padding: 20px;
`

const Container = styled.div`
  display: flex;
  flex-flow: column;
  gap: 20px;
  background-color: ${theme.palette.info.light};
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

const BookInfoContainer = styled.div`
  display: flex;
  gap: 20px;

  @media only screen and ${device.tablet} {
    flex-flow: column;
    align-items: center;
    justify-content: center;
  }
`

const LeftContainer = styled.div`
  display: flex;
  flex-flow: column;

  @media only screen and ${device.tablet} {
    align-items: center;
    justify-content: center;
  }
`

const CoverContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30vw;
  height: calc(30vw * 1.6);
  position: relative;

  @media only screen and ${device.tablet} {
    width: 80vw;
    height: calc(80vw * 1.6);
  }
`

const Image = styled.div<{image: string | undefined}>`
  background-image: url(${props => props.image});
  border-radius: ${border.borderRadius};
  background-size: cover;
  background-position: center;
  width: 95%;
  height: 95%;
`

const CoverTitle = styled.h3`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  font-family: 'PoppinsRegular', sans-serif;
  font-size: 2rem;

  @media only screen and ${device.tablet} {
    width: 70%;
  }
`

const RightContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 20px;
  width: 100%;

  @media only screen and ${device.tablet} {
    width: 80vw;
    align-items: center;
    justify-content: center;
  }
`

const TitleContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 2px;

  @media only screen and ${device.tablet} {
    text-align: center;
  }
`

const Title = styled.h1`
  margin-bottom: 0;
  
  @media only screen and ${device.tablet} {
    margin-top: 0;
  }
  
`

const Series = styled.div`
  font-size: 1.2rem;
  color: ${theme.palette.info.main}
`

const AuthorsContainer = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  color: ${theme.palette.primary.main}
`

const Author = styled.div`
  display: flex;
`

const RatingContainer = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 5px solid ${theme.palette.primary.light};

  @media only screen and ${device.tablet} {
    flex-flow: column;
    align-items: center;
    justify-content: center;
    padding-bottom: 0;
    width: 100%;
  }
`
const RatingValue = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #bdbdbd;
  font-size: 1.2rem;
`

const DescriptionContainer = styled.div`
  padding: 5px;
`

const TagsContainer = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
`

const DetailsContainer = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;

  @media only screen and ${device.tablet} {
    flex-flow: column;
    align-items: center;
    justify-content: center;
  }
`






