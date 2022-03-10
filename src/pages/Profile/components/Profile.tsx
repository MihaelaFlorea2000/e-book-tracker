import {useParams} from "react-router-dom";
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

interface Props {
    store: ProfileStore;
}

const Profile = (props: Props) => {

   const profileStore = props.store;

    const profileSettings = profileStore.getProfileSettings();

    if (profileSettings === undefined) {
        return (
            <CircularLoading />
        )
    }

    const size = profileSettings.showNumbers ? '50vw' : '100%';

    return (
        <Page>
            <Container>
                <ProfileDetails store={profileStore}/>
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
`

const GoalsContainer = styled.div<{size: string}>`
  display: flex;
  flex-flow: column;
  gap: 30px;
  align-items: center;
  width: ${props => props.size};
`

const BooksContainer = styled.div`
    padding: 30px;
`

const Title = styled.h2`
`