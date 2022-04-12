import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";

interface Props {
    loadingCondition: boolean
    icon: IconProp
    name: string
    [x: string]: any
}

/**
 * Any Button with an icon in front
 * @param props
 * @constructor
 */
const IconButton = (props: Props) => {

    const {loadingCondition, icon, name, ...otherProps} = props

    return (
        <>
            {loadingCondition
                ? <LoadingButton loading variant="outlined" size="large" >Submit</LoadingButton>
                : <Button
                    type="button"
                    variant="contained"
                    size="small"
                    {...otherProps}
                    startIcon={<FontAwesomeIcon className="fa-fw" icon={icon}/>}
                >
                    {name}
                </Button>
            }
        </>
    )
}

export default IconButton;