import styled from "@emotion/styled";
import React, {useState} from "react";
import {ReactReader} from "react-reader";
import {Rendition} from "epubjs";
import {BookInterface} from "../../../config/interfaces";

interface Props {
    book: BookInterface;
}
const BookReader = (props: Props) => {

    const [location, setLocation] = useState<string | number>("epubcfi(/6/6[titlepage]!/4/2/12[pgepubid00003]/3:0)")
    const locationChanged = (epubcifi:string | number ) => {
        setLocation(epubcifi);
        console.log(epubcifi);
    }

    const getRendition = (rendition:Rendition) => {
        const spine_get = rendition.book.spine.get.bind(rendition.book.spine);
        rendition.book.spine.get = function(target) {
            let t = spine_get(target);
            console.log(t);
            // while ((t == null) && target.startsWith("../")) {
            //     target = target.substring(3);
            //     t = spine_get(target);
            // }
            return t;
        }
    }

    return (
        <Container>
            <ReactReader
                url={props.book.file}
                title={props.book.title}
                location={location}
                locationChanged={locationChanged}
                getRendition={getRendition}
            />
        </Container>

    )
}

export default BookReader;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
`