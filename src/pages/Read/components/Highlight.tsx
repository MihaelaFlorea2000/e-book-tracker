import styled from "@emotion/styled";
import { observer } from "mobx-react";
import React from "react";
import { border, theme } from "../../../utils/style/themeConfig";
import { faTimes, faEdit } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {useStore} from "../../../stores/RootStore";
import { getHoverColor } from "../helpers/HighlightColors";
import readStore from "../../../stores/ReadStore";
import ReadStore from "../../../stores/ReadStore";

interface Props {
    index: number,
    text: string,
    cfiRange: string,
    color: string,
    note: string
}

const Highlight = (props: Props) => {

    // Get ReadStore
    //const { readStore } = useStore();

    // Get selections
    const selections = ReadStore.getSelections();
    const rendition = ReadStore.getRendition();

    if (rendition === undefined) {
        return (
            <div>Loading</div>
        )
    }

    const hoverColor = getHoverColor(props.color);
    const selection = {
        text: props.text,
        cfiRange: props.cfiRange,
        color: props.color,
        note: props.note
    }

    return (
        <Container
            key={props.index}
            hoverColor={hoverColor}
        >
            <IconContainer>
                <EditIconContainer onClick={() => {
                    ReadStore.setCurrentSelection(selection);
                    ReadStore.setHighlightDialog(true);
                }}>
                    <FontAwesomeIcon icon={faEdit}/>
                </EditIconContainer>
                <CloseIconContainer
                    onClick={() => {
                        rendition.annotations.remove(props.cfiRange, 'highlight')
                        ReadStore.setSelections(selections.filter((item, j) => j !== props.index))
                    }}
                >
                    <FontAwesomeIcon icon={faTimes}/>
                </CloseIconContainer>
            </IconContainer>
            <TextContainer
                color={props.color}
                hoverColor={hoverColor}
                onClick={() => {
                    rendition.display(props.cfiRange);
                }}
            >
                {props.text}
            </TextContainer>
            {props.note !== '' &&
                <NoteContainer>
                    <NoteTitle>Note:</NoteTitle>
                    <Note>
                        {props.note}
                    </Note>
                </NoteContainer>
            }
        </Container>
    )
}

export default observer(Highlight);

const Container = styled.div<{hoverColor:string}>`
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
  
  :hover > :nth-of-type(2){
    background-color: ${props => props.hoverColor};
  }
 
`

const IconContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const CloseIconContainer = styled.div`
  color: ${theme.palette.primary.main};
  transition: color 0.5s;
  font-size: 1.1rem;
  padding: 5px;
  cursor: pointer;


  :hover {
    color: #ff0000;
  }
`
const EditIconContainer = styled.div`
  color: ${theme.palette.primary.main};
  transition: color 0.5s;
  font-size: 1.1rem;
  padding: 5px;
  cursor: pointer;
  
  :hover {
    color: #ff0000;
  }
`

const TextContainer = styled.div<{color: string, hoverColor: string}>`
  transition: background-color 0.5s;
  background-color: ${props => props.color};
  padding: 10px;
  border-radius: ${border.borderRadius};
  cursor: pointer;
  max-height: 20vh;
  overflow-y: auto;
`

const NoteContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-flow: column;
  gap: 3px;
`
const Note = styled.div`
  max-height: 15vh;
  overflow-y: auto;
`

const NoteTitle = styled.h4`
  padding: 0;
  margin: 0;
`