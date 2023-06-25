import React, {useState} from 'react';
import {Routes, Route, Link} from "react-router-dom";
import LoginFormModal from "./components/LoginFormModal";
import GamePage from "./pages/GamePage";
import LandingPage from "./pages/LandingPage";
import MenuPage from "./pages/MenuPage";
import SettingsPage from "./pages/SettingsPage";
import {ProtectedRoute} from "./utils/ProtectedRoute";

 export interface User {
    id: number
    name: string
    won: number
    loss: number
}

function App() {
  return (
    <div className="bg-gray-100 fixed top-0 bottom-0 right-0 left-0">
        <Routes>
            <Route path={"/"} element={<LandingPage/>}/>

            <Route path={"/app"} element={<ProtectedRoute />}>
                <Route path={"menu"} element={<MenuPage/>}/>
                <Route path={"game"} element={<GamePage/>}/>
                <Route path={"settings"} element={<SettingsPage/>}/>
            </Route>
        </Routes>
    </div>
  );
}

export default App;
