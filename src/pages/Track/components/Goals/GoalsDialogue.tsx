import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import LoadingButton from "@mui/lab/LoadingButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import { useStore } from "../../../../stores/RootStore";
import { StyledTextField } from "../../../../utils/style/styledComponents";
import {theme} from "../../../../utils/style/themeConfig";
import { device } from "../../../../config/config";
import axiosConfig from "../../../../config/axiosConfig";


interface FormInterface {
    yearly: number,
    monthly: number,
    dailyHours: number,
    dailyMinutes: number
}

// Read Schema validation
const readSchema = yup.object().shape({
    yearly: yup.lazy((value) => (value === '' ? yup.string() : yup.number().moreThan(-1))),
    monthly: yup.lazy((value) => (value === '' ? yup.string() : yup.number().moreThan(-1))),
    dailyHours: yup.lazy((value) => (value === '' ? yup.string() : yup.number().moreThan(-1).lessThan(24))),
    dailyMinutes: yup.lazy((value) => (value === '' ? yup.string() : yup.number().moreThan(-1).lessThan(60))),
});

const GoalsDialogue = () => {

    const navigate = useNavigate();

    // Get stores
    const { metricsStore } = useStore();

    // Get state
    const isOpen = metricsStore.isGoalsDialogue();

    // Form
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isCancelling, setIsCancelling] = useState<boolean>(false);

    const { register, handleSubmit, formState: { errors } } = useForm<FormInterface>({
        resolver: yupResolver(readSchema),
        mode: 'onChange',
        defaultValues: {
            yearly: metricsStore.getSetGoals().yearly,
            monthly: metricsStore.getSetGoals().monthly,
            dailyHours: metricsStore.getSetGoals().dailyHours,
            dailyMinutes: metricsStore.getSetGoals().dailyMinutes
        }
    });

    // On CLOSE button
    const handleClose = () => {
        setIsCancelling(true);
        // Close dialog and reset state
        metricsStore.setGoalsDialogue(false);
        navigate(`/track`);
    };

    // On SAVE button
    const onSubmit = async (data: FormInterface) => {
        setIsSubmitting(true);

        try {
            const res = await axiosConfig().post(`/pg/users/goals`, data);
            console.log(res);
            metricsStore.requestGoals();
        } catch (err) {
            console.log(err);
            setIsSubmitting(false);
        }
        // Close dialog and reset state
        metricsStore.setGoalsDialogue(false);
        navigate(`/track`);
    };


    return (
        <Dialog open={isOpen} onClose={handleClose} maxWidth={'lg'}>
            <Title>Set Goals</Title>
            <FormContainer onSubmit={handleSubmit(onSubmit)}>
                <Container>
                    <FieldContainer>
                        <Subtitle>Yearly</Subtitle>
                        <StyledTextField
                            id="yearly"
                            placeholder="Yearly"
                            variant="outlined"
                            type="number"
                            {...register('yearly')}
                            error={!!errors.yearly}
                            fullWidth
                        />
                    </FieldContainer>
                    <FieldContainer>
                        <Subtitle>Monthly</Subtitle>
                        <StyledTextField
                            id="monthly"
                            placeholder="Monthly"
                            variant="outlined"
                            type="number"
                            {...register('monthly')}
                            error={!!errors.monthly}
                            fullWidth
                        />
                    </FieldContainer>
                    <FieldContainer>
                        <Subtitle>Daily</Subtitle>
                        <DailyContainer>
                            <FieldContainer>
                                <Label>Hours</Label>
                                <StyledTextField
                                    id="dailyHours"
                                    placeholder="Hours"
                                    variant="outlined"
                                    type="number"
                                    {...register('dailyHours')}
                                    error={!!errors.dailyHours}
                                    fullWidth
                                />
                            </FieldContainer>
                            <FieldContainer>
                                <Label>Minutes</Label>
                                <StyledTextField
                                    id="dailyMinutes"
                                    placeholder="Minutes"
                                    variant="outlined"
                                    type="number"
                                    {...register('dailyMinutes')}
                                    error={!!errors.dailyMinutes}
                                    fullWidth
                                />
                            </FieldContainer>
                        </DailyContainer>
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

export default observer(GoalsDialogue);

const Title = styled(DialogTitle)`
  font-family: 'PoppinsSemiBold', sans-serif;
`

const Subtitle = styled.div`
  padding-left: 2px;
  font-family: 'PoppinsSemiBold', sans-serif;
  color: ${theme.palette.primary.main};
`

const Label = styled.div`
  padding-left: 2px;
  color: ${theme.palette.info.main};
  font-size: 0.9rem;
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

const DailyContainer = styled.div`
  display: flex;
  gap: 10px;
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