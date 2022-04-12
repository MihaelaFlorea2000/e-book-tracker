import React from "react";
import { observer } from "mobx-react";
import styled from "@emotion/styled";
import {SearchResultInterface} from "../../../utils/helpers/interfaces";
import {useStore} from "../../../stores/RootStore";
import SearchResult from "./SearchResult";
import {NoResult} from "../../../utils/components/NoResult";

/**
 * List of search results when searching in a book
 * @constructor
 */
const SearchList = () => {

    const { readerStore } = useStore();

    const searchResults = readerStore.getSearchResults();

    if (searchResults === undefined) {
        return (
            <List>
            </List>
        )
    }

    if (searchResults.length === 0) {
        return (
            <List>
                <NoResult />
            </List>
        )
    }

    return (
        <Container>
            <ResultNumber>Results ({searchResults.length})</ResultNumber>
            <List>
                {searchResults.map((searchResult:SearchResultInterface, i) => (
                    <SearchResult key={i} searchResult={searchResult}/>
                ))}
            </List>
        </Container>
    )
};

export default observer(SearchList);

const Container = styled.div`
  display: flex;
  flex-flow: column;
`

const List = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
`

const ResultNumber = styled.h3`
  padding-top: 0;
  margin-top: 0;
`
