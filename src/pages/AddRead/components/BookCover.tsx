import React from "react";
import {useStore} from "../../../stores/RootStore";
import {useParams} from "react-router-dom";
import {CircularLoading} from "../../../utils/components/CircularLoading";
// @ts-ignore
import defaultCoverImage from "../../../utils/images/defaultCoverImage.jpeg";
import { observer } from "mobx-react";
import { CoverContainer, CoverTitle, Image } from "../../../utils/style/styledComponents";

const BookCover = () => {

    // Get stores
    const { bookStore } = useStore();

    // Get book and read
    const params = useParams();
    const bookId = Number(params.bookId);

    const book = bookStore.getBook(bookId);

    if (book === undefined || book.id === undefined) {
        return (
            <CoverContainer>
                <CircularLoading />
            </CoverContainer>
        )
    }

    // Handle books with no cover image
    const coverImage = book.coverImage !== null ? book.coverImage : defaultCoverImage;
    const showTitle = book.coverImage === null;

    return (
        <CoverContainer>
            <Image image={coverImage}/>
            {showTitle && <CoverTitle>{book.title}</CoverTitle>}
        </CoverContainer>
    )
}

export default observer(BookCover);


