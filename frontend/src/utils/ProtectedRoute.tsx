import {Link, Navigate, Outlet} from "react-router-dom";
import { useAuth } from "./AuthProvider"
import React, {ReactNode} from "react";

export function ProtectedRoute(){
    const { user } = useAuth();
    if (!user) {
        // user is not authenticated
        return <Navigate to="/" />;
    }
    return (
        <div>
            <header>
                <nav className={'bg-red-900 text-white w-full text-7xl h-24'}>
                    <span>Volcano Explorer</span>
                    <Link to={"/app/menu"}>Menu</Link>
                    <span>{`${user.name}`}</span>
                </nav>
            </header>
            <Outlet />
        </div>
    )
};