import {useNavigate, useParams} from "react-router-dom";
import {useStore} from "../../stores/RootStore";
import React, {ChangeEvent, useEffect, useState} from "react";
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
import * as yup from "yup";
import EditDialogue from "./components/EditDialogue";
import BookCover from "../../utils/components/BookCover";
import {
    Form,
    FormContainer,
    DatesContainer,
    FieldContainer,
    Subtitle,
    ButtonsContainer
} from "../../utils/style/readFormStyle";
import {border, theme} from "../../utils/style/themeConfig";
import {device} from "../../config/config";

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
        setIsSubmitting(true);

        const newRead = {
            startDate: editReadStore.formatDate(data.startDate),
            endDate: editReadStore.formatDate(data.endDate),
            rating: rating,
            notes: data.notes
        }

        try {
            const res = await axiosConfig().put(`/pg/reads/${bookId}/${readId}`, newRead);
            console.log(res);
            bookStore.requestReads(bookId);
            metricsStore.trackRefresh();
            navigate(`/book/${bookId}`);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Page>
            <Title>Edit Read</Title>
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
                <EditDialogue readId={readId}/>
            </Container>
        </Page>
    )
}

export default observer(EditReadPage);

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