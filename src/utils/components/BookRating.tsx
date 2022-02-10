import styled from "@emotion/styled";
import React from "react";
import Rating from "@mui/material/Rating";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {faStar as faStarOutline} from "@fortawesome/free-regular-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface Props {
    value: number,
    size: "small" | "medium" | "large" | undefined
    readOnly: boolean
    [x: string]: any
}

export const BookRating = (props: Props) => {
    const faEmptyStar = faStarOutline as IconProp;

    const {value, size, readOnly, ...otherProps} = props

    return (
        <StyledRating
            name="rating"
            value={props.value}
            readOnly={props.readOnly}
            size={props.size}
            precision={0.5}
            emptyIcon={<FontAwesomeIcon icon={faEmptyStar} />}
            icon={<FontAwesomeIcon className="fa-fw" icon={faStar}/>}
            {...otherProps}
        />
    );
}

const StyledRating = styled(Rating)`
  display: flex;
  gap: 5px;
`


