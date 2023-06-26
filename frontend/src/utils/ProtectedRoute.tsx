import {matchRoutes, Navigate, Outlet, useLocation, useNavigate, useRoutes} from "react-router-dom";
import { useAuth } from "./AuthProvider"
import React from "react";

export function ProtectedRoute(){
    const location = useLocation()
    const { user, logout} = useAuth();
    if (!user) {
        // user is not authenticated
        return <Navigate to="/" />;
    }
    if (location.pathname == "/app") {
        return <Navigate to={"/app/menu"} />
    }

    return (
        <div>
            <header>
                <nav className={'text-white w-full text-5xl bg-gradient-to-b from-red-900 to-red-700 pb-2 px-2'}>
                    <div className={"flex justify-between"}>
                        <span>Volcano Explorer</span>
                        <button onClick={logout}>Logout</button>
                    </div>
                    <div className={"grid grid-flow-col"}>
                        <span className={"col-span-8"}>{`${user.name}`}</span>
                        <div className={"flex justify-between pr-3"}>
                            <span>Wins: </span>
                            <span className={""}>{`${user.won}`}</span>
                        </div>
                        <div className={"flex justify-between"}>
                            <span>Losses: </span>
                            <span className={""}>{`${user.loss}`}</span>
                        </div>

                    </div>
                </nav>
            </header>
            <Outlet />
        </div>
    )
};