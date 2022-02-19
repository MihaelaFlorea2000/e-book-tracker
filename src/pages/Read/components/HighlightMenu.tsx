import React from "react";
import { observer } from "mobx-react";
import styled from "@emotion/styled";
import Highlight from "./Highlight";
import { device } from "../../../config/config";
import {BookInterface, HighlightInterface} from "../../../config/interfaces";

interface Props {
    book: BookInterface,
    selections: HighlightInterface[]
}

const HighlightMenu = (props:Props) => {

    return (
        <HighlightsContainer>
            <Title>Highlights</Title>
            <List>
                {props.selections.map((selection, i) => (
                    <Highlight key={i} bookId={props.book.id} selections={props.selections} selection={selection}/>
                ))}
            </List>
        </HighlightsContainer>
    )
};

export default observer(HighlightMenu);

const HighlightsContainer = styled.div`
  width: 60vw;
  padding: 20px;
  
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
