import styled from "@emotion/styled";
import React, { useEffect } from "react";
import UploadStore from "../../stores/UploadStore";
import MetadataForm from "./components/MetadataForm";
import {observer} from "mobx-react";
import UserStore from "../../stores/UserStore";
import {CircularLoading} from "../../utils/components/CircularLoading";
import {useNavigate} from "react-router-dom";

const UploadSecondStep = () => {

    useEffect(() => {
        window.addEventListener("unload", reroute);
        return () => {
            window.removeEventListener("unload", reroute);
        };
    }, []);

    let navigate = useNavigate();

    const reroute = (e:any) => {
        e.preventDefault();
        //console.log("hi");
        navigate('/upload/1');
        return false;
    };

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

