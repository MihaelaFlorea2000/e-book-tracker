import {useNavigate, useParams} from "react-router-dom";
import {useStore} from "../../stores/RootStore";
import React, {ChangeEvent, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import axiosConfig from "../../utils/helpers/axiosConfig";
import {Button} from "@mui/material";
import {StyledTextField} from "../../utils/style/styledComponents";
import Sessions from "./components/Sessions";
import {BookRating} from "../../utils/components/Book/BookRating";
import LoadingButton from "@mui/lab/LoadingButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {observer} from "mobx-react";
import styled from "@emotion/styled";
import EditDialogue from "./components/EditDialogue";
import BookCover from "../../utils/components/Book/BookCover";
import {
    Form,
    FormContainer,
    DatesContainer,
    FieldContainer,
    Subtitle,
    ButtonsContainer
} from "../../utils/style/readFormStyle";
import {border} from "../../utils/style/themeConfig";
import {device} from "../../utils/helpers/constants";
import FormHelperText from "@mui/material/FormHelperText";
import Alert from "@mui/material/Alert";
import { readSchema } from "../../utils/helpers/schemas";
import { formatDateStringISO } from "../../utils/helpers/formatDate";
import { isOutside } from "../../utils/helpers/dateChecks";
import {Title} from "../../utils/components/Title";

interface FormInterface {
    startDate: string,
    endDate: string,
    rating: number,
    notes: string
}

/**
 * Page for editing a book Read
 * @constructor
 */
const EditReadPage = () => {

    const navigate = useNavigate();

    // Get stores
    const { bookStore, editReadStore, metricsStore } = useStore();

    // Get book and read
    const params = useParams();
    const bookId = Number(params.bookId);
    const readId = Number(params.readId);

    // Rating state
    const [rating, setRating] = useState<number>(editReadStore.getRating());

    // Form state
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isCancelling, setIsCancelling] = useState<boolean>(false);

    // Go back to first upload step on refresh
    useEffect(() => {
        window.addEventListener("unload", reroute);
        return () => {
            window.removeEventListener("unload", reroute);
        };
    }, []);

    const reroute = (e:any) => {
        e.preventDefault();
        navigate(`/book/${bookId}`);
        return false;
    };

    const { register, handleSubmit, formState: { errors } } = useForm<FormInterface>({
        resolver: yupResolver(readSchema),
        mode: 'onChange',
        defaultValues: {
            startDate: editReadStore.getStartDate(),
            endDate: editReadStore.getEndDate(),
            notes: editReadStore.getNotes()
        }
    });

    // On CLOSE button
    const handleClose = () => {
        setIsCancelling(true);
        navigate(`/book/${bookId}`);
    };


    // On SAVE button
    const onSubmit = async (data: FormInterface) => {
        editReadStore.setErrorMessage('');
        setIsSubmitting(true);

        // Check start date and end date are not empty
        if (!data.startDate && !data.endDate) {
            editReadStore.setErrorMessage('Start and end dates are required');
            setIsSubmitting(false);
            return
        }

        const sessions = editReadStore.getSessions(readId);

        // Check if there are no sessions
        if (sessions && sessions.length === 0) {
            editReadStore.setErrorMessage('You must add at least a session');
            setIsSubmitting(false);
            return
        }

        // Check if there are sessions outside the interval
        if (sessions && isOutside(sessions, data.startDate, data.endDate)) {
            editReadStore.setErrorMessage('Some sessions are outside the start - end date range');
            setIsSubmitting(false);
            return
        }

        const newRead = {
            startDate: formatDateStringISO(data.startDate),
            endDate: formatDateStringISO(data.endDate),
            rating: rating,
            notes: data.notes
        }

        try {
            let res;

            if (editReadStore.isFinished()) {
                res = await axiosConfig().post(`/reads/${bookId}/${readId}/finished`, newRead);
            } else {
                res = await axiosConfig().put(`/reads/${bookId}/${readId}`, newRead);
            }

            console.log(res);
            bookStore.requestReads(bookId);
            bookStore.requestBook(bookId);
            metricsStore.trackRefresh();
            navigate(`/book/${bookId}`);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Page>
            <Title text="Edit Read" />
            <Container>
                <BookCover />
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <FormContainer>
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
                                    onChange={(e:any) => {editReadStore.setStartDate(e.target.value)}}
                                    type="date"
                                />
                                {!!errors.startDate && (
                                    <FormHelperText error id="password-error">
                                        {errors.startDate.message}
                                    </FormHelperText>
                                )}
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
                                    onChange={(e:any) => {editReadStore.setEndDate(e.target.value)}}
                                    type="date"
                                />
                                {!!errors.endDate && (
                                    <FormHelperText error id="password-error">
                                        {errors.endDate.message}
                                    </FormHelperText>
                                )}
                            </FieldContainer>
                        </DatesContainer>
                        <Sessions />
                        {editReadStore.getErrorMessage() && <Alert severity="error">{editReadStore.getErrorMessage()}</Alert>}
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
                    </FormContainer>
                    <ButtonsContainer>
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
                    </ButtonsContainer>
                </Form>
                <EditDialogue readId={readId}/>
            </Container>
        </Page>
    )
}

export default observer(EditReadPage);

const Page = styled.div`
  padding: 20px;
  color: ${props => props.theme.palette.secondary.dark}
`

const Container = styled.div`
  display: flex;
  gap: 25px;
  background-color: ${props => props.theme.palette.info.light};
  border-radius: ${border.borderRadius};
  padding: 20px;

  @media only screen and ${device.tablet} {
    flex-flow: column;
    align-items: center;
    justify-content: center;
  }
`