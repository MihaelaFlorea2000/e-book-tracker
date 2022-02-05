import styled from "@emotion/styled";
import React, {ChangeEvent, useState} from "react";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";

interface Props {
    id: string,
    label: string,
    placeholder: string,
    list: string[] | undefined
}

const TagsInput = (props:Props) => {

    const [tags, setTags] = useState<string[]>(props.list !== undefined ? props.list : []);
    const [inputValue, setInputValue] = useState<string>("");

    const handleDelete = (tag:string) => () => {
        const newTags = [...tags];
        newTags.splice(newTags.indexOf(tag), 1);
        setTags(newTags);
    };

    function addTag() {
        let newTags = [...tags];
        const duplicatedValues = newTags.indexOf(
            inputValue.trim()
        );

        if (duplicatedValues !== -1) {
            setInputValue("");
            return;
        }
        if (!inputValue.replace(/\s/g, "").length) return;

        newTags.push(inputValue.trim());
        setInputValue("");
        setTags(newTags);
    }

    function handleKeyDown(event:any) {
        if (event.key === "Enter") {
            addTag();
        }
        if (tags.length && !inputValue.length && event.key === "Backspace") {
            setTags(tags.slice(0, tags.length - 1));
        }
    }

    function handleInputChange(event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        if(event !== null) {
            setInputValue(event.target.value);
        }
    }

    return (
        <InputContainer>
            <TextField
                id={props.id}
                label={props.label}
                variant="outlined"
                type="text"
                value={inputValue}
                placeholder={props.placeholder}
                InputProps={{
                    startAdornment:
                        <TagsContainer>
                            {tags.map(tag => (
                                    <Chip
                                        key={tag}
                                        tabIndex={-1}
                                        label={tag}
                                        onDelete={handleDelete(tag)}
                                    />
                                ))}
                        </TagsContainer>,
                    onChange: event => {
                        handleInputChange(event);
                    },
                    onKeyDown: event => {
                        handleKeyDown(event);
                    }
                }}
            />
            <Button type="button" variant="contained" onClick={() => addTag()}>Add</Button>
        </InputContainer>
    )
}

export default TagsInput;

const InputContainer = styled.div`
`
const TagsContainer = styled.div`
  display: flex;
  gap: 2px;
`

