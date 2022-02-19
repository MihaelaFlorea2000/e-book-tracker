import styled from "@emotion/styled";
import React from "react";
import {faBars, faBell } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {border, theme } from "../../../utils/style/themeConfig";
import { observer } from "mobx-react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { NavLink } from "react-router-dom";
import { device } from "../../../config/config";
import {CircularLoading} from "../../../utils/components/CircularLoading";
import SideMenu from "../../../utils/components/SideMenu";
import MenuBar from "./Menu/MenuBar";
import LoginStore from "../../../stores/LoginStore";
import { useStore } from "../../../stores/RootStore";
import { SearchBar } from "../../../utils/components/SearchBar";

const Header = () => {

    const { userStore } = useStore();

    let user = userStore.getCurrentUser();

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogOut = () => {
        LoginStore.logout();
        handleCloseUserMenu();
    };


    if (user === undefined) {
        return (
            <CircularLoading />
        )
    }

    return (
        <Container>
            <HamburgerContainer>
                <SideMenu fontSize="1.7rem" direction="left" icon={faBars} buttonSize="large" menu={<MenuBar />}/>
            </HamburgerContainer>
            <SearchBar />
            <TopRightContainer>
                <NotificationContainer><FontAwesomeIcon icon={faBell}/></NotificationContainer>
                <Box sx={{ flexGrow: 0 }}>
                    <ProfileImage onClick={handleOpenUserMenu} image={user.profileImage}/>
                    <StyledMenu
                        sx={{ mt: '60px' }}
                        id="user-menu"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        <UserName>{user.firstName} {user.lastName}</UserName>
                        <MenuItem onClick={handleCloseUserMenu}>
                            <NavLink to={"/profile"}><SettingText>Profile</SettingText></NavLink>
                        </MenuItem>
                        <MenuItem onClick={handleCloseUserMenu}>
                            <NavLink to={"/settings"}><SettingText>Account Settings</SettingText></NavLink>
                        </MenuItem>
                        <MenuItem onClick={handleLogOut}>
                            <NavLink to={"/"}><SettingText>Logout</SettingText></NavLink>
                        </MenuItem>
                    </StyledMenu>
                </Box>
            </TopRightContainer>
        </Container>
    )
}

export default observer(Header);

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  
  @media only screen and ${device.tablet} {
    padding: 15px 10px;
  }
`

const TopRightContainer = styled.div`
  display: flex;
  gap: 30px;
`

const NotificationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.palette.info.main};
  background-color: white;
  padding: 15px;
  font-size: 1.5rem;
  border-radius: ${border.borderRadius};
  transition: color 0.5s;
  cursor: pointer;
  
  :hover {
    color: ${theme.palette.primary.main};
  }
`
const ProfileImage = styled.div<{image:string}>`
  width: 55px;
  height: 55px;
  border-radius: 100%;
  background-image: url(${props => props.image});
  background-size: cover;
  cursor: pointer;
`

const SettingText = styled.div`

`

const StyledMenu = styled(Menu)`
  padding: 0;
  > div {
    border-radius: ${border.borderRadius};
  }
`

const UserName = styled.h4`
  padding: 15px 16px;
  font-size: 1.1rem;
  margin: 0;
  border-bottom: ${border.border};
`
const HamburgerContainer = styled.div`
  display: none;
  
  @media only screen and ${device.tablet} {
    display: flex;
  }
`
