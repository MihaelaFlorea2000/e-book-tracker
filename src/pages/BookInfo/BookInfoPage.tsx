import styled from "@emotion/styled";
import { observer } from "mobx-react";
import React, {ReactNode} from "react";
import {useParams} from "react-router-dom";
import BookStore from "../../stores/BookStore";
import {CircularLoading} from "../../utils/components/CircularLoading";
// @ts-ignore
import defaultCoverImage from  "../../utils/images/defaultCoverImage.jpeg";
import {border, theme} from "../../utils/style/themeConfig";
import {device} from "../../config/config";
import Rating from "@mui/material/Rating";
import {faBookOpen, faLanguage, faCalendar} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {BookRating} from "../../utils/components/BookRating";
import {toJS} from "mobx";
import ReadMore from "./components/ReadMore";
import Chip from "@mui/material/Chip";
import PublicationDetail from "./components/PublicationDetail";


const BookInfoPage = () => {

    const params = useParams();
    const bookId = Number(params.bookId);

    const book = BookStore.getBook(bookId);

    if (book === undefined) {
        return (
            <Page>
                <CircularLoading />
            </Page>
        )
    }

    const coverImage = book.coverImage !== null ? book.coverImage : defaultCoverImage;
    const showTitle = book.coverImage === null;

    let authorNodes: ReactNode[] = [];

    book.authors.forEach((author, index) => {
        authorNodes.push(
            <Author key={index}>{author}{index !== book.authors.length - 1 && ','}</Author>
        )
    })

    let tagNodes: ReactNode[] = [];

    book.tags.forEach((tag, index) => {
        tagNodes.push(
            <Chip
                key={tag}
                tabIndex={-1}
                label={tag}
            />
        )
    })

    console.log(toJS(book));

    return (
        <Page>
            <Container>
                <LeftContainer>
                    <CoverContainer>
                        <Image image={coverImage}/>
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
  gap: 20px;
  background-color: ${theme.palette.info.light};
  border-radius: ${border.borderRadius};
  padding: 10px;
`

const LeftContainer = styled.div`
  display: flex;
  flex-flow: column;
`

const CoverContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30vw;
  height: calc(30vw * 1.6);
`

const Image = styled.div<{image: string | undefined}>`
  background-image: url(${props => props.image});
  border-radius: ${border.borderRadius};
  background-size: cover;
  background-position: center;
  width: 90%;
  height: 90%;
`

const RightContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 20px;
  width: 100%;
`

const TitleContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 2px;
`

const Title = styled.h1`
    margin-bottom: 0;
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
  display: flex
`

const RatingContainer = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 5px solid ${theme.palette.primary.light};
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
`





