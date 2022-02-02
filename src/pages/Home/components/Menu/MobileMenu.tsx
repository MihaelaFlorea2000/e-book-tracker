import styled from "@emotion/styled";
import React, {useState} from "react";
import IconButton from "@mui/material/IconButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import MenuBar from "./MenuBar";

const MobileMenu = () => {

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
            <IconButton
                onClick={toggleDrawer()}
                size="large"
                color="inherit"
                aria-label="menu"
            >
                <IconContainer><FontAwesomeIcon icon={faBars}/></IconContainer>
            </IconButton>
            <SwipeableDrawer
                anchor={"left"}
                open={menuOpen}
                onClose={toggleDrawer()}
                onOpen={toggleDrawer()}
            >
                <MenuBar />
            </SwipeableDrawer>
        </HamburgerContainer>
    )
}

export default MobileMenu;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const HamburgerContainer = styled.div`
`
