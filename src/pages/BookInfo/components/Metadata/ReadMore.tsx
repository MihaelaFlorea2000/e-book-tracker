import React, {useState} from "react";
import styled from "@emotion/styled";
import DOMPurify from "dompurify";

interface Props {
    text: string
}

/**
 * Component for displaying part of a long text
 * and a Read More button
 * @param props
 * @constructor
 */
const ReadMore = (props:Props) => {

    const [isReadMore, setIsReadMore] = useState<boolean>(true);

    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };

    return (
        <Container>
            <Description dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(isReadMore ? props.text.slice(0, 300) : props.text)}} />
            <ReadMoreLink onClick={toggleReadMore} className="read-or-hide">
                {isReadMore ? "...more" : " less"}
            </ReadMoreLink>
        </Container>
    )
}

export default ReadMore;

const Container = styled.div`
`

const Description = styled.div`
`

const ReadMoreLink = styled.span`
  color: ${props => props.theme.palette.primary.main};
  text-decoration: underline;
  cursor: pointer;
`