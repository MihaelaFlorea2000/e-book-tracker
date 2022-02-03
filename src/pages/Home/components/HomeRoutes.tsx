import React from "react";
import {Route, Routes } from "react-router-dom";
import { ROUTES } from "../../../config/config";
import ExplorePage from "../../Explore/ExplorePage";
import FriendsPage from "../../FriendsPage/FriendsPage";
import LibraryPage from "../../Library/LibraryPage";
import SettingsPage from "../../Settings/SettingsPage";
import TrackPage from "../../Track/TrackPage";
import {observer} from "mobx-react";
import ProfilePage from "../../Profile/ProfilePage";
import UploadPage from "../../Upload/Upload";

const HomeRoutes = () => {

    return (
        <Routes>
            <Route path={ROUTES.library} element={<LibraryPage/>}/>
            <Route path={ROUTES.track} element={<TrackPage/>}/>
            <Route path={ROUTES.explore} element={<ExplorePage/>}/>
            <Route path={ROUTES.friends} element={<FriendsPage/>}/>
            <Route path={ROUTES.settings} element={<SettingsPage/>}/>
            <Route path={ROUTES.profile} element={<ProfilePage/>}/>
            <Route path={ROUTES.upload} element={<UploadPage/>}/>
        </Routes>
    );
}

export default observer(HomeRoutes);
