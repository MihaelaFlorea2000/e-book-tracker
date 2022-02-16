import styled from "@emotion/styled";
import React, { useEffect } from "react";
import UploadStore from "../../stores/UploadStore";
import MetadataForm from "./components/MetadataForm";
import {observer} from "mobx-react";
import UserStore from "../../stores/UserStore";
import {CircularLoading} from "../../utils/components/CircularLoading";
import {useNavigate} from "react-router-dom";

const UploadSecondStep = () => {

    const navigate = useNavigate();

    // Go back to first upload step on refresh
    useEffect(() => {
        window.addEventListener("unload", reroute);
        return () => {
            window.removeEventListener("unload", reroute);
        };
    }, []);

    const reroute = (e:any) => {
        e.preventDefault();
        navigate('/upload/1');
        return false;
    };

    // Get epub metadata
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
            <MetadataForm user={user} type="upload"/>
        </Page>
    )
}

export default observer(UploadSecondStep);

const Page = styled.div`
  padding: 20px;
`

const Title = styled.h1`
`

