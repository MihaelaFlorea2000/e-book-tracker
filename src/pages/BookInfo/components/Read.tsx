import React, {ReactNode} from "react";
import styled from "@emotion/styled";
import {BookReadInterface} from "../../../config/interfaces";
import {BookRating} from "../../../utils/components/BookRating";
import {border, theme } from "../../../utils/style/themeConfig";
import {faBookReader, faEdit, faStopwatch, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {DeleteIconContainer, EditIconContainer } from "../../../utils/style/styledComponents";
import axiosConfig from "../../../config/axiosConfig";
import {useStore} from "../../../stores/RootStore";

interface Props {
    read: BookReadInterface,
    bookId: number,
    current?: boolean
}

const Read = (props: Props) => {

    const { bookStore } = useStore();

    const options:Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }

    // Construct start and end date
    const startDate = new Date(props.read.startDate).toLocaleDateString('en-UK', options);
    const endDate = props.read.endDate ? new Date(props.read.endDate).toLocaleDateString('en-UK', options) : 'ongoing';

    // Construct time
    let time: ReactNode;

    if (props.read.time) {
        const years = props.read.time.years ? `${props.read.time.years} years, ` : '';
        const months = props.read.time.months ? `${props.read.time.months} months, ` : '';
        const days = props.read.time.days ? `${props.read.time.days} days, ` : '';
        const hours = props.read.time.hours ? `${props.read.time.hours} h, ` : '';
        const minutes = props.read.time.minutes ? `${props.read.time.minutes} min, ` : '';
        const seconds = props.read.time.seconds ? `${props.read.time.seconds} sec` : '';

        time = <TimeContainer>
                    <IconContainer>
                        <FontAwesomeIcon icon={faStopwatch}/>
                    </IconContainer>
                    {years}{months}{days}{hours}{minutes}{seconds}
                </TimeContainer>
    }

    // Construct sessions
    let sessions: ReactNode;

    if (props.read.sessions) {
        sessions = <TimeContainer>
                        <IconContainer>
                            <FontAwesomeIcon icon={faBookReader}/>
                        </IconContainer>
                        {props.read.sessions} sessions
                    </TimeContainer>
    }

    const handleDelete = async() => {
        try {
            const res = await axiosConfig().delete(`/pg/books/${props.bookId}/reads/${props.read.id}`)
            console.log(res);
            bookStore.requestReads(props.bookId);
        } catch (err) {
            console.log(err);
        }
        console.log(props.read.id)
    }

    const handleEdit = () => {
        console.log(props.read.id)
    }

    return (
        <Container>
            <ChangeIconsContainer>
                <EditIconContainer onClick={handleEdit}>
                    <FontAwesomeIcon icon={faEdit}/>
                </EditIconContainer>
                <DeleteIconContainer
                    onClick={handleDelete}
                >
                    <FontAwesomeIcon icon={faTimes}/>
                </DeleteIconContainer>
            </ChangeIconsContainer>
            <DateContainer>
                {startDate} - {endDate}
            </DateContainer>
            <MetricsContainer>
                {time}
                {sessions}
            </MetricsContainer>
            {!props.current &&
                <>
                    <RatingContainer>
                        {props.read.rating && <BookRating value={props.read.rating} size="small" readOnly={true} />}
                    </RatingContainer>
                    <NotesContainer>
                        {props.read.notes &&
                            <Notes>
                                {props.read.notes}
                            </Notes>
                        }
                    </NotesContainer>
                </>
            }
        </Container>
    )
}

export default Read;

const Container = styled.div`
  display: flex;
  flex-flow: column;
  gap: 15px;
  padding: 15px;
  background-color: white;
  border: 3px solid ${theme.palette.primary.light};
  border-radius: ${border.borderRadius};
`
const ChangeIconsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Notes = styled.div`
  max-height: 10vh;
  overflow-y: auto
`

const DateContainer = styled.div`
  font-size: 1.1rem;
`

const TimeContainer = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  color: ${theme.palette.info.main}
`

const MetricsContainer = styled.div`
  display: flex;
  gap: 15px;
  font-size: 0.95rem;
`

const IconContainer = styled.div`
`

const RatingContainer = styled.div`
`

const NotesContainer = styled.div`
`

