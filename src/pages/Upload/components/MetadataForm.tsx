import styled from "@emotion/styled";
import React from "react";
import {MetadataInterface} from "../../../config/interfaces";
import TextField from "@mui/material/TextField";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

interface Props {
    metadata: MetadataInterface | undefined;
}

interface FormState {
    title: string
}

const MetadataForm = (props: Props) => {

    // const user = UserStore.getCurrentUser();
    //
    // if (user === undefined) {
    //     return(
    //         <p>Loading</p>
    //     )
    // }

    return (

        <FormContainer key={props.metadata?.title}>
            <TextField
                id="title"
                label="title"
                variant="outlined"
                type="title"
                defaultValue={props.metadata?.title}
            />
        </FormContainer>
    )
}

export default MetadataForm;

const FormContainer = styled.form`
`

