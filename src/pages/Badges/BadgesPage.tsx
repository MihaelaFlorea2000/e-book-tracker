import React, {ReactNode} from "react";
import styled from "@emotion/styled";
import { useStore } from "../../stores/RootStore";
import {Title} from "../../utils/components/Title";
import {CircularLoading} from "../../utils/components/CircularLoading";
import Badge from "./components/Badge";
import { observer } from "mobx-react";

/**
 * Displaying user badges
 * @constructor
 */
const BadgesPage = () => {

    const { badgesStore } = useStore();

    // Get badges
    const badges = badgesStore.getBadges();

    // Loading
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

export default observer(BadgesPage);

const Page = styled.div`
  padding: 20px;
  color: ${props => props.theme.palette.secondary.dark}
`

const BadgeList = styled.div`
  display: flex;
  flex-flow: column;
  gap: 20px;
`

