import React, { ChangeEvent, useEffect, useState } from "react";
import styled from "@emotion/styled";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import { border } from "../style/themeConfig";

interface Props {
    id: string,
    placeholder: string,
    list: string[],
    getTags: any
}

/**
 * Form input for adding and editing book tags and authors
 * Code adapted from:
 * https://codesandbox.io/s/material-ui-input-with-chips-0s2j4?from-embed=&file=/src/TagsInput.js:229-263
 * @param props
 * @constructor
 */
const TagsInput = (props:Props) => {

    // Tags and input state
    const [tags, setTags] = useState<string[]>(props.list);
    const [inputValue, setInputValue] = useState<string>("");

    // Delete tag
    const handleDelete = (tag:string) => () => {
        const newTags = [...tags];
        newTags.splice(newTags.indexOf(tag), 1);
        setTags(newTags);
        props.getTags(newTags);
    };

    // Load tags
    useEffect(() => {
        props.getTags(tags);
    }, []);

    // Add new tag
    const addTag = () => {
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
        props.getTags(newTags);
    }

    // Add tag on enter
    const handleKeyDown = (event:React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (event.key === "Enter") {
            addTag();
        }
        if (tags.length && !inputValue.length && event.key === "Backspace") {
            let newTags =  tags.slice(0, tags.length - 1);
            setTags(newTags);
            props.getTags(newTags);
        }
    }

    // Update input as the user types
    const handleInputChange = (event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if(event !== null) {
            setInputValue(event.target.value);
        }
    }

    return (
        <Container>
            <InputContainer>
                {tags.map(tag => (
                    <Chip
                        key={tag}
                        tabIndex={-1}
                        label={tag}
                        onDelete={handleDelete(tag)}
                    />
                ))}
                <StyledInput
                    id={props.id}
                    type="text"
                    value={inputValue}
                    placeholder={props.placeholder}
                    onChange={(event => {
                        handleInputChange(event);
                    })}
                    onKeyDown={(event => {
                        handleKeyDown(event);
                    })}
                />
            </InputContainer>
            <Button type="button" variant="contained" onClick={() => addTag()}>Add</Button>
        </Container>
    )
}

export default TagsInput;

const Container = styled.div`
  display: flex;
  gap: 5px;
`
const InputContainer = styled.div`
  background-color: ${props => props.theme.palette.info.light};
  border: 1.2px solid #cbcbcb;
  margin: 0.8px;
  border-radius: ${border.borderRadius};
  padding: 16.5px 14px;
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 3px;
  box-sizing: content-box;
  -moz-box-sizing: content-box;
  -webkit-box-sizing: content-box;

  :hover {
    border: 1.2px solid ${props => props.theme.palette.primary.main};
  }
  
  :focus-within {
    border: 2px solid ${props => props.theme.palette.primary.main};
    margin: 0;
  }
`

const StyledInput = styled.input`
  border: 0 solid black;
  margin: 3px;
  font-size: 0.95rem;
  background-color: ${props => props.theme.palette.info.light};
  color: ${props => props.theme.palette.secondary.dark};

  :focus-visible {
    outline: none;
  }

  ::placeholder {
    color: #a2a2a2;
    opacity: 1; 
  }
`
