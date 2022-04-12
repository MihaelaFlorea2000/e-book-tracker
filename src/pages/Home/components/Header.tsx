import styled from "@emotion/styled";
import React, {useState} from "react";
import {faBars, faBell, faStickyNote} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {border } from "../../../utils/style/themeConfig";
import { observer } from "mobx-react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {NavLink, useNavigate} from "react-router-dom";
import { device } from "../../../utils/helpers/constants";
import {CircularLoading} from "../../../utils/components/CircularLoading";
import SideMenu from "../../../utils/components/SideMenu";
import MenuBar from "./Menu/MenuBar";
import LoginStore from "../../../stores/LoginStore";
import { useStore } from "../../../stores/RootStore";
import { SearchBar } from "../../../utils/components/SearchBar";
import {ProfileImage} from "../../../utils/components/ProfileImage";
import {useTheme} from "@mui/material";
import NotificationsMenu from "./Notifications/NotificationsMenu";

/**
 * Header of the app
 * @constructor
 */
const Header = () => {

    const navigate = useNavigate();
    const theme = useTheme();

    // Get stores
    const { userStore, searchStore, settingsStore } = useStore();

    // Get current user
    let user = userStore.getCurrentUser();

    // Search query
    const [query, setQuery] = useState<string>('');

    const handleSubmit = (event:React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (query && event.key === "Enter") {
            searchStore.requestSearch();
            searchStore.requestGoogleSearch();
            setQuery('');
            navigate('/search');
        }
    };

    // User menu
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogOut = () => {
        LoginStore.logout();
        settingsStore.setDarkTheme(false);
        handleCloseUserMenu();
    };

    // Loading
    if (user === undefined) {
        return (
            <CircularLoading />
        )
    }

    return (
        <Container>
            <HamburgerContainer>
                <SideMenu color={theme.palette.primary.main} fontSize="1.7rem" direction="left" icon={faBars} buttonSize="large" menu={<MenuBar />}/>
            </HamburgerContainer>
            <SearchBar
                value={query}
                onChange={(e:any) => {
                    setQuery(e.target.value);
                    searchStore.setQuery(e.target.value);
                }}
                onKeyDown={(e:any) => {
                    handleSubmit(e);
                }}
            />
            <TopRightContainer>
                <SideMenu buttonElement={<NotificationContainer><FontAwesomeIcon icon={faBell}/></NotificationContainer>} color={theme.palette.info.main} fontSize="1.6rem" buttonSize="medium" icon={faBell} direction="right" menu={<NotificationsMenu />} />
                <Box sx={{ flexGrow: 0 }}>
                    <ProfileImage size="small" onClick={handleOpenUserMenu} image={user.profileImage}/>
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
                            <NavLink to={`/profile/${user.id}`}><SettingText>Profile</SettingText></NavLink>
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
  color: ${props => props.theme.palette.info.main};
  background-color: ${props => props.theme.palette.info.light};
  padding: 15px;
  font-size: 1.5rem;
  border-radius: ${border.borderRadius};
  transition: color 0.5s;
  cursor: pointer;
  
  :hover {
    color: ${props => props.theme.palette.primary.main};
  }
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
  border-bottom: 1px solid ${props => props.theme.palette.primary.light};
`

const HamburgerContainer = styled.div`
  display: none;
  
  @media only screen and ${device.tablet} {
    display: flex;
  }
`
