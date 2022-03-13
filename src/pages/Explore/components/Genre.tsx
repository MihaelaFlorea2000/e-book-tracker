import React from "react";
import styled from "@emotion/styled";
import ExploreStore from "../../../stores/ExploreStore";
import { observer } from "mobx-react";
import {CircularLoading} from "../../../utils/components/CircularLoading";
import BooksList from "./BooksList";
import { border } from "../../../utils/style/themeConfig";
import {device} from "../../../config/config";

interface Props {
    genre: string,
    store: ExploreStore
}

const Genre = (props: Props) => {

    const exploreStore = props.store;

    const books = exploreStore.getBooks();

    if (books === undefined) {
        return (
            <Container>
                <Title>{props.genre}</Title>
                <CircularLoading />
            </Container>
        )
    }

    return (
        <Container>
            <BooksList title={props.genre} books={books} />
        </Container>
    )
}

export default observer(Genre);

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

const Title = styled.h2`
`

