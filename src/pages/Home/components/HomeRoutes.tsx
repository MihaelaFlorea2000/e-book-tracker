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
import GoalsDialogue from "../../Track/components/Goals/GoalsDialogue";
import AddReadPage from "../../AddRead/AddReadPage";
import EditReadPage from "../../EditRead/EditReadPage";
import SearchPage from "../../Search/SearchPage";
import BadgesPage from "../../Badges/BadgesPage";
import MutualFriendsPage from "../../Friends/MutualFriendsPage";

const HomeRoutes = () => {

    return (

        <Routes>
                <Route path={ROUTES.library} element={<LibraryPage/>}/>
                <Route path={ROUTES.track.main} element={<TrackPage/>}/>
                <Route path={ROUTES.track.goals} element={<GoalsDialogue/>}/>
                <Route path={ROUTES.explore} element={<ExplorePage/>}/>
                <Route path={ROUTES.friends.all} element={<FriendsPage/>}/>
                <Route path={ROUTES.friends.mutual} element={<MutualFriendsPage/>}/>
                <Route path={ROUTES.settings} element={<SettingsPage/>}/>
                <Route path={ROUTES.profile} element={<ProfilePage/>}/>
                <Route path={ROUTES.book.upload1} element={<UploadFirstStep/>}/>
                <Route path={ROUTES.book.upload2} element={<UploadSecondStep/>}/>
                <Route path={ROUTES.book.info} element={<BookInfoPage/>}/>
                <Route path={ROUTES.book.edit} element={<EditPage/>}/>
                <Route path={ROUTES.read.add} element={<AddReadPage/>}/>
                <Route path={ROUTES.read.edit} element={<EditReadPage/>}/>
                <Route path={ROUTES.search} element={<SearchPage/>}/>
                <Route path={ROUTES.badges} element={<BadgesPage/>}/>
        </Routes>
    );
}

export default observer(HomeRoutes);
