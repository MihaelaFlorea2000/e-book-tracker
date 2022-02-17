import styled from "@emotion/styled";
import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {IconButton} from "@mui/material";
import {theme} from "../style/themeConfig";

interface Props {
    icon: IconProp,
    direction: "bottom" | "left" | "right" | "top" | undefined,
    menu: JSX.Element,
    buttonSize: "large" | "medium" | "small",
    fontSize: string
}

export const SideMenu = (props: Props) => {

    const [menuOpen, setMenuOpen] = useState<boolean>(false);

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

    return (
        <HamburgerContainer>
            <StyledIconButton
                onClick={toggleDrawer()}
                size={props.buttonSize}
                color="inherit"
                aria-label="menu"
            >
                <IconContainer fontSize={props.fontSize}><FontAwesomeIcon icon={props.icon}/></IconContainer>
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

const IconContainer = styled.div<{fontSize:string}>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.palette.primary.main};
  transition: color 0.5s;
  font-size: ${props => props.fontSize};
  
  :hover {
    color: ${theme.palette.secondary.main};
  }
`

const StyledIconButton = styled(IconButton)`
  :hover {
    background-color: inherit;
  }
`


const HamburgerContainer = styled.div`
`
