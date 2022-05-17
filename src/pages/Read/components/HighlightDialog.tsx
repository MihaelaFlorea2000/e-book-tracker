import React from "react";
import styled from "@emotion/styled";
import { observer } from "mobx-react";
import { Contents } from "epubjs";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from "@mui/material";
import { StyledTextField } from "../../../utils/style/styledComponents";
import { border } from "../../../utils/style/themeConfig";
import { readerColors } from "../helpers/ReaderColors";
import { device } from "../../../utils/helpers/constants";
import {BookInterface} from "../../../utils/helpers/interfaces";
import { useStore } from "../../../stores/RootStore";
import axiosConfig from "../../../utils/helpers/axiosConfig";

interface Props {
    contents: Contents | undefined,
    book: BookInterface
}

/**
 * Dialog for adding a highlight in a book
 * @param props
 * @constructor
 */
const HighlightDialog = (props:Props) => {

    // Get ReaderStore
    const { readerStore } = useStore();

    // Get current selection
    const isOpen = readerStore.isHighlightDialog();
    const currentSelection = readerStore.getCurrentSelection();

    if (currentSelection === null) {
        readerStore.setHighlightDialog(false);
        readerStore.setEditId(undefined);
        return (<div/>)
    }

    const color = currentSelection.color;
    const editId = readerStore.getEditId();

    // On CLOSE button
    const handleClose = () => {
        // Close dialog and reset state
        readerStore.setCurrentSelection(null);
        readerStore.setHighlightDialog(false);
        readerStore.setEditId(undefined);
        readerStore.setIsHighlightOn(false);
    };

    // When user types into the note textarea
    const handleNoteChange = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        readerStore.setNote(e.target.value)
    };

    const addHighlight = async() => {
        try {
            if (props.book.id !== undefined) {
                const res = await axiosConfig().post(`/highlights/${props.book.id}`, currentSelection);
                console.log(res);
                readerStore.requestSelections(props.book.id);
            }

        } catch (err) {
            console.log(err);
        }
    }

    const editHighlight = async(editId:number) => {
        try {
            if (props.book.id !== undefined) {
                const res = await axiosConfig().put(`/highlights/${props.book.id}/${editId}`, currentSelection);
                console.log(res);
                readerStore.requestSelections(props.book.id);
            }

        } catch (err) {
            console.log(err);
        }
    }

    // On SAVE button
    const handleSave = async () => {

        if (editId) {
            await editHighlight(editId);
        } else {
            await addHighlight();
        }

        // Highlight selection in the book
        const rendition = readerStore.getRendition()
        if(rendition) {
            rendition.annotations.remove(currentSelection.cfiRange, "highlight")
            rendition.annotations.add("highlight", currentSelection.cfiRange, {}, undefined , "hl", {"fill": `${currentSelection.color}`, "fill-opacity": "0.8", "mix-blend-mode": "multiply"})
        }

        // Close dialog and reset state
        readerStore.setCurrentSelection(null);
        readerStore.setHighlightDialog(false);
        readerStore.setEditId(undefined);
        readerStore.setIsHighlightOn(false);

        // Deselect the text
        if (props.contents) {
            const windowSelection = props.contents.window.getSelection();
            if (windowSelection !== null) {
                windowSelection.removeAllRanges()
            }
        }
    };

    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <Title>{editId ? 'Edit' : 'Add'} Highlight</Title>
            <Container>
                <HighlightText color={color}>
                    {currentSelection.text}
                </HighlightText>
                <Subtitle>Select Color</Subtitle>
                <ColorsContainer>
                    <ColorContainer onClick={() => {readerStore.setColor(readerColors.yellow.light)}}>
                        <Color color={readerColors.yellow.dark}/>
                        <ColorLabel>Yellow</ColorLabel>
                    </ColorContainer>
                    <ColorContainer onClick={() => {readerStore.setColor(readerColors.red.light)}}>
                        <Color color={readerColors.red.dark}/>
                        <ColorLabel>Red</ColorLabel>
                    </ColorContainer>
                    <ColorContainer onClick={() => {readerStore.setColor(readerColors.blue.light)}}>
                        <Color color={readerColors.blue.dark}/>
                        <ColorLabel>Blue</ColorLabel>
                    </ColorContainer>
                    <ColorContainer onClick={() => {readerStore.setColor(readerColors.green.light)}}>
                        <Color color={readerColors.green.dark}/>
                        <ColorLabel>Green</ColorLabel>
                    </ColorContainer>
                    <ColorContainer onClick={() => {readerStore.setColor(readerColors.orange.light)}}>
                        <Color color={readerColors.orange.dark}/>
                        <ColorLabel>Orange</ColorLabel>
                    </ColorContainer>
                </ColorsContainer>
                <Subtitle>Add Note</Subtitle>
                <StyledTextField
                    id="note"
                    placeholder="Note"
                    variant="outlined"
                    type="text"
                    value={currentSelection.note}
                    onChange={handleNoteChange}
                    multiline
                    rows={10}
                />
            </Container>
            <DialogActions>
                <Button onClick={handleSave}>Save</Button>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

export default observer(HighlightDialog);

const Title = styled(DialogTitle)`
  font-family: 'PoppinsSemiBold', sans-serif;
`

const Container = styled(DialogContent)`
  display: flex;
  flex-flow: column;
  gap: 20px;
  min-width: 600px;

  @media only screen and ${device.mobileL} {
    min-width: 300px;
  }
`

const HighlightText = styled(DialogContent)<{color: string}>`
  background-color: ${props => props.color};
  border-radius: ${border.borderRadius};
  max-height: 30vh;
`

const Subtitle = styled.h4`
  padding: 0;
  margin: 0;
`

const ColorsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`

const ColorContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 5px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 20%;

  :hover :nth-of-type(1){
    border: 1px solid black;
  }

  :hover :nth-of-type(2){
    color: black;
  }
`

const Color = styled.div<{color: string}>`
  border-radius: 100%;
  background-color: ${props => props.color};
  width: 40px;
  height: 40px;
  border: 1px solid white;
  transition: border 0.5s;

  @media only screen and ${device.mobileL} {
    width: 30px;
    height: 30px;
  }
`

const ColorLabel = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.palette.info.main};
  transition: color 0.5s;
  
  @media only screen and ${device.mobileL} {
    font-size: 0.8rem;
  }
`