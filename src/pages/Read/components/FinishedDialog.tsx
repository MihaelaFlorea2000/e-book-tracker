import React, {ChangeEvent, useState} from "react";
import styled from "@emotion/styled";
import { observer } from "mobx-react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from "@mui/material";
import { StyledTextField } from "../../../utils/style/styledComponents";
import { device } from "../../../config/config";
import {BookInterface} from "../../../config/interfaces";
import { useStore } from "../../../stores/RootStore";
import {faTrophy} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {BookRating} from "../../../utils/components/Book/BookRating";
import axiosConfig from "../../../config/axiosConfig";
import {useNavigate} from "react-router-dom";

interface Props {
    book: BookInterface
}

const FinishedDialog = (props:Props) => {

    const navigate = useNavigate();

    // Get ReaderStore
    const { readerStore, metricsStore } = useStore();

    const isOpen = readerStore.isFinishedDialog();

    const [rating, setRating] = useState<number>(0);
    const [notes, setNotes] = useState<string>("");

    // On CLOSE button
    const handleClose = () => {
        // Close dialog and reset state
        readerStore.setFinishedDialog(false);
        readerStore.setFinishedDialogDouble(true);
    };

    // When user types into the note textarea
    const handleNotesChange = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setNotes(e.target.value);
    };

    // On SAVE button
    const handleSave = async () => {

        const data = {
            rating: rating,
            notes: notes
        }

        try {
            const res = await axiosConfig().post(`/pg/books/${props.book.id}/finished`, data)
            console.log(res.data);
            metricsStore.trackRefresh();
            navigate('/');
        } catch (err:any) {
            console.log(err.response.data.message)
        }

        // Close dialog and reset state
        readerStore.setFinishedDialog(false);
    };

    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <Title>Book Finished </Title>
            <Container>
                <CongratsContainer>
                    <IconContainer><FontAwesomeIcon className="fa-fw" icon={faTrophy}/></IconContainer>
                    <span>Congratulations on finishing {props.book.title}!</span>
                    <span>You can add your thoughts below.</span>
                </CongratsContainer>
                <Subtitle>Add Rating</Subtitle>
                <BookRating
                    value={rating}
                    size="large"
                    readOnly={false}
                    onChange={(event:ChangeEvent, newRating:number | null) => {
                        setRating(newRating !== null ? newRating : 0);
                    }}
                />
                <Subtitle>Add Notes</Subtitle>
                <StyledTextField
                    id="notes"
                    placeholder="Notes"
                    variant="outlined"
                    type="text"
                    onChange={handleNotesChange}
                    multiline
                    rows={10}
                />
            </Container>
            <DialogActions>
                <Button onClick={handleSave}>Mark as Finished</Button>
                <Button onClick={handleClose}>I Have not Finished</Button>
            </DialogActions>
        </Dialog>
    )
}

export default observer(FinishedDialog);

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
const CongratsContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 1.3rem;
`

const IconContainer = styled.div`
  font-size: 4rem;
  color: #faaf00;
`

const Subtitle = styled.h4`
  padding: 0;
  margin: 0;
`