import React, {ChangeEvent, useEffect, useState} from "react";
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
import { border, theme } from "../../../utils/style/themeConfig";
import { device } from "../../../config/config";
import {BookInterface, BookReadInterface, IntervalInterface} from "../../../config/interfaces";
import { useStore } from "../../../stores/RootStore";
import axiosConfig from "../../../config/axiosConfig";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import {BookRating} from "../../../utils/components/BookRating";
import {toJS} from "mobx";
import {useNavigate, useParams} from "react-router-dom";

// interface Props {
//     read: BookReadInterface
// }

interface FormInterface {
    startDate: string,
    endDate: string,
    years: number,
    months: number,
    days: number,
    hours: number,
    minutes: number,
    seconds: number,
    milliseconds: number
    sessions: number,
    rating: number,
    notes: string
}

const yupTime = yup.lazy((value) => (value === '' ? yup.string() : yup.number()))

// Upload form validation schema step 2
// Validate metadata
const readSchema = yup.object().shape({
    startDate: yup.string().required('Start Date is required'),
    endDate: yup.string(),
    years: yup.lazy((value) => (value === '' ? yup.string() : yup.number().moreThan(-1))),
    months: yup.lazy((value) => (value === '' ? yup.string() : yup.number().moreThan(-1))),
    days: yup.lazy((value) => (value === '' ? yup.string() : yup.number().moreThan(-1))),
    hours: yup.lazy((value) => (value === '' ? yup.string() : yup.number().moreThan(-1))),
    minutes: yup.lazy((value) => (value === '' ? yup.string() : yup.number().moreThan(-1))),
    seconds: yup.lazy((value) => (value === '' ? yup.string() : yup.number().moreThan(-1))),
    milliseconds: yup.lazy((value) => (value === '' ? yup.string() : yup.number().moreThan(-1))),
    sessions: yup.lazy((value) => (value === '' ? yup.string() : yup.number().moreThan(-1))),
    notes: yup.string()
});

const ReadDialog = () => {

    const navigate = useNavigate();

    // Get ReaderStore
    const { bookStore, readStore } = useStore();

    // Get book and read
    const params = useParams();
    const bookId = Number(params.bookId);

    // Get state
    const isOpen = readStore.isReadDialogue();
    const editId = readStore.getEditId();
    const isFinish = readStore.isFinish();

    const [rating, setRating] = useState<number>(readStore.getRating());

    const { register, handleSubmit, formState: { errors }, setError } = useForm<FormInterface>({
        resolver: yupResolver(readSchema),
        mode: 'onChange',
        defaultValues: {
            startDate: readStore.getStartDate(),
            endDate: readStore.getEndDate(),
            years: readStore.getYears(),
            months: readStore.getMonths(),
            days: readStore.getDays(),
            hours: readStore.getHours(),
            minutes: readStore.getMinutes(),
            seconds: readStore.getSeconds(),
            milliseconds: readStore.getMilliseconds(),
            sessions: readStore.getSessions(),
            notes: readStore.getNotes()
        }
    });

    // On CLOSE button
    const handleClose = () => {
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
        }
    }

    // On SAVE button
    const onSubmit = async (data: FormInterface) => {

        const newRead = {
            startDate: data.startDate,
            endDate: data.endDate,
            time: {
                years: data.years,
                months: data.months,
                days: data.days,
                hours: data.hours,
                minutes: data.minutes,
                seconds: data.seconds,
                milliseconds: data.milliseconds
            },
            sessions: data.sessions,
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
                    <TimeSessions>
                        <TimeContainer>
                            <FieldContainer>
                                <Subtitle>Years</Subtitle>
                                <StyledTextField
                                    id="years"
                                    placeholder="Years"
                                    variant="outlined"
                                    type="number"
                                    {...register('years')}
                                    error={!!errors.years}
                                    fullWidth
                                />
                            </FieldContainer>
                            <FieldContainer>
                                <Subtitle>Months</Subtitle>
                                <StyledTextField
                                    id="months"
                                    placeholder="Months"
                                    variant="outlined"
                                    type="number"
                                    {...register('months')}
                                    error={!!errors.months}
                                    fullWidth
                                />
                            </FieldContainer>
                            <FieldContainer>
                                <Subtitle>Days</Subtitle>
                                <StyledTextField
                                    id="days"
                                    placeholder="Days"
                                    variant="outlined"
                                    type="number"
                                    {...register('days')}
                                    error={!!errors.days}
                                    fullWidth
                                />
                            </FieldContainer>
                            <FieldContainer>
                                <Subtitle>Hours</Subtitle>
                                <StyledTextField
                                    id="hours"
                                    placeholder="Hours"
                                    variant="outlined"
                                    type="number"
                                    {...register('hours')}
                                    error={!!errors.hours}
                                    fullWidth
                                />
                            </FieldContainer>
                            <FieldContainer>
                                <Subtitle>Min</Subtitle>
                                <StyledTextField
                                    id="minutes"
                                    placeholder="Min"
                                    variant="outlined"
                                    type="number"
                                    {...register('minutes')}
                                    error={!!errors.minutes}
                                    fullWidth
                                />
                            </FieldContainer>
                            <FieldContainer>
                                <Subtitle>Sec</Subtitle>
                                <StyledTextField
                                    id="seconds"
                                    placeholder="Sec"
                                    variant="outlined"
                                    type="number"
                                    {...register('seconds')}
                                    error={!!errors.seconds}
                                    fullWidth
                                />
                            </FieldContainer>
                            <FieldContainer>
                                <Subtitle>Millisec</Subtitle>
                                <StyledTextField
                                    id="milliseconds"
                                    placeholder="Millisec"
                                    inputProps={{
                                        step: "0.001"
                                    }}
                                    variant="outlined"
                                    type="number"
                                    {...register('milliseconds')}
                                    error={!!errors.milliseconds}
                                    fullWidth
                                />
                            </FieldContainer>
                        </TimeContainer>
                        <SessionsContainer>
                            <Subtitle>Sessions</Subtitle>
                            <StyledTextField
                                id="sessions"
                                placeholder="Sessions"
                                variant="outlined"
                                type="number"
                                {...register('sessions')}
                                error={!!errors.sessions}
                            />
                        </SessionsContainer>
                    </TimeSessions>
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
                <DialogActions>
                    <Button type='submit'>Save</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </FormContainer>
        </Dialog>
    )
}

export default observer(ReadDialog);

const Title = styled(DialogTitle)`
  font-family: 'PoppinsSemiBold', sans-serif;
`

const Container = styled(DialogContent)`
  display: flex;
  flex-flow: column;
  gap: 30px;
`

const Subtitle = styled.div`
  padding-left: 2px;
  font-family: 'PoppinsSemiBold', sans-serif;
  color: ${theme.palette.primary.main};
`

const FormContainer = styled.form`
`

const FieldContainer = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  gap: 5px;
`

const DatesContainer = styled.div`
  display: flex;
  gap: 10px;
`
const TimeContainer = styled.div`
  display: flex;
  gap: 10px;
  
  input {
    font-size: 0.8rem;
  }
`
const SessionsContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 5px;
  
  input {
    font-size: 0.8rem;
  }
`
const TimeSessions = styled.div`
  display: flex;
  gap: 10px;
`

const Label = styled.div`
  font-size: 0.9rem;
  color: ${theme.palette.info.main};
  text-align: center;
`