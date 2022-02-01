import styled from "@emotion/styled";
import React from "react";
import {theme} from "../utils/style/styleConfig";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faCompass, faUserFriends, faCog, faChartBar, faBook} from '@fortawesome/free-solid-svg-icons'
import { NavLink } from "react-router-dom";


const Menu = () => {

    return (
        <MenuContainer>
            <LogoContainer>
                <FontAwesomeIcon icon={faBook}/>
            </LogoContainer>
            <MenuLinkContainer>
                <MenuLink>
                    <NavLink to={"/"}>
                        <MenuLinkContent>
                            <IconContainer><FontAwesomeIcon className="fa-fw" icon={faHome}/></IconContainer>
                            <MenuText>Home</MenuText>
                        </MenuLinkContent>
                    </NavLink>
                </MenuLink>
                <MenuLink>
                    <NavLink to={"/track"}>
                        <MenuLinkContent>
                            <IconContainer><FontAwesomeIcon className="fa-fw" icon={faChartBar}/></IconContainer>
                            <MenuText>Track</MenuText>
                        </MenuLinkContent>
                    </NavLink>
                </MenuLink>
                <MenuLink>
                    <NavLink to={"/explore"}>
                        <MenuLinkContent>
                            <IconContainer><FontAwesomeIcon className="fa-fw" icon={faCompass}/></IconContainer>
                            <MenuText>Explore</MenuText>
                        </MenuLinkContent>
                    </NavLink>
                </MenuLink>
                <MenuLink>
                    <NavLink to={"/friends"}>
                        <MenuLinkContent>
                            <IconContainer><FontAwesomeIcon className="fa-fw" icon={faUserFriends}/></IconContainer>
                            <MenuText>Friends</MenuText>
                        </MenuLinkContent>
                    </NavLink>
                </MenuLink>
                <MenuLink>
                    <NavLink to={"/settings"}>
                        <MenuLinkContent>
                            <IconContainer><FontAwesomeIcon className="fa-fw" icon={faCog}/></IconContainer>
                            <MenuText>Settings</MenuText>
                        </MenuLinkContent>
                    </NavLink>
                </MenuLink>
            </MenuLinkContainer>
        </MenuContainer>
    )
}

export default Menu;

const MenuContainer = styled.div`
  position: fixed;
  height: 100vh;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding-bottom: 20px;
  width: 160px;
  border-right: 1px solid ${theme.palette.primary.light};
`
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: ${theme.palette.primary.main};
  padding: 30px;
  border-bottom: 1px solid ${theme.palette.primary.light};
`

const MenuLinkContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  gap: 10px;
  font-size: 0.9rem;
  justify-content: flex-start;
  height: 100vh;
  background-color: ${theme.palette.info.light};
  padding: 20px;
`

const MenuLink = styled.div`
  display: flex;
  align-items: center;
`

const MenuLinkContent = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${theme.palette.info.main};
  transition: color 0.5s, background 0.5s;
  border-radius: 10px;
  padding: 10px;
  width: 115px;
  :hover {
    color: ${theme.palette.primary.main};
    background-color: ${theme.palette.primary.light};
  }
`

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const MenuText = styled.div`
    //display: none;
`