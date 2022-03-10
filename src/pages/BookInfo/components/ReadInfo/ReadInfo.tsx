import React, {ReactNode} from "react";
import {useNavigate, useParams} from "react-router-dom";
import styled from "@emotion/styled";
import {observer} from "mobx-react";
import {
    faBook,
    faBookOpen
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {BookInterface} from "../../../../config/interfaces";
import {CircularLoading} from "../../../../utils/components/CircularLoading";
import {AddButton} from "../../../../utils/components/AddButton";
import {useStore} from "../../../../stores/RootStore";
import Read from "./Read";

interface Props {
    book: BookInterface
}

const ReadInfo = (props: Props) => {

    const navigate = useNavigate();

    const { bookStore, addReadStore } = useStore();

    // Get books
    const params = useParams();
    const bookId = Number(params.bookId);

    const reads = bookStore.getReads(bookId);

    if (reads === undefined) {
        return (
            <Container>
                <CircularLoading />
            </Container>
        )
    }

    // Create read nodes
    let readNodes: ReactNode[] = [];
    let currentReadNode: ReactNode;

    reads.forEach((read, index) => {
        if (read.endDate) {
            readNodes.push(
                <Read current={false} key={index} read={read} bookId={bookId} />
            )
        } else {
            currentReadNode = <Read current={true} key={index} read={read} bookId={bookId} />
        }

    })

    const timesRead = readNodes.length;

    const handleAdd = () => {
        addReadStore.setErrorMessage('');
        navigate(`/book/${props.book.id}/read/add`);
    }

    return (
        <Container>
            {currentReadNode &&
                <>
                    <TimeRead>
                        <BookIconContainer>
                            <FontAwesomeIcon icon={faBookOpen}/>
                        </BookIconContainer>
                        Currently Reading
                    </TimeRead>
                    {currentReadNode}
                </>
            }
            <ReadHeaderContainer>
                {timesRead > 0
                    ?
                    <TimeRead>
                        <BookIconContainer>
                            <FontAwesomeIcon icon={faBook}/>
                        </BookIconContainer>
                        Read {readNodes.length} times
                    </TimeRead>
                    :
                    <TimeRead>Book not read yet</TimeRead>
                }
                {bookStore.isOwner() &&
                    <AddButton size="medium" onClick={handleAdd}/>
                }
            </ReadHeaderContainer>
            <ReadNodesContainer>
                {readNodes}
            </ReadNodesContainer>
        </Container>
    )
}

export default observer(ReadInfo);

const Container = styled.div`
`
const TimeRead = styled.h3`
  padding: 0 10px;
  color: ${props => props.theme.palette.primary.main}
`
const BookIconContainer = styled.span`
    margin-right: 10px;
`

const ReadHeaderContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ReadNodesContainer = styled.span`
  display: flex;
  flex-flow: column;
  gap: 10px;
`
