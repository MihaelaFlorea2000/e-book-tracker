import styled from "@emotion/styled";
import React from "react";
import {BookInterface} from "../../../config/interfaces";
import { border, theme } from "../../../utils/style/themeConfig";
import {DOMAIN} from "../../../config/config";

interface Props {
    book: BookInterface
}

const Book = (props: Props) => {

    return (
        <BookContainer >
            <BookImage image={`${DOMAIN}${props.book.coverImage}`} />
            {props.book.title}
        </BookContainer>
    )
}

export default Book;

const BookContainer = styled.div`
  border: 1px solid ${theme.palette.info.main};
  border-radius: ${border.borderRadius};
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px;
`

const BookImage = styled.div<{image: string}>`
  position: relative;
  width: 130px;
  height: 220px;
  background-image: url(${props => props.image});
  background-size: cover;
`
