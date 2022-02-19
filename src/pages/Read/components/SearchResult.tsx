import React from "react";
import { observer } from "mobx-react";
import styled from "@emotion/styled";
import { border } from "../../../utils/style/themeConfig";
import { useStore } from "../../../stores/RootStore";
import {SearchResultInterface} from "../../../config/interfaces";

interface Props {
    searchResult: SearchResultInterface
}

const SearchResult = (props: Props) => {

    // Get ReadStore
    const { readStore } = useStore();

    // Get selections and rendition
    const rendition = readStore.getRendition();

    if (rendition === undefined) {
        return (
            <div>Loading</div>
        )
    }

    return (
        <Container>
            <TextContainer
                onClick={() => {
                    rendition.display(props.searchResult.cfi);
                }}
            >
                {props.searchResult.excerpt}
            </TextContainer>
        </Container>
    )
}

export default observer(SearchResult);

const Container = styled.div`
  border-radius: ${border.borderRadius};
  box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
  padding: 10px;
  width: 100%;
  display: flex;
  flex-flow: column;
  gap: 10px;
  transition: box-shadow 0.5s;
  
  :hover {
    box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
  }
`

const TextContainer = styled.div`
  transition: background-color 0.5s;
  background-color: ${props => props.color};
  padding: 10px;
  border-radius: ${border.borderRadius};
  cursor: pointer;
  max-height: 20vh;
  overflow-y: auto;
`