import {useNavigate, useParams} from "react-router-dom";
import {useStore} from "../../stores/RootStore";
import React, {ChangeEvent, useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import axiosConfig from "../../config/axiosConfig";
import {Button} from "@mui/material";
import {StyledTextField} from "../../utils/style/styledComponents";
import Sessions from "./components/Sessions";
import {BookRating} from "../../utils/components/BookRating";
import LoadingButton from "@mui/lab/LoadingButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {observer} from "mobx-react";
import styled from "@emotion/styled";
import {border, theme} from "../../utils/style/themeConfig";
import {device} from "../../config/config";
import * as yup from "yup";
import BookCover from "./components/BookCover";
import {FrontSessionInterface} from "../../config/interfaces";

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
        addReadStore.setSessions([]);
        navigate(`/book/${bookId}`);
    };

    const addRead = async(newRead:object) => {
        try {
            const res = await axiosConfig().post(`/pg/reads/${bookId}`, newRead);
            console.log(res);
            return res.data.id;
        } catch (err) {
            console.log(err);
            setIsSubmitting(false);
        }
    }

    const addSession = async(session:FrontSessionInterface, readId:number) => {
        const newSession = {
            startDate: session.startDate,
            time: {
                hours: session.hours,
                minutes: session.minutes
            }
        }

        try {
            const res = await axiosConfig().post(`/pg/sessions/${readId}`, newSession);
            console.log(res);
        } catch (err) {
            console.log(err);
            setIsSubmitting(false);
        }
    }

    // On SAVE button
    const onSubmit = async (data: FormInterface) => {
        setIsSubmitting(true);

        const newRead = {
            startDate: addReadStore.formatDate(data.startDate),
            endDate: addReadStore.formatDate(data.endDate),
            rating: rating,
            notes: data.notes
        }

        const readId = await addRead(newRead);
        const sessions = addReadStore.getSessions();

        for (const session of sessions) {
            await addSession(session, readId);
        }

        addReadStore.setSessions([]);
        bookStore.requestReads(bookId);
        metricsStore.trackRefresh();
        navigate(`/book/${bookId}`);
    };

    return (
        <Page>
            <Title>Add Read</Title>
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
                        <Sessions />
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
`

const Title = styled.h1`
`

const Container = styled.div`
  display: flex;
  gap: 25px;
  background-color: ${theme.palette.info.light};
  border-radius: ${border.borderRadius};
  padding: 20px;

  @media only screen and ${device.tablet} {
    flex-flow: column;
    align-items: center;
    justify-content: center;
  }
`

const Subtitle = styled.div`
  padding-left: 2px;
  font-family: 'PoppinsSemiBold', sans-serif;
  color: ${theme.palette.primary.main};
`

const Form = styled.form`
  display: flex;
  flex-flow: column;
  width: 57%;
  gap: 25px;
  
  @media only screen and ${device.tablet} {
    width: 80vw;
    flex-flow: column;
    display: flex;
    align-items: center;
    justify-items: center;
  }
`

const FormContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 10px;
`

const FieldContainer = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  gap: 20px;
  
  @media only screen and ${device.tablet} {
    width: 80vw;
  }
`

const DatesContainer = styled.div`
  display: flex;
  gap: 10px;

  @media only screen and ${device.tablet} {
    flex-flow: column;
  }
`

const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  align-self: end;
  
  button {
    width: 120px;
  }

  @media only screen and ${device.tablet} {
    align-self: center;
    button {
      width: 100px;
    }
  }
`