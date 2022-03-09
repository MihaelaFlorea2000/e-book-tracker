import React from "react";
import { NavLink } from "react-router-dom";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookReader, faInfo } from "@fortawesome/free-solid-svg-icons";
import {BookInterface, BookSearchInterface} from "../../config/interfaces";
import { border } from "../style/themeConfig";
// @ts-ignore
import defaultCoverImage from "../images/defaultCoverImage.jpeg";

interface Props {
    book: BookInterface | BookSearchInterface;
}

const Book = (props: Props) => {

    // Handle books without covers
    const coverImage = props.book.coverImage !== null ? props.book.coverImage : defaultCoverImage;
    const showTitle = props.book.coverImage === null;

    return (
        <BookContainer >
            <CoverContainer>
                <BookImage image={coverImage} />
                {showTitle && <Title>{props.book.title}</Title>}
            </CoverContainer>
            <OptionsOverlay>
                <ButtonContainer>
                    <NavLink to={`/book/reader/${props.book.id}`}>
                        <StyledButton
                            variant="contained"
                            size="small"
                            startIcon={<FontAwesomeIcon className="fa-fw" icon={faBookReader}/>}
                        > Read </StyledButton>
                    </NavLink>
                    <NavLink to={`/book/${props.book.id}`}>
                        <StyledButton
                            variant="contained"
                            size="small"
                            startIcon={<FontAwesomeIcon className="fa-fw" icon={faInfo}/>}
                        > Info </StyledButton>
                    </NavLink>
                </ButtonContainer>
            </OptionsOverlay>
        </BookContainer>
    )
}

export default Book;

const BookContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  position: relative;

  div:nth-of-type(2) {
    background-color: transparent;;
  }

  :hover div:nth-of-type(2) {
    background-color: ${props => props.theme.palette.warning.main};
  }
`

const CoverContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  position: relative;
`

const BookImage = styled.div<{image: string}>`
  border-radius: ${border.borderRadius};
  position: relative;
  width: 157px;
  height: calc(157px * 1.6);
  background-image: url(${props => props.image});
  background-size: 157px calc(157px * 1.6);
  background-repeat: no-repeat;
`

const Title = styled.h3`
  position: absolute;
  width: 130px;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  font-family: 'PoppinsRegular', sans-serif;
`

const OptionsOverlay = styled.div`
  background-color: rgba(255,255,255,0);
  border-radius: ${border.borderRadius};
  background-size: cover;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.5s;
  cursor: pointer;
  
  :hover div {
    opacity: 1;
  }
`

const ButtonContainer = styled.div`
  opacity: 0;
  transition: opacity 0.5s;
  display: flex;
  flex-flow: column;
  gap: 25px;
`

const StyledButton = styled(Button)`
    width: 100px;
`