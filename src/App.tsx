import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import { ROUTES } from './config/config';
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import MainStore from './stores/LoginStore';
import ReadPage from "./pages/Read/ReadPage";
import 'react-calendar/dist/Calendar.css';

// Are we coming from the edit page
const isEditRead = (path:string) => {
    const pathArray = path.split('/');

    if (pathArray.length === 6 && pathArray[5] === 'edit') {
        return pathArray[2];
    }

    return '';
}

function App() {
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
            <Routes>
                {
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
    );
}

export default observer(App);
