import styled from "@emotion/styled";
import React from "react";
import UploadStore from "../../stores/UploadStore";
import MetadataForm from "./components/MetadataForm";
import {observer} from "mobx-react";
import UserStore from "../../stores/UserStore";
import {device} from "../../config/config";
import CircularProgress from "@mui/material/CircularProgress";
import {CircularLoading} from "../../utils/components/Components";

const UploadSecondStep = () => {

    let isMetadataSet = UploadStore.isMetadataSet();
    let user = UserStore.getCurrentUser();

    if (!isMetadataSet || user === undefined) {
        return (
            <Page>
                <Title>Upload Page</Title>
                <CircularLoading />
            </Page>
        )
    }

    return (
        <Page>
            <Title>Upload Page</Title>
            <MetadataForm user={user}/>
        </Page>
    )
}

export default observer(UploadSecondStep);

const Page = styled.div`
  padding: 20px;
`

const Title = styled.h1`
`

