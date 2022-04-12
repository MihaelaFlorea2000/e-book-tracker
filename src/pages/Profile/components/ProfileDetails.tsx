import React, {useState} from "react";
import styled from "@emotion/styled";
import { observer } from "mobx-react";
import {ProfileImage} from "../../../utils/components/ProfileImage";
import {UserProfileInterface} from "../../../utils/helpers/interfaces";
import {faUserPlus, faUserMinus, faUserTimes, faCommentSlash, faUserCheck} from "@fortawesome/free-solid-svg-icons";
import axiosConfig from "../../../utils/helpers/axiosConfig";
import IconButton from "../../../utils/components/Buttons/IconButton";
import Alert from "@mui/material/Alert";
import { device } from "../../../utils/helpers/constants";
import ProfileStore from "../../../stores/ProfileStore";
import MutualFriends from "./MutualFriends";

interface Props {
    store: ProfileStore,
    user: UserProfileInterface,
    isMyProfile: boolean
}

/**
 * Component for displaying user details on profile page
 * @param props
 * @constructor
 */
const ProfileDetails = (props: Props) => {

    // Friend status satate
    const [sentRequest, setSentRequest] = useState<boolean>(props.user.sentRequest);
    const [friends, setFriends] = useState<boolean>(props.user.isFriend);
    const [receivedRequest, setReceivedRequest] = useState<boolean>(props.user.receivedRequest);

    // Button state
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [accepting, setAccepting] = useState<boolean>(false);
    const [rejecting, setRejecting] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleSendFriendRequest = async() => {
        setIsSubmitting(true);
        setErrorMessage('');
        try {
            const newRequest = {receiverId: props.user.id}
            await axiosConfig().post('/friends/requests', newRequest)
            setSentRequest(true);
            setIsSubmitting(false);
        } catch (err:any) {
            setIsSubmitting(false);
            setErrorMessage(err.response.data.message)
            console.log(err)
        }
    }

    const handleUnsendFriendRequest = async() => {
        setIsSubmitting(true);
        try {
            await axiosConfig().delete(`/friends/requests/${props.user.id}`)
            setSentRequest(false);
            setIsSubmitting(false);
        } catch (err:any) {
            setIsSubmitting(false);
            setErrorMessage(err.response.data.message);
            console.log(err)
        }
    }

    const handleUnfriend = async() => {
        setIsSubmitting(true);
        setErrorMessage('');
        try {
            await axiosConfig().delete(`/friends/${props.user.id}`)
            setFriends(false);
            setIsSubmitting(false);
        } catch (err:any) {
            setIsSubmitting(false);
            setErrorMessage(err.response.data.message);
            console.log(err)
        }
    }

    const handleAcceptRequest = async() => {
        setAccepting(true);
        setErrorMessage('');
        try {
            await axiosConfig().post(`/friends/requests/${props.user.id}`, {accept: true})
            setFriends(true);
            setReceivedRequest(false);
            setAccepting(false);

        } catch (err:any) {
            setAccepting(false);
            setErrorMessage(err.response.data.message);
            console.log(err)
        }
    }

    const handleRejectRequest = async() => {
        setRejecting(true);
        setErrorMessage('');
        try {
            await axiosConfig().post(`/friends/requests/${props.user.id}`, {accept: false})
            setFriends(false);
            setReceivedRequest(false);
            setRejecting(false);

        } catch (err:any) {
            setRejecting(false);
            setErrorMessage(err.response.data.message);
            console.log(err);
        }
    }

    return (
        <Container>
            <ProfileContainer>
                <DetailsContainer>
                    <ProfileImage size="large" image={props.user.profileImage}/>
                    <NameContainer>
                        <Name>{props.user.firstName} {props.user.lastName}</Name>
                        <Email>{props.user.email}</Email>
                        <MutualFriends store={props.store} />
                    </NameContainer>
                </DetailsContainer>
                <ButtonsContainer>
                    {!friends && !sentRequest && !receivedRequest && !props.isMyProfile &&
                        <IconButton
                            loadingCondition={isSubmitting}
                            icon={faUserPlus}
                            name="Add Friend"
                            onClick={handleSendFriendRequest}
                        />
                    }

                    {!friends && sentRequest && !receivedRequest && !props.isMyProfile &&
                        <IconButton
                            loadingCondition={isSubmitting}
                            icon={faCommentSlash}
                            name="Unsend Request"
                            onClick={handleUnsendFriendRequest}
                        />
                    }

                    {friends && !props.isMyProfile &&
                        <IconButton
                            loadingCondition={isSubmitting}
                            icon={faUserMinus}
                            name="Unfriend"
                            onClick={handleUnfriend}
                        />
                    }

                    {receivedRequest && !props.isMyProfile &&
                        <>
                            <IconButton
                                loadingCondition={accepting}
                                icon={faUserCheck}
                                name="Accept"
                                onClick={handleAcceptRequest}
                            />
                            <IconButton
                                loadingCondition={rejecting}
                                icon={faUserTimes}
                                name="Reject"
                                onClick={handleRejectRequest}
                            />
                        </>
                    }
                </ButtonsContainer>
            </ProfileContainer>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        </Container>
    )
}

export default observer(ProfileDetails);


const ProfileContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: space-between;
  
  button {
    width: 120px;
    height: 50px;
  }

  @media only screen and ${device.mobileL} {
    flex-flow: column;
  }
`

const NameContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 5px;

  @media only screen and ${device.mobileL} {
    align-items: center;
    justify-content: center;
  }
`

const ButtonsContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 5px;

  button {
    width: 120px;
    height: 50px;
  }

  @media only screen and ${device.mobileL} {
    flex-flow: row;
    gap: 10px;
  }
`

const Name = styled.h1`
  margin: 0;
  padding: 0;

  @media only screen and ${device.mobileL} {
    text-align: center;
  }
`

const Email = styled.div`
  color: ${props => props.theme.palette.info.main}
`

const DetailsContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;

  @media only screen and ${device.mobileL} {
    flex-flow: column;
    justify-content: center; 
  }
`

const Container = styled.div`
  display: flex;
  flex-flow: column;
  gap: 10px;
  padding: 30px;
  border-bottom: 4px solid ${props => props.theme.palette.primary.light};
`


