import React from "react";
import { observer } from "mobx-react";
import styled from "@emotion/styled";
import {border} from "../../../utils/style/themeConfig";
import {BadgeInterface} from "../../../config/interfaces";

/**
 * Icons created on Flaticon by Freepik
 * https://www.flaticon.com/free-icons/book
 * https://www.flaticon.com/free-icons/highlighter
 * https://www.flaticon.com/free-icons/calendar
 */
// @ts-ignore
import books from "../../../utils/images/books.png";
// @ts-ignore
import booksDone from "../../../utils/images/books_done.png";
// @ts-ignore
import highlights from "../../../utils/images/highlights.png";
// @ts-ignore
import highlightsDone from "../../../utils/images/highlights_done.png";
// @ts-ignore
import days from "../../../utils/images/days.png";
// @ts-ignore
import daysDone from "../../../utils/images/days_done.png";
import {ProfileImage} from "../../../utils/components/ProfileImage";
import { BadgeImage } from "./BadgeImage";

interface Props {
    badge: BadgeInterface;
}
const Badge = (props: Props) => {

    let text;
    let subtext;
    let image;

    switch (props.badge.type) {
        case 'books':
            text = <Text>Finish <Bold>{props.badge.number}</Bold> books</Text>
            subtext = <SmallText>Use the app to read and finish {props.badge.number} books</SmallText>
            image = props.badge.done ? booksDone : books
            break;
        case 'highlights':
            text = <Text>Add <Bold>{props.badge.number}</Bold> highlights</Text>
            subtext = <SmallText>While reading select the text you want to highlight and press the highlight button</SmallText>
            image = props.badge.done ? highlightsDone : highlights
            break;
        case 'days':
            text = <Text>Read for <Bold>{props.badge.number}</Bold> days in a row</Text>
            subtext = <SmallText>Read every day for {props.badge.number} days to earn this badge</SmallText>
            image = props.badge.done ? daysDone : days
            break;
    }

    return (
        <Container>
            <BadgeImage done={props.badge.done} image={image} />
            <TextContainer>
                {text}
                {subtext}
            </TextContainer>
        </Container>
    )
};

export default observer(Badge);

const Container = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  border-radius: ${border.borderRadius};
  background-color: ${props => props.theme.palette.info.light};
  box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
  padding: 10px;
  width: 100%;
  transition: box-shadow 0.5s;

  :hover {
    box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
  }
`

const TextContainer = styled.div`
  display: flex;
  flex-flow: column;
  gao: 10px;
`

const Text = styled.div`
  font-size: 1.1rem;
`

const SmallText = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.palette.info.main}
`

const Bold = styled.span`
  font-family: 'PoppinsSemiBold', sans-serif;
`