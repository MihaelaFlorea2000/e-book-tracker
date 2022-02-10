import styled from "@emotion/styled";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import {useParams} from "react-router-dom";
import BookStore from "../../stores/BookStore";
import {CircularLoading} from "../../utils/components/Components";

const BookInfoPage = () => {

    const params = useParams();
    const bookId = Number(params.bookId);

    const book = BookStore.getBook(bookId);

    if (book === undefined) {
        return (
            <Page>
                <CircularLoading />
            </Page>
        )
    }

    return (
        <Page>
            {book.title}
        </Page>
    )
}

export default observer(BookInfoPage);

const Page = styled.div`
`
