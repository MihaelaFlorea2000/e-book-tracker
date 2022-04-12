import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import { ROUTES } from './utils/helpers/constants';
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import MainStore from './stores/LoginStore';
import ReadPage from "./pages/Read/ReadPage";
import 'react-calendar/dist/Calendar.css';
import {darkTheme, darkThemeMUI, lightThemeMui, theme} from './utils/style/themeConfig';
import {useStore} from "./stores/RootStore";
import {ThemeProvider as MuiThemeProvider} from "@mui/material";
import {ThemeProvider} from "@emotion/react";


// Check if coming from the edit page?
const isEditRead = (path:string) => {
    const pathArray = path.split('/');

    if (pathArray.length === 6 && pathArray[5] === 'edit') {
        return pathArray[2];
    }

    return '';
}

function App() {
    const { settingsStore } = useStore();

    // Reroute when Upload or Edit Read pages are refreshed
    // These are multi-step form pages so
    // should go to step 1 when refreshed
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (location.pathname === ROUTES.book.upload1) {
            navigate("/upload/1")
        } else if (isEditRead(location.pathname) !== '') {
            navigate(`/book/${isEditRead(location.pathname)}`)
        }
    }, []);

    return (
        <ThemeProvider theme={settingsStore.isDarkThemeOn() ? darkTheme : theme}>
            <MuiThemeProvider theme={settingsStore.isDarkThemeOn() ? darkThemeMUI : lightThemeMui}>
                <Routes>
                    {
                        // Route to Login and Register if user is not logged in
                        MainStore.isAuth() ?
                            <>
                                <Route path={ROUTES.library} element={<HomePage/>} />
                                <Route path={ROUTES.book.reader} element={<ReadPage/>}/>
                            </>
                            :
                            <>

                                <Route path={ROUTES.user.login} element={<LoginPage/>} />
                                <Route path={ROUTES.user.register} element={<RegisterPage />} />
                            </>
                    }
                    <Route path={ROUTES.library} element={<HomePage/>} />
                </Routes>
            </MuiThemeProvider>
        </ThemeProvider>
    );
}

export default observer(App);
