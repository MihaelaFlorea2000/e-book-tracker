import {useNavigate, useParams} from "react-router-dom";
import {useStore} from "../../stores/RootStore";
import React, {ChangeEvent, useState} from "react";
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
import {border} from "../../utils/style/themeConfig";
import {device} from "../../utils/helpers/constants";
import BookCover from "../../utils/components/Book/BookCover";
import {FrontSessionInterface} from "../../utils/helpers/interfaces";
import {
    Form,
    FormContainer,
    DatesContainer,
    FieldContainer,
    Subtitle,
    ButtonsContainer
} from "../../utils/style/readFormStyle";
import Alert from "@mui/material/Alert";
import FormHelperText from "@mui/material/FormHelperText";
import { readSchema } from "../../utils/helpers/schemas";
import { formatDateStringISO } from "../../utils/helpers/formatDate";
import {isOutside} from "../../utils/helpers/dateChecks";
import { Title } from "../../utils/components/Title";

interface FormInterface {
    startDate: string,
    endDate: string,
    rating: number,
    notes: string
}

/**
 * Add Read form
 * @constructor
 */
const AddReadPage = () => {

    const navigate = useNavigate();

    // Get stores
    const { bookStore, addReadStore, metricsStore } = useStore();

    // Get book
    const params = useParams();
    const bookId = Number(params.bookId);

    // Rating state
    const [rating, setRating] = useState<number>(0);

    // Form state
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isCancelling, setIsCancelling] = useState<boolean>(false);

    const { register, handleSubmit, formState: { errors } } = useForm<FormInterface>({
        resolver: yupResolver(readSchema),
        mode: 'onChange'
    });

    // On CLOSE button
    const handleClose = () => {
        setIsCancelling(true);
        addReadStore.setErrorMessage('');
        addReadStore.setSessions([]);
        navigate(`/book/${bookId}`);
    };

    // Add Read
    const addRead = async(newRead:object) => {
        try {
            const res = await axiosConfig().post(`/reads/${bookId}`, newRead);
            console.log(res);
            return res.data.id;
        } catch (err:any) {
            console.log(err);
            addReadStore.setErrorMessage(err.response.data.message);
            setIsSubmitting(false);
        }
    }

    // Add Session to this Read
    const addSession = async(session:FrontSessionInterface, readId:number) => {
        const newSession = {
            startDate: session.startDate,
            time: {
                hours: session.hours,
                minutes: session.minutes
            }
        }

        try {
            const res = await axiosConfig().post(`/sessions/${readId}`, newSession);
            console.log(res);
        } catch (err:any) {
            console.log(err);
            addReadStore.setErrorMessage(err.response.data.message);
            setIsSubmitting(false);
        }
    }

    // On SAVE button
    const onSubmit = async (data: FormInterface) => {
        addReadStore.setErrorMessage('');
        setIsSubmitting(true);

        // Check sessions is empty
        const sessions = addReadStore.getSessions();

        if (sessions.length === 0) {
            addReadStore.setErrorMessage('You must add at least a session');
            setIsSubmitting(false);
            return
        }

        // Check if there are sessions outside the interval
        if (sessions && isOutside(sessions, data.startDate, data.endDate)) {
            addReadStore.setErrorMessage('Some sessions are outside the start - end date range');
            setIsSubmitting(false);
            return
        }

        // Add new read
        const newRead = {
            startDate: formatDateStringISO(data.startDate),
            endDate: formatDateStringISO(data.endDate),
            rating: rating,
            notes: data.notes
        }

        const readId = await addRead(newRead);

        // Add read sessions
        for (const session of sessions) {
            await addSession(session, readId);
        }

        // Update state
        addReadStore.setSessions([]);
        bookStore.requestBook(bookId);
        bookStore.requestReads(bookId);
        metricsStore.trackRefresh();
        navigate(`/book/${bookId}`);
    };

    return (
        <Page>
            <Title text="Add Read" />
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
                                    onChange={(e) => {addReadStore.setStartDate(e.target.value)}}
                                    fullWidth
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
                                    onChange={(e) => {addReadStore.setEndDate(e.target.value)}}
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
                        {addReadStore.getErrorMessage() && <Alert severity="error">{addReadStore.getErrorMessage()}</Alert>}
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
            </Container>
        </Page>
    )
}

export default observer(AddReadPage);

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