import ProfileStore from "../../../stores/ProfileStore";
import {CircularLoading} from "../../../utils/components/CircularLoading";
import ProfileDetails from "./ProfileDetails";
import Goals from "../../../utils/components/Metrics/Goals";
import Numbers from "../../../utils/components/Metrics/Numbers";
import UserBooks from "./UserBooks";
import {observer} from "mobx-react";
import styled from "@emotion/styled";
import {border} from "../../../utils/style/themeConfig";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLock} from "@fortawesome/free-solid-svg-icons";
import {useStore} from "../../../stores/RootStore";
import { device } from "../../../utils/helpers/constants";

interface Props {
    store: ProfileStore;
}

/**
 * Component for displaying profile page based on user preferences
 * and friend status
 * @param props
 * @constructor
 */
const Profile = (props: Props) => {

    const { userStore } = useStore();

    const profileStore = props.store;

    const profileSettings = profileStore.getProfileSettings();
    const user = profileStore.getUser();
    const currentUser = userStore.getCurrentUser();

    if (profileSettings === undefined || user === undefined || currentUser === undefined) {
        return (
            <CircularLoading />
        )
    }

    const size = profileSettings.showNumbers ? '50vw' : '100%';
    const isMyProfile = currentUser.id === user.id;

    const showProfileInfo =
        profileSettings.profileVisibility === 'all'
        || isMyProfile
        || (profileSettings.profileVisibility === 'friends'
            && user.isFriend)

    return (
        <Page>
            <Container>
                <ProfileDetails store={profileStore} user={user} isMyProfile={isMyProfile}/>
                {showProfileInfo &&
                    <ProfileInfo>
                        <MetricsContainer>
                            {profileSettings.showGoals &&
                                <GoalsContainer size={size}>
                                    <Title>Goals</Title>
                                    <Goals store={profileStore} />
                                </GoalsContainer>
                            }
                            {profileSettings.showNumbers &&
                                <Numbers size="small" store={profileStore}/>
                            }
                        </MetricsContainer>
                        {profileSettings.showBooks &&
                            <BooksContainer>
                                <UserBooks store={profileStore} />
                            </BooksContainer>
                        }
                    </ProfileInfo>
                }
                {profileSettings.profileVisibility === 'none' && !isMyProfile
                    &&
                    <PrivateProfile>
                        <IconContainer>
                            <FontAwesomeIcon icon={faLock}/>
                        </IconContainer>
                        This profile is private.
                    </PrivateProfile>
                }
                {profileSettings.profileVisibility === 'friends' && !user.isFriend && !isMyProfile
                    &&
                    <PrivateProfile>
                        <IconContainer>
                            <FontAwesomeIcon icon={faLock}/>
                        </IconContainer>
                        This profile is private. You must become friends to view their profile
                    </PrivateProfile>
                }
            </Container>
        </Page>
    )
}

export default observer(Profile);

const Page = styled.div`
  padding: 20px;
  color: ${props => props.theme.palette.secondary.dark}
`

const Container = styled.div`
  display: flex;
  flex-flow: column;
  gap: 20px;
  border-radius: ${border.borderRadius};
  background-color: ${props => props.theme.palette.info.light};
`

const ProfileInfo = styled.div`
`

const MetricsContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;


  @media only screen and ${device.tablet} {
    flex-flow: column;
  }
`

const GoalsContainer = styled.div<{size: string}>`
  display: flex;
  flex-flow: column;
  gap: 30px;
  align-items: center;
  width: ${props => props.size};

  @media only screen and ${device.tablet} {
    flex-flow: row;
    flex-wrap: wrap;
    width: 100%;
    padding: 10px;
  }
`

const BooksContainer = styled.div`
    padding: 30px;
`

const Title = styled.h2`
`

const IconContainer = styled.div`
  font-size: 2rem;
`

const PrivateProfile = styled.div`
  padding: 20px;
  display: flex;
  flex-flow: column;
  gap: 5px;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: ${props => props.theme.palette.info.main}
`

