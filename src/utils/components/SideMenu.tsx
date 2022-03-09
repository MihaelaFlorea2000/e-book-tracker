import React, { useState } from "react";
import styled from "@emotion/styled";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface Props {
    icon: IconProp,
    direction: "bottom" | "left" | "right" | "top" | undefined,
    menu: JSX.Element,
    buttonSize: "large" | "medium" | "small",
    color: string
    fontSize: string
}

export const SideMenu = (props: Props) => {

    // Is menu open?
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    // Open/Close menu
    const toggleDrawer = () =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event &&
                event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' ||
                    (event as React.KeyboardEvent).key === 'Shift')
            ) {
                return;
            }

            setMenuOpen(!menuOpen);
        };


    console.log(props.color)

    return (
        <HamburgerContainer>
            <StyledIconButton
                onClick={toggleDrawer()}
                size={props.buttonSize}
                color="inherit"
                aria-label="menu"
            >
                <IconContainer color={props.color} fontSize={props.fontSize}><FontAwesomeIcon icon={props.icon}/></IconContainer>
            </StyledIconButton>
            <SwipeableDrawer
                anchor={props.direction}
                open={menuOpen}
                onClose={toggleDrawer()}
                onOpen={toggleDrawer()}
            >
                {props.menu}
            </SwipeableDrawer>
        </HamburgerContainer>
    )
}

export default SideMenu;

const IconContainer = styled.div<{fontSize:string, color:string}>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.color};
  transition: color 0.5s;
  font-size: ${props => props.fontSize};
  
  :hover {
    color: ${props => props.theme.palette.secondary.main};
  }
`

const StyledIconButton = styled(IconButton)`
  :hover {
    background-color: inherit;
  }
`

const HamburgerContainer = styled.div`
`
