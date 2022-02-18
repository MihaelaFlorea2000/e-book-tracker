import React from "react";
import { Route, Routes } from "react-router-dom";
import { observer } from "mobx-react";
import { ROUTES } from "../../../config/config";
import ExplorePage from "../../Explore/ExplorePage";
import FriendsPage from "../../Friends/FriendsPage";
import LibraryPage from "../../Library/LibraryPage";
import SettingsPage from "../../Settings/SettingsPage";
import TrackPage from "../../Track/TrackPage";
import ProfilePage from "../../Profile/ProfilePage";
import UploadFirstStep from "../../Upload/UploadFirstStep";
import UploadSecondStep from "../../Upload/UploadSecondStep";
import BookInfoPage from "../../BookInfo/BookInfoPage";
import EditPage from "../../Edit/EditPage";

const HomeRoutes = () => {

    return (
        <Routes>
            <Route path={ROUTES.library} element={<LibraryPage/>}/>
            <Route path={ROUTES.track} element={<TrackPage/>}/>
            <Route path={ROUTES.explore} element={<ExplorePage/>}/>
            <Route path={ROUTES.friends} element={<FriendsPage/>}/>
            <Route path={ROUTES.settings} element={<SettingsPage/>}/>
            <Route path={ROUTES.profile} element={<ProfilePage/>}/>
            <Route path={ROUTES.book.upload1} element={<UploadFirstStep/>}/>
            <Route path={ROUTES.book.upload2} element={<UploadSecondStep/>}/>
            <Route path={ROUTES.book.info} element={<BookInfoPage/>}/>
            <Route path={ROUTES.book.edit} element={<EditPage/>}/>
        </Routes>
    );
}

export default observer(HomeRoutes);
