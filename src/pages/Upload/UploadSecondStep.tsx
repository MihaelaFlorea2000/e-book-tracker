import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import styled from "@emotion/styled";
import MetadataForm from "./components/MetadataForm";
import { CircularLoading } from "../../utils/components/CircularLoading";
import { useStore } from "../../stores/RootStore";
import { Title } from "../../utils/components/Title";
import {toJS} from "mobx";

/**
 * Page for updating book metadata
 * @constructor
 */
const UploadSecondStep = () => {

    const navigate = useNavigate();

    // Get stores access
    const { uploadStore, userStore } = useStore();

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
    let isMetadataSet = uploadStore.isMetadataSet();
    let user = userStore.getCurrentUser();

    console.log(toJS(uploadStore.getTitle()))

    if (!isMetadataSet || user === undefined) {
        return (
            <Page>
                <Title text="Upload Book" />
                <CircularLoading />
            </Page>
        )
    }

    return (
        <Page>
            <Title text="Upload Book" />
            <MetadataForm user={user} type="upload"/>
        </Page>
    )
}

export default observer(UploadSecondStep);

const Page = styled.div`
  padding: 20px;
  color: ${props => props.theme.palette.secondary.dark}
`


