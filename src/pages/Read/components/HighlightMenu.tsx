import styled from "@emotion/styled";
import React from "react";
import { observer } from "mobx-react";
import ReadStore from "../../../stores/ReadStore";
import Highlight from "./Highlight";
// import {useStore} from "../../../stores/RootStore";
import { device } from "../../../config/config";

const HighlightMenu = () => {
    //const { readStore } = useStore();

    const selections = ReadStore.getSelections();

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
