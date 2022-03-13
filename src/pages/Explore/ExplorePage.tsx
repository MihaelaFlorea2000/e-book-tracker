import React, {ReactNode} from "react";
import styled from "@emotion/styled";
import {useStore} from "../../stores/RootStore";
import {Title} from "../../utils/components/Title";
import Genre from "./components/Genre";
import {observer} from "mobx-react";
import ExploreStore from "../../stores/ExploreStore";
import TagBooks from "./components/TagBooks";
import {CircularLoading} from "../../utils/components/CircularLoading";

const ExplorePage = () => {

    const { metricsStore } = useStore();

    const tags = metricsStore.getTopTagsByBooks();

    if (tags === undefined) {
        return (
            <CircularLoading />
        )
    }

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
            {/*{tags.labels.length > 0 &&*/}
            {/*    <TagBooks tags={tags.labels}/>*/}
            {/*}*/}
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