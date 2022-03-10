import React from "react";
import styled from "@emotion/styled";
import {useParams} from "react-router-dom";
import ProfileStore from "../../stores/ProfileStore";
import {observer} from "mobx-react";
import {border} from "../../utils/style/themeConfig";
import ProfileDetails from "./components/ProfileDetails";
import Goals from "../../utils/components/Metrics/Goals";
import Numbers from "../../utils/components/Metrics/Numbers";
import UserBooks from "./components/UserBooks";

const ProfilePage = () => {

    let params = useParams();
    let userId = Number(params.userId);

    const profileStore = new ProfileStore(userId)

    return (
        <Page>
            <Container>
                <ProfileDetails store={profileStore}/>
                <MetricsContainer>
                    <GoalsContainer>
                        <Title>Goals</Title>
                        <Goals store={profileStore} />
                    </GoalsContainer>
                    <Numbers store={profileStore}/>
                </MetricsContainer>
                <BooksContainer>
                    <UserBooks store={profileStore} />
                </BooksContainer>
            </Container>
        </Page>
    )
}

export default observer(ProfilePage);

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

const MetricsContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`

const GoalsContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 30px;
  align-items: center;
`

const BooksContainer = styled.div`
    padding: 30px;
`

const Title = styled.h2`
`