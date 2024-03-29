import React from "react";
import { observer } from "mobx-react";
import styled from "@emotion/styled";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faTimes, faEdit } from "@fortawesome/free-solid-svg-icons";
import { border, theme } from "../../../utils/style/themeConfig";
import { getHoverColor } from "../helpers/ReaderColors";
import { useStore } from "../../../stores/RootStore";
import { HighlightInterface } from "../../../utils/helpers/interfaces";
import axiosConfig from "../../../utils/helpers/axiosConfig";
import {DeleteIconContainer, EditIconContainer } from "../../../utils/style/styledComponents";

interface Props {
    bookId: number | undefined,
    selection: HighlightInterface,
    selections: HighlightInterface[]
}

/**
 * Component for displaying a highlight in the menu
 * @param props
 * @constructor
 */
const Highlight = (props: Props) => {

    // Get ReaderStore
    const { readerStore } = useStore();

    // Get selections and rendition
    const rendition = readerStore.getRendition();

    if (rendition === undefined) {
        return (
            <div>Loading</div>
        )
    }

    const hoverColor = getHoverColor(props.selection.color);

    const handleDelete = async() => {
        if (props.bookId) {
            try {
                const res = await axiosConfig().delete(`/highlights/${props.bookId}/${props.selection.id}`)
                rendition.annotations.remove(props.selection.cfiRange, 'highlight');
                readerStore.requestSelections(props.bookId);
            } catch (err) {
                console.log(err);
            }
        }
    }

    const handleEdit = () => {
        readerStore.setCurrentSelection(props.selection);
        readerStore.setEditId(props.selection.id);
        readerStore.setHighlightDialog(true);
    }

    return (
        <Container
            key={props.selection.id}
            hoverColor={hoverColor}
        >
            <IconContainer>
                <EditIconContainer onClick={handleEdit}>
                    <FontAwesomeIcon icon={faEdit}/>
                </EditIconContainer>
                <DeleteIconContainer
                    onClick={handleDelete}
                >
                    <FontAwesomeIcon icon={faTimes}/>
                </DeleteIconContainer>
            </IconContainer>
            <TextContainer
                color={props.selection.color}
                hoverColor={hoverColor}
                onClick={() => {
                    rendition.display(props.selection.cfiRange);
                }}
            >
                {props.selection.text}
            </TextContainer>
            {props.selection.note !== '' &&
                <NoteContainer>
                    <NoteTitle>Note:</NoteTitle>
                    <Note>
                        {props.selection.note}
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
  position: relative;
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