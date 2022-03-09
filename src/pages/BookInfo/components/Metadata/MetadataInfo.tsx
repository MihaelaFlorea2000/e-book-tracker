import React, {ReactNode} from "react";
import styled from "@emotion/styled";
import {BookRating} from "../../../../utils/components/BookRating";
import ReadMore from "./ReadMore";
import IconDetail from "../../../../utils/components/IconDetail";
import {faBookOpen, faCalendar, faLanguage} from "@fortawesome/free-solid-svg-icons";
import {device} from "../../../../config/config";
import {BookInterface} from "../../../../config/interfaces";
// @ts-ignore
import defaultCoverImage from "../../../../utils/images/defaultCoverImage.jpeg";
import Chip from "@mui/material/Chip";
import { CoverContainer, CoverTitle, Image } from "../../../../utils/style/styledComponents";
import {useTheme} from "@mui/material";

interface Props {
    book: BookInterface;
}

const MetadataInfo = (props: Props) => {

    const theme = useTheme();
    // Handle books with no cover image
    const coverImage = props.book.coverImage !== null ? props.book.coverImage : defaultCoverImage;
    const showTitle = props.book.coverImage === null;

    // Create author nodes
    let authorNodes: ReactNode[] = [];

    props.book.authors.forEach((author, index) => {
        authorNodes.push(
            <Author key={index}>{author}{index !== props.book.authors.length - 1 && ','}</Author>
        )
    })

    // Create tag nodes
    let tagNodes: ReactNode[] = [];

    props.book.tags.forEach((tag) => {
        tagNodes.push(
            <Chip
                key={tag}
                tabIndex={-1}
                label={tag}
            />
        )
    })

    return (
        <BookInfoContainer>
            <LeftContainer>
                <CoverContainer>
                    <Image image={coverImage}/>
                    {showTitle && <CoverTitle>{props.book.title}</CoverTitle>}
                </CoverContainer>
            </LeftContainer>
            <RightContainer>
                <TitleContainer>
                    <Title>{props.book.title}</Title>
                    {props.book.series && <Series>{props.book.series}</Series>}
                </TitleContainer>
                <AuthorsContainer>
                    by {authorNodes}
                </AuthorsContainer>
                <RatingContainer>
                    <BookRating value={props.book.rating} size="large" readOnly={true} />
                    <RatingValue>{props.book.rating}</RatingValue>
                </RatingContainer>
                <DescriptionContainer>
                    {props.book.description !== '' && <ReadMore text={props.book.description} />}
                </DescriptionContainer>
                <TagsContainer>
                    {tagNodes}
                </TagsContainer>
                <DetailsContainer>
                    {props.book.publisher !== '' && <IconDetail borderColor="transparent" color={theme.palette.primary.main} size="large" title="Publication" icon={faBookOpen} detail={props.book.publisher}/>}
                    {props.book.language !== '' && <IconDetail borderColor="transparent" color={theme.palette.primary.main} size="large" title="Language" icon={faLanguage} detail={props.book.language}/>}
                    {props.book.pubDate !== '' && <IconDetail borderColor="transparent" color={theme.palette.primary.main} size="large" title="Publication Date" icon={faCalendar} detail={new Date(props.book.pubDate).toLocaleDateString()}/>}
                </DetailsContainer>
            </RightContainer>
        </BookInfoContainer>
    )
}

export default MetadataInfo;

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
  color: ${props => props.theme.palette.info.main}
`

const AuthorsContainer = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  color: ${props => props.theme.palette.primary.main}
`

const Author = styled.div`
  display: flex;
`

const RatingContainer = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 5px solid ${props => props.theme.palette.primary.light};

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
