import React from "react";
import styled from "@emotion/styled";
import {useStore} from "../../../stores/RootStore";
import { observer } from "mobx-react";
import {CircularLoading} from "../../../utils/components/CircularLoading";
import BooksList from "./BooksList";
import { border } from "../../../utils/style/themeConfig";
import {device} from "../../../config/config";

interface Props {
    tags: string[]
}

const TagBooks = (props: Props) => {

    const { exploreTagsStore } = useStore();

    const books = exploreTagsStore.getBooks(props.tags);

    if (books === undefined) {
        return (
            <CircularLoading />
        )
    }

    return (
        <Container>
            <Subtitle>More Like Your Tags</Subtitle>
            <BookContainer>
                <BooksList title="" books={books} />
            </BookContainer>
        </Container>
    )
}

export default observer(TagBooks);


const Container = styled.div`
`

const BookContainer = styled.div`
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

const Subtitle = styled.h2`
`

