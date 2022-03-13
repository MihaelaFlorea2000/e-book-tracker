import React from "react";
import styled from "@emotion/styled";
import { useStore } from "../../stores/RootStore";
import {CircularLoading} from "../../utils/components/CircularLoading";
import { Title } from "../../utils/components/Title";
import UsersList from "../../utils/components/User/UsersList";
import { observer } from "mobx-react";
import {useParams} from "react-router-dom";

const MutualFriendsPage = () => {

    const params = useParams();
    const userId = Number(params.userId);

    const { friendsStore } = useStore();

    const friends = friendsStore.getMutualFriends(userId);

    if (friends === undefined) {
        return (
            <Page>
                <Title text="Friends" />
                <CircularLoading />
            </Page>
        )
    }

    return (
        <Page>
            <Title text="Mutual Friends" />
            <UsersList users={friends} showTitle={false}/>
        </Page>
    )
}

export default observer(MutualFriendsPage);

const Page = styled.div`
  padding: 20px;
  color: ${props => props.theme.palette.secondary.dark}
`
