import React, {ReactNode} from "react";
import styled from "@emotion/styled";
import {Title} from "../../utils/components/Title";
import Genre from "./components/Genre";
import {observer} from "mobx-react";
import ExploreStore from "../../stores/ExploreStore";

const ExplorePage = () => {

    let genres = [
        'Fiction',
        'Crime',
        'Fantasy',
        'Science Fiction',
        'Romance',
        'Thriller',
        'Poetry',
        'Classics'
    ]

    let genreNodes: ReactNode[] = [];

    genres.forEach((elem, index) => {
        genreNodes.push(
            <Genre key={index} genre={elem} store={new ExploreStore(elem)}/>
        )
    })

    return (
        <Page>
            <Title text="Explore" />
            <Subtitle> By Genre</Subtitle>
            <GenresContainer>
                {genreNodes}
            </GenresContainer>
        </Page>
    )
}

export default observer(ExplorePage);

const Page = styled.div`
  padding: 20px;
  color: ${props => props.theme.palette.secondary.dark}
`

const GenresContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 20px;
`

const Subtitle = styled.h2`
`