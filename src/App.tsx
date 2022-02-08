import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import {BrowserRouter, Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import { ROUTES } from './config/config';
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import MainStore from './stores/MainStore';

function App() {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (location.pathname == "/upload/2") {
            navigate("/upload/1")
        }
    }, []);

    return (
            <Routes>
                {
                    MainStore.isAuth() ?
                        <Route path={ROUTES.home} element={<HomePage/>} />
                        :
                        <>

                            <Route path={ROUTES.user.login} element={<LoginPage/>} />
                            <Route path={ROUTES.user.register} element={<RegisterPage />} />
                        </>
                }
                <Route path={ROUTES.home} element={<HomePage/>} />
            </Routes>
    );
}

export default observer(App);
