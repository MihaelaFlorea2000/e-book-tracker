import styled from "@emotion/styled";
import React, {ChangeEventHandler} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {observer} from "mobx-react";
import ReadStore from "../../../stores/ReadStore";
import {useStore} from "../../../stores/RootStore";
import { StyledTextField } from "../../../utils/style/styledComponents";
import { border, theme } from "../../../utils/style/themeConfig";
import {highlightColors} from "../helpers/HighlightColors";
import {HighlightInterface} from "../../../config/interfaces";
import {toJS} from "mobx";
import {Contents} from "epubjs";

interface Props {
    contents: Contents | undefined
}

const HighlightDialog = (props:Props) => {

    const { readStore } = useStore();

    const isOpen = readStore.isHighlightDialog();
    const currentSelection = readStore.getCurrentSelection();

    if (currentSelection === null) {
        readStore.setHighlightDialog(false);
        return (<div/>)
    }

    const color = currentSelection.color;
    const note = currentSelection.note;

    const handleClose = () => {
        readStore.setHighlightDialog(false);
    };

    const handleNoteChange = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        readStore.setNote(e.target.value)
    };

    const handleSave = () => {

        console.log(toJS(currentSelection));
        // const newSelections:HighlightInterface[] = [];
        // const selections = readStore.getSelections();
        // selections.forEach((selection) => {
        //     if(selection.cfiRange !== currentSelection.cfiRange) {
        //         newSelections.concat(selection);
        //     } else {
        //         newSelections.concat(currentSelection);
        //     }
        // })
        // const sel = readStore.getSelections();
        // let newSel:HighlightInterface[] = [];
        // sel.forEach((s) => {
        //     newSel = newSel.concat(s);
        // })
        readStore.setSelections(readStore.getSelections().concat(currentSelection))

        const rendition = readStore.getRendition()
        if(rendition) {
            rendition.annotations.remove(currentSelection.cfiRange, "highlight")
            rendition.annotations.add("highlight", currentSelection.cfiRange, {}, undefined , "hl", {"fill": `${currentSelection.color}`, "fill-opacity": "0.8", "mix-blend-mode": "multiply"})
        }

        readStore.setCurrentSelection(null);
        readStore.setHighlightDialog(false);

        if (props.contents) {
            const windowSelection = props.contents.window.getSelection();
            if (windowSelection !== null) {
                windowSelection.removeAllRanges()
            }
        }
    };

    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <Title>Add highlight</Title>
            <Container>
                <HighlightText color={color}>
                    {currentSelection.text}
                </HighlightText>
                <Subtitle>Select Color</Subtitle>
                <ColorsContainer>
                    <ColorContainer onClick={() => {readStore.setColor(highlightColors.yellow.light)}}>
                        <Color color={highlightColors.yellow.dark}/>
                        <ColorLabel>Yellow</ColorLabel>
                    </ColorContainer>
                    <ColorContainer onClick={() => {readStore.setColor(highlightColors.red.light)}}>
                        <Color color={highlightColors.red.dark}/>
                        <ColorLabel>Red</ColorLabel>
                    </ColorContainer>
                    <ColorContainer onClick={() => {readStore.setColor(highlightColors.blue.light)}}>
                        <Color color={highlightColors.blue.dark}/>
                        <ColorLabel>Blue</ColorLabel>
                    </ColorContainer>
                    <ColorContainer onClick={() => {readStore.setColor(highlightColors.green.light)}}>
                        <Color color={highlightColors.green.dark}/>
                        <ColorLabel>Green</ColorLabel>
                    </ColorContainer>
                    <ColorContainer onClick={() => {readStore.setColor(highlightColors.orange.light)}}>
                        <Color color={highlightColors.orange.dark}/>
                        <ColorLabel>Orange</ColorLabel>
                    </ColorContainer>
                </ColorsContainer>
                <Subtitle>Add Note</Subtitle>
                <StyledTextField
                    id="note"
                    placeholder="Note"
                    variant="outlined"
                    type="text"
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

const Container = styled(DialogContent)`
  display: flex;
  flex-flow: column;
  gap: 20px;
  min-width:40vw;
`

const Title = styled(DialogTitle)`
  font-family: 'PoppinsSemiBold', sans-serif;
`

const HighlightText = styled(DialogContent)<{color: string}>`
  background-color: ${props => props.color};
  border-radius: ${border.borderRadius};
  max-height: 30vh;
`

const Subtitle = styled.h4`
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
`

const ColorLabel = styled.div`
  font-size: 0.9rem;
  color: ${theme.palette.info.main};
  transition: color 0.5s;
`