import React, {useState} from 'react';
import {Routes, Route, Link} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import GamePage from "./pages/GamePage";

 export interface User {
    id: number
    name: string
    won: number
    loss: number
}

function App() {
    const [user, setUser] = useState<User>()

  return (
    <div className="App">
        <header>
            <nav className={'bg-red-900 text-white w-full text-7xl h-24'}>
                <span>Volcano Explorer</span>
                <Link to={"/game"}>Game</Link>
                {user && <span>{`${user.name}`}</span>}
            </nav>
        </header>
        <Routes>
            <Route path={"/"} element={<LoginPage onLogin={setUser}/>}/>
            <Route path={"/game"} element={<GamePage/>}/>
        </Routes>
    </div>
  );
}

export default App;
