import React, { ChangeEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import styled from "@emotion/styled";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from "@mui/material";
import { StyledTextField } from "../../../utils/style/styledComponents";
import { theme } from "../../../utils/style/themeConfig";
import { BookRating } from "../../../utils/components/BookRating";
import { device } from "../../../config/config";
import { useStore } from "../../../stores/RootStore";
import axiosConfig from "../../../config/axiosConfig";
import LoadingButton from "@mui/lab/LoadingButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import Sessions from "../../AddRead/components/Sessions";


interface FormInterface {
    startDate: string,
    endDate: string,
    rating: number,
    notes: string
}

// Read Schema validation
const readSchema = yup.object().shape({
    startDate: yup.date().required('Start Date is required'),
    endDate: yup.date().when('startDate', (startDate, schema) => startDate && schema.min(startDate)),
    notes: yup.string()
});

const ReadDialog = () => {

    const navigate = useNavigate();

    // Get stores
    const { bookStore, readStore } = useStore();

    // Get book and read
    const params = useParams();
    const bookId = Number(params.bookId);

    // Get state
    const isOpen = readStore.isReadDialogue();
    const editId = readStore.getEditId();
    const isFinish = readStore.isFinish();

    // Rating state
    const [rating, setRating] = useState<number>(readStore.getRating());

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isCancelling, setIsCancelling] = useState<boolean>(false);

    const { register, handleSubmit, formState: { errors } } = useForm<FormInterface>({
        resolver: yupResolver(readSchema),
        mode: 'onChange',
        defaultValues: {
            startDate: readStore.getStartDate(),
            endDate: readStore.getEndDate(),
            notes: readStore.getNotes()
        }
    });

    // On CLOSE button
    const handleClose = () => {
        setIsCancelling(true);
        // Close dialog and reset state
        readStore.setReadDialog(false);
        readStore.setEditId(undefined);
        readStore.setRating(0);
        navigate(`/book/${bookId}`);
    };

    const addRead = async(newRead:object) => {
        try {
            const res = await axiosConfig().post(`/pg/reads/${bookId}`, newRead);
            console.log(res);
            bookStore.requestReads(bookId);
        } catch (err) {
            console.log(err);
            setIsSubmitting(false);
        }
    }

    const editRead = async(editId:number, newRead:object, isFinish:boolean) => {
        console.log(newRead)

        try {
            if (isFinish) {
                const res = await axiosConfig().post(`/pg/reads/${bookId}/${editId}/finished`, newRead);
                console.log(res);
            } else {
                const res = await axiosConfig().put(`/pg/reads/${bookId}/${editId}`, newRead);
                console.log(res);
            }
            bookStore.requestReads(bookId);
        } catch (err) {
            console.log(err);
            setIsSubmitting(false);
        }
    }

    // On SAVE button
    const onSubmit = async (data: FormInterface) => {
        setIsSubmitting(true);

        const newRead = {
            startDate: data.startDate,
            endDate: data.endDate,
            rating: rating,
            notes: data.notes
        }

        if (editId) {
            await editRead(editId, newRead, isFinish);
        } else {
            await addRead(newRead);
        }

        // Close dialog and reset state
        readStore.setReadDialog(false);
        readStore.setEditId(undefined);
        navigate(`/book/${bookId}`);
    };

    return (
        <Dialog open={isOpen} onClose={handleClose} maxWidth={'md'}>
            <Title>{editId ? 'Edit' : 'Add'} Read</Title>
            <FormContainer onSubmit={handleSubmit(onSubmit)}>
                <Container>
                    <DatesContainer>
                        <FieldContainer>
                            <Subtitle>Start Date</Subtitle>
                            <StyledTextField
                                id="startDate"
                                placeholder="Start Date"
                                variant="outlined"
                                {...register('startDate')}
                                error={!!errors.startDate}
                                fullWidth
                                type="date"
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <Subtitle>End Date</Subtitle>
                            <StyledTextField
                                id="endDate"
                                placeholder="End Date"
                                variant="outlined"
                                {...register('endDate')}
                                error={!!errors.endDate}
                                fullWidth
                                type="date"
                            />
                        </FieldContainer>
                    </DatesContainer>
                    <FieldContainer>
                        <Subtitle>Sessions</Subtitle>
                        <Sessions />
                    </FieldContainer>
                    <FieldContainer>
                        <Subtitle>Rating</Subtitle>
                        <BookRating
                            value={rating}
                            size="large"
                            readOnly={false}
                            onChange={(event:ChangeEvent, newRating:number | null) => {
                                setRating(newRating !== null ? newRating : 0);
                            }}
                        />
                    </FieldContainer>
                    <FieldContainer>
                        <Subtitle>Notes</Subtitle>
                        <StyledTextField
                            id="notes"
                            placeholder="Notes"
                            variant="outlined"
                            type="text"
                            {...register('notes')}
                            fullWidth
                            multiline
                            rows={10}
                        />
                    </FieldContainer>
                </Container>
                <StyledDialogActions>
                    {isSubmitting
                        ? <LoadingButton loading variant="outlined" size="large" >Submit</LoadingButton>
                        : <Button
                            type="submit"
                            variant="contained"
                            startIcon={<FontAwesomeIcon className="fa-fw" icon={faCheckCircle}/>}
                        >
                            Save
                        </Button>
                    }
                    {isCancelling
                        ? <LoadingButton loading variant="outlined" size="large" >Submit</LoadingButton>
                        : <Button
                            type="button"
                            variant="contained"
                            onClick={handleClose}
                            startIcon={<FontAwesomeIcon className="fa-fw" icon={faTimesCircle}/>}
                        >
                            Cancel
                        </Button>
                    }
                </StyledDialogActions>
            </FormContainer>
        </Dialog>
    )
}

export default observer(ReadDialog);

const Title = styled(DialogTitle)`
  font-family: 'PoppinsSemiBold', sans-serif;
`

const Subtitle = styled.div`
  padding-left: 2px;
  font-family: 'PoppinsSemiBold', sans-serif;
  color: ${theme.palette.primary.main};
`

const FormContainer = styled.form`
  
  @media only screen and ${device.mobileL} {
    flex-flow: column;
    display: flex;
    align-items: center;
    justify-items: center;
  }
`

const FieldContainer = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  gap: 5px;
`

const Container = styled(DialogContent)`
  display: flex;
  flex-flow: column;
  gap: 30px;
`

const DatesContainer = styled.div`
  display: flex;
  gap: 10px;

  @media only screen and ${device.mobileL} {
    flex-flow: column;
  }
`

const StyledDialogActions = styled(DialogActions)`
  button {
    width: 120px;
  }

  @media only screen and ${device.tablet} {
    button {
      width: 100px;
    }
  }
`