import React, { ReactNode } from "react";
import { observer } from "mobx-react";
import styled from "@emotion/styled";
import { device } from "../../../../utils/helpers/constants";
import {useStore} from "../../../../stores/RootStore";
import {CircularLoading} from "../../../../utils/components/CircularLoading";
import NotificationElement from "./NotificationElement";

/**
 * Side menu for displaying user notifications
 * @constructor
 */
const NotificationsMenu = () => {

    // Get notifications
    const { notificationsStore } = useStore();
    const notifications = notificationsStore.getNotifications();

    // Loading
    if (notifications === undefined) {
        return (
            <NotificationsContainer>
                <Title>Notifications</Title>
                <CircularLoading />
            </NotificationsContainer>
        )
    }

    let notificationNodes: ReactNode[] = [];

    notifications.forEach((elem, index) => {
        notificationNodes.push(
            <NotificationElement key={index} notification={elem} />
        )

    })

    return (
        <Container>
            <Title>Notifications</Title>
            <NotificationsContainer>
                {notificationNodes}
            </NotificationsContainer>
        </Container>
    )
};

export default observer(NotificationsMenu);

const Container = styled.div`
  width: 60vw;
  padding: 20px;
  
  @media only screen and ${device.mobileL} {
    width: 80vw;
    font-size: 0.9rem;
  }
`

const NotificationsContainer = styled.div`
  display: flex;
  gap: 30px;
  flex-flow: column;
`

const Title = styled.h2`
`
