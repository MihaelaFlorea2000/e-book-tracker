import React, {ReactNode} from "react";
import styled from "@emotion/styled";
import {BookReadInterface} from "../../../config/interfaces";
import {BookRating} from "../../../utils/components/BookRating";
import {border, theme } from "../../../utils/style/themeConfig";
import {faBookReader, faStopwatch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface Props {
    read: BookReadInterface;
    current?: boolean
}

const Read = (props: Props) => {

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

    return (
        <Container>
            <DateContainer>
                {startDate} - {endDate}
            </DateContainer>
            {!props.current &&
                <>
                    <MetricsContainer>
                        {time}
                        {sessions}
                    </MetricsContainer>
                    <RatingContainer>
                        {props.read.rating && <BookRating value={props.read.rating} size="small" readOnly={true} />}
                    </RatingContainer>
                    <NotesContainer>
                        {props.read.notes &&
                            <Notes>
                                This was a strange and magical project from start to finish, and a lot of people helped me get it right.

                                First, I have to thank my agent, Joanna Volpe, for figuring out how this book could work; my editor, Alvina Ling, for getting on board with such a weird project; and our art director, Karina Granda, for shepherding it through the many steps to getting it in front of you. Thanks to Ruqayyah Daud and Jordan Hill for managing so many details and also managing me.

                                Thank you to Siena Koncsol and everyone in Marketing and Publicity at Little, Brown Books for Young Readers, who have always been a joy to work with.

                                Thanks to Emma Matthewson and everyone at Hot Key Books for being enthusiastic about this series from the beginning.

                                Thank you to Rovina Cai for being willing to do this in the first place and then for putting up with me constantly asking for more Cardan extravagance.

                                Thank you to my critique partners for all your help. Thank you to Kelly Link for reading seventy thousand versions of this, to Cassandra Clare and Joshua Lewis and Steve Berman for convening a workshop with what was no doubt annoying swiftness, to Sarah Rees Brennan for helping me figure out what might happen in the first place and then helping me figure it out again when I went in a totally new direction, and to Leigh Bardugo for coming in and reminding me what a plot is and what I could do to suggest there was one.

                                And thank you to Jessica Cooper for letting me know what the people would like.

                                And, as always, thanks to Theo and Sebastian, for being both inspiration and distraction.


                                {/*{props.read.notes}*/}
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

