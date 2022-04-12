import React from "react";
import { observer } from "mobx-react";
import styled from "@emotion/styled";
import { device } from "../../../utils/helpers/constants";
import { useForm } from "react-hook-form";
import InputAdornment from "@mui/material/InputAdornment";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {StyledTextField} from "../../../utils/style/styledComponents";
import {useStore} from "../../../stores/RootStore";
import Alert from "@mui/material/Alert";
import {ErrorMessage} from "@hookform/error-message";
import SearchList from "./SearchList";

interface SearchInterface {
    query: string,
    errorMessage: string
}

/**
 * Menu for searching within a book
 * @constructor
 */
const SearchMenu = () => {

    const { readerStore } = useStore();

    const { register, handleSubmit, formState: {errors}, setError, clearErrors, reset } = useForm<SearchInterface>({
        mode: "onChange"
    });

    const onSubmit = async(data: SearchInterface) => {
        clearErrors()
        try {
            const res:any = await doSearch(data.query);
            readerStore.setSearchResults(res);
            console.log(res)
        } catch (err:any) {
            console.log(err);
            setError('errorMessage', {
                type: 'manual',
                message: err.response.data.message
            });
        }
        reset();
    }

    const doSearch = (q:string) => {
        const rendition = readerStore.getRendition();

        if (rendition !== undefined) {
            const book = rendition.book;

            return Promise.all(
                //@ts-ignore
                book.spine.spineItems.map(item => item.load(book.load.bind(book)).then(item.find.bind(item, q)).finally(item.unload.bind(item)))
            ).then(results => Promise.resolve([].concat.apply([], results)));
        }
    }

    return (
        <Container>
            <Title>Search</Title>
            <SearchForm onSubmit={handleSubmit(onSubmit)}>
                <StyledTextField
                    id="search"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconContainer><FontAwesomeIcon icon={faSearch}/></IconContainer>
                            </InputAdornment>
                        ),
                    }}
                    variant="outlined"
                    placeholder="Search"
                    fullWidth={true}
                    {...register('query')}
                />
                <ErrorMessage errors={errors} name="errorMessage" render={({ message }) =>
                    <Alert severity="error">{message}</Alert>
                } />
            </SearchForm>
            <SearchList />
        </Container>
    )
};

export default observer(SearchMenu);

const Container = styled.div`
  width: 60vw;
  padding: 20px;
  display: flex;
  flex-flow: column;
  gap: 30px;
  
  @media only screen and ${device.mobileL} {
    width: 80vw;
    font-size: 0.9rem;
  }
`

const Title = styled.h2`
  margin: 0;
  padding: 0;
`

const SearchForm = styled.form`
  
`

const IconContainer = styled.div`
  color: ${props => props.theme.palette.info.main};
  > .Mui-focused{
    color: black;
  }
`
