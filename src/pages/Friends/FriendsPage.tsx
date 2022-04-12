import React from "react";
import styled from "@emotion/styled";
import { useStore } from "../../stores/RootStore";
import {CircularLoading} from "../../utils/components/CircularLoading";
import { Title } from "../../utils/components/Title";
import UsersList from "../../utils/components/User/UsersList";
import { observer } from "mobx-react";

/**
 * Page displaying the current user's friends
 * @constructor
 */
const FriendsPage = () => {

    const { friendsStore } = useStore();

    const friends = friendsStore.getFriends();

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
            <Title text="Friends" />
            <UsersList users={friends} showTitle={false}/>
        </Page>
    )
}

export default observer(FriendsPage);

const Page = styled.div`
  padding: 20px;
  color: ${props => props.theme.palette.secondary.dark}
`
