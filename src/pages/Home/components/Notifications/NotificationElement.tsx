import React from "react";
import { observer } from "mobx-react";
import styled from "@emotion/styled";
import { NotificationInterface} from "../../../../config/interfaces";
import {ProfileImage} from "../../../../utils/components/ProfileImage";
import {border} from "../../../../utils/style/themeConfig";
import {NavLink} from "react-router-dom";

/**
 * Icon created on Flaticon by Vectors Market
 * https://www.flaticon.com/free-icons/medal
 */
// @ts-ignore
import badgeImage from "../../../../utils/images/badge.png";


interface Props {
    notification: NotificationInterface;
}
const NotificationElement = (props: Props) => {

    let text;
    let image;
    let link;

    if (props.notification.type === 'friend') {
        text = <Text><Bold>{props.notification.firstName} {props.notification.lastName}</Bold> wants to be your friend!</Text>
        image = props.notification.image;
        link = `/profile/${props.notification.senderId}`
    } else {
        text = <Text>Congratulations! You've received a <Bold>new badge</Bold>!</Text>
        image = badgeImage;
        link = '/badges'
    }

    return (
        <NavLink to={link}>
            <Container>
                <ProfileImage image={image} size="small" />
                <NotificationBody>
                    {text}
                    <DateText>{new Date(props.notification.date).toUTCString()}</DateText>
                </NotificationBody>
            </Container>
        </NavLink>
    )
};

export default observer(NotificationElement);

const Container = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  border-radius: ${border.borderRadius};
  box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
  padding: 10px;
  width: 100%;
  transition: box-shadow 0.5s;

  :hover {
    box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
  }
`

const NotificationBody = styled.div`
  display: flex;
  flex-flow: column;
  gap: 10px;
`

const Text = styled.div`
  font-size: 1.1rem;
`

const DateText = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.palette.info.main}
`

const Bold = styled.span`
  font-family: 'PoppinsSemiBold', sans-serif;
`