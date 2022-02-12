import styled from "@emotion/styled";
import React, {useState} from "react";
import DOMPurify from "dompurify";
import { theme } from "../../../utils/style/themeConfig";

interface Props {
    text: string
}

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
  color: ${theme.palette.primary.main};
  text-decoration: underline;
  cursor: pointer;
  
`