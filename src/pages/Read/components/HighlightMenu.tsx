import React from "react";
import { observer } from "mobx-react";
import styled from "@emotion/styled";
import Highlight from "./Highlight";
import { device } from "../../../config/config";
import { useStore } from "../../../stores/RootStore";

const HighlightMenu = () => {

    // Get ReadStore
    const { readStore } = useStore();

    // Get selections
    const selections = readStore.getSelections();

    return (
        <HighlightsContainer>
            <Title>Highlights</Title>
            <List>
                {selections.map(({text, cfiRange, note, color}, i) => (
                    <Highlight key={i} index={i} text={text} cfiRange={cfiRange} note={note} color={color}/>
                ))}
            </List>
        </HighlightsContainer>
    )
};

export default observer(HighlightMenu);

const HighlightsContainer = styled.div`
  width: 60vw;
  padding: 10px;
  
  @media only screen and ${device.mobileL} {
    width: 80vw;
    font-size: 0.9rem;
  }
`

const Title = styled.h2`
`

const List = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
`
