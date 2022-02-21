import React from "react";
import { observer } from "mobx-react";
import styled from "@emotion/styled";
import {SearchResultInterface} from "../../../config/interfaces";
import {useStore} from "../../../stores/RootStore";
import {CircularLoading} from "../../../utils/components/CircularLoading";
import SearchResult from "./SearchResult";
import {faSadTear} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { theme } from "../../../utils/style/themeConfig";

const SearchList = () => {

    const { readStore } = useStore();

    const searchResults = readStore.getSearchResults();

    if (searchResults === undefined) {
        return (
            <List>
            </List>
        )
    }

    if (searchResults.length === 0) {
        return (
            <List>
                <NoResults>
                    No results found
                    <IconContainer>
                        <FontAwesomeIcon icon={faSadTear}/>
                    </IconContainer>
                </NoResults>
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

const IconContainer = styled.div`
  font-size: 2rem;
`

const NoResults = styled.div`
  padding: 20px;
  display: flex;
  flex-flow: column;
  gap: 5px;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: ${theme.palette.info.main}
`
