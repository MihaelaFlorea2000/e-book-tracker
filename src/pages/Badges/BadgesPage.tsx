import React, {ReactNode} from "react";
import styled from "@emotion/styled";
import { useStore } from "../../stores/RootStore";
import {Title} from "../../utils/components/Title";
import {CircularLoading} from "../../utils/components/CircularLoading";
import NotificationElement from "../Home/components/Notifications/NotificationElement";
import Badge from "./components/Badge";

const BadgesPage = () => {

    const { badgesStore } = useStore();

    const badges = badgesStore.getBadges();

    if (badges === undefined) {
        return (
            <Page>
                <Title text="Badges" />
                <CircularLoading />
            </Page>
        )
    }

    let badgeNodes: ReactNode[] = [];

    badges.forEach((elem, index) => {
        badgeNodes.push(
            <Badge key={index} badge={elem} />
        )

    })

    return (
        <Page>
            <Title text="Badges" />
            <BadgeList>
                {badgeNodes}
            </BadgeList>
        </Page>
    )
}

export default BadgesPage;

const Page = styled.div`
  padding: 20px;
  color: ${props => props.theme.palette.secondary.dark}
`

const BadgeList = styled.div`
  display: flex;
  flex-flow: column;
  gap: 20px;
`

