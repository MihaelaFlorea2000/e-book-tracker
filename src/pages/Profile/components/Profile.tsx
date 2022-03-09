import React from "react";
import styled from "@emotion/styled";
import ProfileStore from "../../../stores/ProfileStore";
import {CircularLoading} from "../../../utils/components/CircularLoading";
import { observer } from "mobx-react";

interface Props {
    store: ProfileStore
}

const Profile = (props: Props) => {

    const profileStore = props.store;

    const user = profileStore.getUser();

    if (user === undefined) {
        return (
            <Container>
                <CircularLoading />
            </Container>
        )
    }

    return (
        <Container>
            {user.firstName}
        </Container>
    )
}

export default observer(Profile);

const Container = styled.div`
`
