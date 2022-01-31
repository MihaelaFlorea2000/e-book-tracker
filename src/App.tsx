import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { ROUTES } from './config/config';
import HomePage from './pages/HomePage';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import MainStore from './stores/MainStore';

function App() {

    return (
        <BrowserRouter>
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
        </BrowserRouter>
    );
}

export default App;
