import styled from "@emotion/styled";
import React from "react";
import {MetadataInterface} from "../../../config/interfaces";
import TextField from "@mui/material/TextField";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import { border } from "../../../utils/style/themeConfig";
import Rating from "@mui/material/Rating";
import TagsInput from "./TagsInput";

interface Props {
    metadata: MetadataInterface | undefined;
}

interface FormState {
    title: string
}

// const book = {
//     ✅title: title,
//     ✅authors: authors === undefined ? [] : authors,
//     ✅description: description,
//     ✅coverImage: coverImage === undefined ? COVER_IMAGE : coverImage,
//     ✅tags: tags === undefined ? [] : tags,
//     ✅publisher: publisher,
//     ✅pubDate: pubDate,
//     ✅language: language,
//     ✅rating: rating === undefined ? 0 : rating,
//     ✅file: file,
//     ✅fileName: fileName,
//     ✅series: series
// };

const MetadataForm = (props: Props) => {

    // const user = UserStore.getCurrentUser();
    //
    // if (user === undefined) {
    //     return(
    //         <p>Loading</p>
    //     )
    // }

    return (
        <FormContainer key={props.metadata?.title}>
            <ImageContainer>
                <Image image={props.metadata?.coverImage}/>
            </ImageContainer>
            <FieldsContainer>
                <TextField
                    id="title"
                    label="Title"
                    variant="outlined"
                    type="text"
                    defaultValue={props.metadata?.title}
                />
                <TagsInput id="authors" label="Authors" placeholder="Add Author" list={props.metadata?.authors}/>
                <TextField
                    id="series"
                    label="Series"
                    variant="outlined"
                    type="text"
                    defaultValue={props.metadata?.series}
                />
                <TextField
                    id="description"
                    label="Description"
                    variant="outlined"
                    type="text"
                    multiline
                    rows={5}
                    defaultValue={props.metadata?.description}
                />
                <PublicationDetails>
                    <TextField
                        id="publisher"
                        label="Publisher"
                        variant="outlined"
                        fullWidth
                        type="text"
                        defaultValue={props.metadata?.publisher}
                    />
                    <TextField
                        id="pubDate"
                        variant="outlined"
                        fullWidth
                        type="date"
                        defaultValue={props.metadata?.pubDate}
                    />
                    <TextField
                        id="language"
                        label="Language"
                        variant="outlined"
                        type="text"
                        defaultValue={props.metadata?.language}
                    />
                </PublicationDetails>
                <TagsInput id="tags" label="Tags" placeholder="Add Tag" list={props.metadata?.tags}/>
                <RatingContainer>
                    <RatingText>Rating</RatingText>
                    <Rating name="no-value" value={null} />
                </RatingContainer>
            </FieldsContainer>
        </FormContainer>
    )
}

export default MetadataForm;

const FormContainer = styled.form`
  display: flex;
  gap: 20px;
  margin-top: 25px;
`

const ImageContainer = styled.div`
  background-color: white;
  border-radius: ${border.borderRadius};
  width: 300px;
  height: 375px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Image = styled.div<{image: string | undefined}>`
  background-image: url(${props => props.image});
  background-size: cover;
  width: 90%;
  height: 90%;
`

const FieldsContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-flow: column;
  width: 100%;
`

const PublicationDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(2, calc(35% - 10px)) 30%;
  grid-column-gap: 10px;
`

const RatingContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 5px;
`

const RatingText = styled.div`
`


