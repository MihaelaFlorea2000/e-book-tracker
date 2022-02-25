import React, {ReactNode} from "react";
import styled from "@emotion/styled";
import {CircularLoading} from "../../../utils/components/CircularLoading";
import {useStore} from "../../../stores/RootStore";
import {useParams} from "react-router-dom";
import Read from "./Read";
import {observer} from "mobx-react";
import {
    faBook
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { theme } from "../../../utils/style/themeConfig";

const ReadInfo = () => {

    const { bookStore } = useStore();

    // Get reads
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
                <Read key={index} read={read} />
            )
        } else {
            currentReadNode = <Read current key={index} read={read} />
        }

    })

    const timesRead = readNodes.length;

    return (
        <Container>
            {currentReadNode}
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
  color: ${theme.palette.primary.main}
`
const BookIconContainer = styled.span`
    margin-right: 10px;
`

const ReadNodesContainer = styled.span`
  display: flex;
  flex-flow: column;
  gap: 10px;
`
