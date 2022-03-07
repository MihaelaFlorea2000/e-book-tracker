import React, {ReactNode} from "react";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react";
import styled from "@emotion/styled";
import {border, theme } from "../../../../utils/style/themeConfig";
import {
    faBookReader,
    faFlagCheckered,
    faEdit,
    faTimes
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ReadInterface} from "../../../../config/interfaces";
import {BookRating} from "../../../../utils/components/BookRating";
import {DeleteIconContainer, EditIconContainer } from "../../../../utils/style/styledComponents";
import axiosConfig from "../../../../config/axiosConfig";
import {useStore} from "../../../../stores/RootStore";
import {TimeString} from "../../../../utils/components/TimeString";
import formatDateLong from "../../../../config/formatDateLong";


interface Props {
    read: ReadInterface,
    bookId: number,
    current: boolean
}

const Read = (props: Props) => {

    const navigate = useNavigate();

    // Get stores
    const { bookStore, editReadStore, metricsStore } = useStore();

    // Construct start and end date
    const startDate = formatDateLong(props.read.startDate);
    const endDate = props.read.endDate ? formatDateLong(props.read.endDate) : 'ongoing';

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
            const res = await axiosConfig().delete(`/pg/reads/${props.bookId}/${props.read.id}`)
            console.log(res);
            bookStore.requestReads(props.bookId);
            metricsStore.trackRefresh();
        } catch (err) {
            console.log(err);
        }
        console.log(props.read.id)
    }

    const handleEdit = () => {
        editReadStore.setErrorMessage('');
        editReadStore.setCurrentRead(props.read);
        navigate(`/book/${props.bookId}/read/${props.read.id}/edit`);
    }

    const handleFinish = () => {
        editReadStore.setErrorMessage('');
        editReadStore.setIsFinished(true);
        editReadStore.setCurrentRead(props.read);
        navigate(`/book/${props.bookId}/read/${props.read.id}/edit`);
    }

    return (
        <Container>
            <ChangeIconsContainer>
                {props.current
                    ?
                    <EditIconContainer onClick={handleFinish}>
                        <FontAwesomeIcon className="fa-fw" icon={faFlagCheckered}/>
                    </EditIconContainer>
                    :
                    <EditIconContainer onClick={handleEdit}>
                        <FontAwesomeIcon className="fa-fw" icon={faEdit}/>
                    </EditIconContainer>
                }
                <DeleteIconContainer onClick={handleDelete}>
                    <FontAwesomeIcon icon={faTimes}/>
                </DeleteIconContainer>
            </ChangeIconsContainer>
            <DateContainer>
                {startDate} - {endDate}
            </DateContainer>
            <MetricsContainer>
                <TimeString time={props.read.time} />
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

export default observer(Read);

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

