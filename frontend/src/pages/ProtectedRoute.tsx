import {Link, Navigate, Outlet} from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider"
import React, {ReactNode} from "react";

export function ProtectedRoute(){
    const { user } = useAuth();
    console.log(`User in useAuth of Protected Route: ${user}`, )
    if (!user) {
        // user is not authenticated
        return <Navigate to="/" />;
    }
    return (
        <div>
            <header>
                <nav className={'bg-red-900 text-white w-full text-7xl h-24'}>
                    <span>Volcano Explorer</span>
                    <Link to={"/game"}>Game</Link>
                    {user && <span>{`${user.name}`}</span>}
                </nav>
            </header>
            <Outlet />
        </div>
    )
};