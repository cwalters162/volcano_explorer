import React, {useState} from 'react';
import {Routes, Route, Link} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import GamePage from "./pages/GamePage";
import LandingPage from "./pages/LandingPage";
import MenuPage from "./pages/MenuPage";
import SettingsPage from "./pages/SettingsPage";
import {ProtectedRoute} from "./pages/ProtectedRoute";

 export interface User {
    id: number
    name: string
    won: number
    loss: number
}

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path={"/"} element={<LandingPage/>}/>
            <Route path={"/login"} element={<LoginPage />}/>
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
