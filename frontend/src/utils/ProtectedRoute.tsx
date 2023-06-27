import {matchRoutes, Navigate, Outlet, useLocation, useNavigate, useRoutes} from "react-router-dom";
import { useAuth } from "./AuthProvider"
import React from "react";
import UIHeader from "../components/UIHeader";

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
        <UIHeader>
            <Outlet />
        </UIHeader>)
};