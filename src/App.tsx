import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { ROUTES } from './config/config';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
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
                            <Route path={ROUTES.login} element={<LoginPage/>} />
                            <Route path={ROUTES.register} element={<RegisterPage />} />
                        </>
                }
            </Routes>
        </BrowserRouter>
    );
}

export default App;
