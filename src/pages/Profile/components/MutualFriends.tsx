import React, { ReactNode } from "react";
import styled from "@emotion/styled";
import ProfileStore from "../../../stores/ProfileStore";
import {CircularLoading} from "../../../utils/components/CircularLoading";
import {observer} from "mobx-react";
import { device } from "../../../utils/helpers/constants";
import {NavLink, useParams} from "react-router-dom";

interface Props {
    store: ProfileStore,
}

/**
 * Component for displaying mutual friends on profile page
 * @param props
 * @constructor
 */
const MutualFriends = (props: Props) => {

    // Get book
    const params = useParams();
    const userId = Number(params.userId);

    const profileStore = props.store;

    const mutualFriends = profileStore.getMutualFriends();

    if (mutualFriends === undefined) {
        return (
            <Container>
                <CircularLoading />
            </Container>
        )
    }

    let mutualFriendsNodes: ReactNode[] = [];

    for (const [index, friend] of mutualFriends.entries()) {
        if (index > 5) break;
        mutualFriendsNodes.push(
            <>
                <FriendImageContainer index={index}>
                    <NavLink to={`/profile/${friend.id}`}><FriendImage image={friend.profileImage}/></NavLink>
                </FriendImageContainer>
            </>

        )
    }

    return (
        <Container>
            <Text>
                {mutualFriendsNodes.length} mutual friend{mutualFriendsNodes.length !== 1 && 's'}
            </Text>
            <Friends>
                {mutualFriendsNodes}
            </Friends>
            {mutualFriendsNodes.length > 5 &&
                <NavLink to={`/friends/mutual/${userId}`}>
                    <LinkText>View all</LinkText>
                </NavLink>
            }
        </Container>
    )
}

export default observer(MutualFriends);

const Container = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;

  @media only screen and ${device.mobileL} {
    flex-flow: column;
    justify-content: center;
  }
`

const Friends = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
`

const FriendImageContainer = styled.div<{index: number}>`
  position: relative;
  left: calc(${props => props.index} * (-15px));
`

const FriendImage = styled.div<{image: string}>`
  border-radius: 100%;
  min-width: 40px;
  min-height: 40px;
  width: 40px;
  height: 40px;
  background-image: url(${props => props.image});
  background-size: cover;
`

const Text = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.palette.info.main}
`

const LinkText = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.palette.info.main};
  
  :hover {
    text-decoration: underline;
  }
`
